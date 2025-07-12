import mysql from "mysql2";

// Faz conexão com o banco de dados SQL

const isLocal = true;

const dbTeste = {
  host: "localhost",
  user: "root",
  password: "root",
  // password: "timetabling",
  database: "OurClassDB",
};

const dbAWS = {
  host: "dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "tang",
  password: "annabell",
  database: "timetabling",
};

const dbToConnect = isLocal ? dbTeste : dbAWS;

const db = mysql.createConnection(dbToConnect);

db.connect((err) => {
  if (err) throw err;
  console.log(
    "Connected to database",
    isLocal ? "local" : "AWS",
    dbToConnect.host
  );
});

export default db;
