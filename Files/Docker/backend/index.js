import express from "express";
import cors from "cors";
import timetablingRoutes from "./src/routes/urlCRUD.js";
import { testDbConnection } from "./src/db.js"; // Importa a função de teste de conexão
import { config } from "dotenv";

config(); // Load environment variables from .env

const app = express();
app.use(express.json()); // Parses express requests as JSON
app.use(cors()); // Enable CORS to avoid cross-origin issues
app.use("/", timetablingRoutes); // Use the routes defined in urlCRUD.js
app.listen(8800, () => {
  testDbConnection();
}); // This backend listens on port 8800 and waits for requests sent to localhost:8800/<route>
