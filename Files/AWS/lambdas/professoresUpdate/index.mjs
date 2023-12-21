// index.js
import { dbExecute } from "./db.js";
let local = "";

async function handler(event) {
  local = "aws>lambda>professores>Update>handler";
  console.log(local + ">{event: ", event, "}");
  let newProfessor = event.newProfessor;
  return await updateProfessor(newProfessor);
}

async function updateProfessor(professorToUpdate) {
  local += ">updateProfessor";
  let updateProfessorQuery = "UPDATE `professores` SET `apelidoProfessor` = ?, `curso` = ?, `laboratorio` = ?, `nomeProfessor` = ? WHERE `idprofessor` = ?";
  return await defaultUpdate(updateProfessorQuery, convertToList(professorToUpdate));
}

async function defaultUpdate(query, queryValues) {
  local += ">defaultUpdate";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  let exists = await checkExistance([queryValues[4]]);
  if (!exists) {
    message += `>Exists?>item com id ${queryValues[4]} não encontrado.`;
    statusCode = 404;
  }
  try {
    queryResult = await dbExecute(query, queryValues);
    message += `>Item com id ${queryValues[4]} adquiriu os valores ${queryValues} com sucesso.`;
    statusCode = 200;
    console.log(message, statusCode, queryResult)
  } catch (error) {
    statusCode = 500;
    localError = error;
    message = local + ">Erro ao executar a atualização.";
    console.error(message, statusCode, error);
  }
  return getPayloadResponse(message, query, queryValues, queryResult, localError, statusCode);
}

function getPayloadResponse(message, query, queryValues, queryResult, error, statusCode) {
  let myBody = {
    message: message ?? null,
    query: query ?? null,
    queryValues: queryValues ?? null,
    queryResult: queryResult?.[0] ?? null,
    error: error ?? null,
  };
  let payloadResponse = {
    statusCode: statusCode ?? null,
    body: myBody ?? null,
  };
  console.log(payloadResponse);
  return payloadResponse;
}

async function checkExistance(idInList) {
  local += ">checkExistance";
  let message = local;
  let checkQuery = "SELECT * FROM professores WHERE idprofessor = ?";
  try {
    let queryResult = dbExecute(checkQuery, idInList);
    let rows = queryResult[0] ?? [];
    return rows.length > 0;
  } catch (error) {
    message = `>Erro ao executar a {query: ${checkQuery}}`;
    console.error(message, error);
    return false;
  }
}

function convertToList(professor) {
  const values = [  /* Vai ser nulo se algum item não for definido */
    professor.apelidoProfessor ?? null,
    professor.curso ?? null,
    professor.laboratorio ?? null,
    professor.nomeProfessor ?? null,
    professor.idprofessor ?? null,
  ];
  return values;
}

export { handler };