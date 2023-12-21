const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function createDbConnection() {
  try {
    return await mysql.createConnection(dbConfig);
  } catch (err) {
    let error = new Error("db.js>createDbConnection", err);
    console.error(error);
    throw error;
  }
}

async function dbExecute(query, values=null) {
  try {
    let dbConnection = await createDbConnection();
    let queryResult = await dbConnection.execute(query, values);
    await dbConnection.end();
    return queryResult;
  } catch (err) {
    let error = new Error("db.js>dbExecute", err);
    console.error(error);
    throw error;
  }
}

module.exports = { dbExecute };
