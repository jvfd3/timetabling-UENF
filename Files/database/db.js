import mysql from "mysql";

// Faz conexão com o banco de dados SQL

let isLocal = false;

let dbTeste = {
  host: "localhost",
  user: "root",
  password: "timetabling",
  database: "timetabling",
};

let dbAWS = {
  host: "dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "tang",
  password: "annabell",
  database: "timetabling",
};
let dbInfo = [dbTeste, dbAWS];
let dbToConnect = dbInfo[isLocal ? 0 : 1];

let db = mysql.createConnection(dbToConnect);

db.connect((err) => {
  if (err) throw err;
  console.log(
    "Connected to database",
    isLocal ? "local" : "AWS",
    dbToConnect.host
  );
});

export default db;
