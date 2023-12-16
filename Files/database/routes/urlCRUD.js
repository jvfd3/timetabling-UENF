import express from "express";
import {
  createDisciplina,
  createProfessor,
  createTurma,
  createSala,
  readDisciplinas,
  readProfessores,
  readTurmas,
  readSalas,
  updateDisciplina,
  updateProfessor,
  updateTurma,
  updateSala,
  deleteDisciplina,
  deleteProfessor,
  deleteTurma,
  deleteSala,
} from "../controllers/dbConnector.js";

const router = express.Router();

router.post("/disciplina", createDisciplina);
router.post("/professor", createProfessor);
router.post("/turma", createTurma);
router.post("/sala", createSala);

router.get("/disciplinas", readDisciplinas);
router.get("/professores", readProfessores);
router.get("/turmas", readTurmas);
router.get("/salas", readSalas);

router.put("/disciplina/:id", updateDisciplina);
router.put("/professor/:id", updateProfessor);
router.put("/turma/:id", updateTurma);
router.put("/sala/:id", updateSala);

router.delete("/disciplina/:id", deleteDisciplina);
router.delete("/professor/:id", deleteProfessor);
router.delete("/turma/:id", deleteTurma);
router.delete("/sala/:id", deleteSala);

export default router;
