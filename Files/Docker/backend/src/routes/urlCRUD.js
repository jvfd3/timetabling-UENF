import express from "express";
/* import {
  createDisciplina,
  createProfessor,
  createTurma,
  createAluno,
  createSala,
  readDisciplinas,
  readProfessores,
  readTurmas,
  readAlunos,
  readSalas,
  updateDisciplina,
  updateProfessor,
  updateTurma,
  updateAluno,
  updateSala,
  deleteDisciplina,
  deleteProfessor,
  deleteTurma,
  deleteAluno,
  deleteSala,
} from "../controllers/dbConnector.js"; */

import {
  createClassData,
  createClassTime,
  createProfessor,
  createRoom,
  createStudent,
  createSubject,
  readClassData,
  readClassTime,
  readProfessor,
  readRoom,
  readStudent,
  readSubject,
  updateClassData,
  updateClassTime,
  updateProfessor,
  updateRoom,
  updateStudent,
  updateSubject,
  deleteClassData,
  deleteClassTime,
  deleteProfessor,
  deleteRoom,
  deleteStudent,
  deleteSubject,
} from "../aws/crudFunctionsExporter.js";

const router = express.Router();

router.post("/classData", createClassData);
router.get("/classDatas", readClassData);
router.put("/classData/:id", updateClassData);
router.delete("/classData/:id", deleteClassData);

// router.post("/turma", createTurma);
// router.get("/turmas", readTurmas);
// router.put("/turma/:id", updateTurma);
// router.delete("/turma/:id", deleteTurma);

router.post("/classTime", createClassTime);
router.get("/classTimes", readClassTime);
router.put("/classTime/:id", updateClassTime);
router.delete("/classTime/:id", deleteClassTime);

router.post("/professor", createProfessor);
router.get("/professores", readProfessor);
router.put("/professor/:id", updateProfessor);
router.delete("/professor/:id", deleteProfessor);

router.post("/room", createRoom);
router.get("/rooms", readRoom);
router.put("/room/:id", updateRoom);
router.delete("/room/:id", deleteRoom);

// router.post("/sala", createSala);
// router.get("/salas", readSalas);
// router.put("/sala/:id", updateSala);
// router.delete("/sala/:id", deleteSala);

router.post("/student", createStudent);
router.get("/students", readStudent);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

// router.post("/aluno", createAluno);
// router.get("/alunos", readAlunos);
// router.put("/aluno/:id", updateAluno);
// router.delete("/aluno/:id", deleteAluno);

router.post("/subject", createSubject);
router.get("/subjects", readSubject);
router.put("/subject/:id", updateSubject);
router.delete("/subject/:id", deleteSubject);

// router.post("/disciplina", createDisciplina);
// router.get("/disciplinas", readDisciplinas);
// router.put("/disciplina/:id", updateDisciplina);
// router.delete("/disciplina/:id", deleteDisciplina);

export default router;
