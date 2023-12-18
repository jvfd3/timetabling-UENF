import { customQuery, customQuery2 } from "../oneQueryToRuleThemAll";
import mysql from "mysql";

/* PROFESSOR */

async function newCreateProfessor(professor) {
  const q =
    "INSERT INTO professores(`apelidoProfessor`, `curso`, `idprofessor`, `laboratorio`, `nomeProfessor`) VALUES(?, ?, ?, ?, ?)";
  const values = [
    professor.apelidoProfessor,
    professor.curso,
    professor.idprofessor,
    professor.laboratorio,
    professor.nomeProfessor,
  ];
  const formattedQuery = mysql.format(q, values);
  return customQuery2(formattedQuery);
}

async function newReadProfessores() {
  const q = "SELECT * FROM professores";
  return customQuery(q);
}

async function newUpdateProfessor(professor) {
  const q =
    "UPDATE professores SET `apelidoProfessor` = ?, `curso` = ?, `laboratorio` = ?, `nomeProfessor` = ? WHERE `idprofessor` = ?";
  const values = [
    professor.apelidoProfessor,
    professor.curso,
    professor.laboratorio,
    professor.nomeProfessor,
    professor.idprofessor,
  ];
  const formattedQuery = mysql.format(q, values);
  return customQuery2(formattedQuery);
}

async function newDeleteProfessor(id) {
  const q = `DELETE FROM professores WHERE idprofessor = ${id}`;
  return customQuery(q);
}

/* Disciplinas */

async function newReadDisciplinas() {
  const q = "SELECT * FROM disciplinas";
  return customQuery(q);
}

async function newReadTurmas() {
  const q = "SELECT * FROM turmas";
  return customQuery(q);
}

async function newReadSalas() {
  const q = "SELECT * FROM salas";
  return customQuery(q);
}

export {
  newCreateProfessor,
  newReadProfessores,
  newUpdateProfessor,
  newDeleteProfessor,
  newReadDisciplinas,
  newReadTurmas,
  newReadSalas,
};
