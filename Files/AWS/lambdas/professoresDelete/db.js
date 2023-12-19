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

module.exports = { createDbConnection };
