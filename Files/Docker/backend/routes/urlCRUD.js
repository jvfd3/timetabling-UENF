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

router.post("/professor", createProfessor);
router.get("/professores", readProfessores);
router.put("/professor/:id", updateProfessor);
router.delete("/professor/:id", deleteProfessor);

router.post("/disciplina", createDisciplina);
router.get("/disciplinas", readDisciplinas);
router.put("/disciplina/:id", updateDisciplina);
router.delete("/disciplina/:id", deleteDisciplina);

router.post("/turma", createTurma);
router.get("/turmas", readTurmas);
router.put("/turma/:id", updateTurma);
router.delete("/turma/:id", deleteTurma);

router.post("/sala", createSala);
router.get("/salas", readSalas);
router.put("/sala/:id", updateSala);
router.delete("/sala/:id", deleteSala);

export default router;
