import mysql from "mysql2/promise";
import { config } from "dotenv";

// Connects with the SQL DB

config(); // Load environment variables from .env

const isLocal = true;

const dbMySQL = {
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE_NAME || "OurClassDB",
  waitForConnections: true, // if True, the pool queues requests when no connections are available
  connectionLimit: 10, // Maximum number of connections in the pool
  queueLimit: 0, // No limit for the number of queued requests
};

const dbAWS = {
  host: "dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com",
  port: "3306",
  user: "tang",
  password: "annabell",
  database: "timetabling",
};

const dbToConnect = isLocal ? dbMySQL : dbAWS;

const pool = mysql.createPool(dbToConnect);

// Função para testar a conexão do pool na inicialização
const testDbConnection = async () => {
  console.log("Servidor Express rodando na porta 8800.");
  let connection;
  try {
    connection = await pool.getConnection(); // Tenta obter uma conexão do pool
    console.log(
      `[DB] Conectado ao banco de dados '${dbToConnect.database}' em ${dbToConnect.host}:${dbToConnect.port} como usuário '${dbToConnect.user}'!`
    );
    connection.release(); // Libera a conexão de volta para o pool
  } catch (error) {
    console.error("[DB] Erro ao conectar ao pool de banco de dados:", error);
    // Em um ambiente de produção, você pode querer encerrar o processo aqui
    // process.exit(1);
  }
};

// const db = mysql.createConnection(dbToConnect);

// db.connect((err) => {
//   if (err) throw err;
//   console.log(
//     "Connected to database",
//     isLocal ? "local" : "AWS",
//     dbToConnect.host
//   );
// });

export { pool, testDbConnection };
