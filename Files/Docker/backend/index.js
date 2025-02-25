import express from "express";
import cors from "cors";
import timetablingRoutes from "./routes/urlCRUD.js";

const app = express();
app.use(express.json()); // Habilitar algo de json
app.use(cors()); // Evitar conflitos de acesso local
app.use("/", timetablingRoutes);
app.listen(8800); // é a porta de quê?
