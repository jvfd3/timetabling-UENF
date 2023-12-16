import mysql from "mysql";

// Faz conexão com o banco de dados SQL

let dbInfo = {
  host: "localhost",
  user: "root",
  password: "timetabling",
  database: "timetabling",
};

export const db = mysql.createConnection(dbInfo);
