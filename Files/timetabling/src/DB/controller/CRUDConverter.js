import { customQuery, customQuery2 } from "../oneQueryToRuleThemAll";
import mysql from "mysql";
// import knex from "knex";

// const knexInstance = knex({ client: "mysql" });

function formatQuery(queryStr, values) {
  let formattedQuery = queryStr;
  values.forEach((value, index) => {
    formattedQuery = formattedQuery.replace("?", `"${value}"`);
  });
  return formattedQuery;
}

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
  const formattedQuery = formatQuery(q, values);
  return customQuery2(formattedQuery);
}

async function newReadProfessores() {
  const q = "SELECT * FROM professores";
  return customQuery(q);
}

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

async function newDeleteProfessor(id) {
  const q = `DELETE FROM professores WHERE idprofessor = ${id}`;
  return customQuery(q);
}

export {
  newReadProfessores,
  newReadDisciplinas,
  newReadTurmas,
  newReadSalas,
  newCreateProfessor,
  newDeleteProfessor,
};
