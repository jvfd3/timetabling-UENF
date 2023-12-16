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
  deleteDisciplina,
  deleteProfessor,
  deleteTurma,
  deleteSala,
  getUsers,
  addUser,
  deleteUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/disciplina", createDisciplina);
router.post("/professor", createProfessor);
router.post("/turma", createTurma);
router.post("/sala", createSala);

router.get("/disciplinas", readDisciplinas);
router.get("/professores", readProfessores);
router.get("/turmas", readTurmas);
router.get("/salas", readSalas);

router.delete("/disciplina/:id", deleteDisciplina);
router.delete("/professor/:id", deleteProfessor);
router.delete("/turma/:id", deleteTurma);
router.delete("/sala/:id", deleteSala);


router.get("/", getUsers);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
