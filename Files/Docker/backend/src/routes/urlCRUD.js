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
  // createStudent,
  createSubject,
  readClassData,
  readClassTime,
  readProfessor,
  readRoom,
  // readStudent,
  readSubject,
  updateClassData,
  updateClassTime,
  updateProfessor,
  updateRoom,
  // updateStudent,
  updateSubject,
  deleteClassData,
  deleteClassTime,
  deleteProfessor,
  deleteRoom,
  // deleteStudent,
  deleteSubject,
} from "../aws/crudFunctionsExporter.js";

import { createStudent } from "../aws/student/createStudent.js";
import { readStudent } from "../aws/student/readStudent.js";
import { updateStudent } from "../aws/student/updateStudent.js";
import { deleteStudent } from "../aws/student/deleteStudent.js";

const router = express.Router();

router.post("/api/classData", createClassData);
router.get("/api/classData", readClassData);
router.put("/api/classData/:id", updateClassData);
router.delete("/api/classData/:id", deleteClassData);

// router.post("/api/turma", createTurma);
// router.get("/api/turma", readTurmas);
// router.put("/api/turma/:id", updateTurma);
// router.delete("/api/turma/:id", deleteTurma);

router.post("/api/classTime", createClassTime);
router.get("/api/classTime", readClassTime);
router.put("/api/classTime/:id", updateClassTime);
router.delete("/api/classTime/:id", deleteClassTime);

router.post("/api/professor", createProfessor);
router.get("/api/professor", readProfessor);
router.put("/api/professor/:id", updateProfessor);
router.delete("/api/professor/:id", deleteProfessor);

router.post("/api/room", createRoom);
router.get("/api/room", readRoom);
router.put("/api/room/:id", updateRoom);
router.delete("/api/room/:id", deleteRoom);

// router.post("/api/sala", createSala);
// router.get("/api/sala", readSalas);
// router.put("/api/sala/:id", updateSala);
// router.delete("/api/sala/:id", deleteSala);

router.post("/api/student", createStudent);
router.get("/api/student", readStudent);
router.put("/api/student/:id", updateStudent);
router.delete("/api/student/:id", deleteStudent);

// router.post("/api/aluno", createAluno);
// router.get("/api/aluno", readAlunos);
// router.put("/api/aluno/:id", updateAluno);
// router.delete("/api/aluno/:id", deleteAluno);

router.post("/api/subject", createSubject);
router.get("/api/subject", readSubject);
router.put("/api/subject/:id", updateSubject);
router.delete("/api/subject/:id", deleteSubject);

// router.post("/api/disciplina", createDisciplina);
// router.get("/api/disciplina", readDisciplinas);
// router.put("/api/disciplina/:id", updateDisciplina);
// router.delete("/api/disciplina/:id", deleteDisciplina);

export default router;
