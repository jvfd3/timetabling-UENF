const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

async function createDbConnection() {
  const dbConnection = await mysql.createConnection(dbConfig);
  return dbConnection;
}

async function dbExecute(query, values=null) {
  let dbConnection = await createDbConnection();
  let queryResult = await dbConnection.execute(query, values);
  await dbConnection.end();
  return queryResult;
}

module.exports = { dbExecute };
