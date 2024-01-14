const AWS = require("aws-sdk");
const mysql = require("mysql2/promise");

const secretsManager = new AWS.SecretsManager();

async function getDbConfig() {
  const data = await secretsManager
    .getSecretValue({ SecretId: process.env.SECRET_NAME })
    .promise();
  if ("SecretString" in data) {
    return JSON.parse(data.SecretString);
  } else {
    let buff = new Buffer(data.SecretBinary, "base64");
    return JSON.parse(buff.toString("ascii"));
  }
}

async function createDbConnection() {
  try {
    const dbConfig = await getDbConfig();
    return await mysql.createConnection(dbConfig);
  } catch (err) {
    let error = new Error(["db.js>createDbConnection", err]);
    console.error(error);
    throw error;
  }
}

async function dbExecute(query, values = null) {
  try {
    let dbConnection = await createDbConnection();
    let queryResult = await dbConnection.execute(query, values);
    await dbConnection.end();
    return queryResult;
  } catch (err) {
    let error = new Error(["db.js>dbExecute", err]);
    console.error(error);
    throw error;
  }
}

module.exports = { dbExecute };
