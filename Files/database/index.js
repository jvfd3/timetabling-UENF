import express from "express";
import userRoutes from "./routes/users.js";
import cors from "cors";

const app = express();

app.use(express.json()); // Habilitar algo de json
app.use(cors()); // Evitar conflitos de acesso local

app.use("/", userRoutes);

app.listen(8800); // é a porta de quê?
