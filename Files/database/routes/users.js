import express from "express";
import {
  getUsers,
  getDisciplinas,
  getProfessores,
  getSalas,
  getTurmas,
  addProfessor,
  addUser,
  deleteUser,
  updateUser,
  addDisciplina,
  addSala,
  addTurma
} from "../controllers/user.js";

const router = express.Router();

router.get("/professores", getProfessores);
router.get("/disciplinas", getDisciplinas);
router.get("/salas", getSalas);
router.get("/turmas", getTurmas);

router.post("/professor", addProfessor);
router.post("/disciplina", addDisciplina);
router.post("/sala", addSala);
router.post("/turma", addTurma);

router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
