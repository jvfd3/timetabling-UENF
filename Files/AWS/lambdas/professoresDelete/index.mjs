// index.js
import { dbExecute } from "./db.js";
let local = "";

async function handler(event) {
  local = "aws>lambda>professores>Delete>handler";
  console.log(local + `>{event: ${event}}`);
  let idToDelete = event.params.path.id;
  return await deleteProfessor(idToDelete);
}

async function deleteProfessor(professorIdToDelete) {
  local += ">deleteProfessor";
  let deleteProfessorQuery = "DELETE FROM professores WHERE idprofessor = ?";
  return await defaultDelete(deleteProfessorQuery, [professorIdToDelete]);
}

async function defaultDelete(query, queryValues) {
  local += ">defaultDelete";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  let exists = await checkExistance(queryValues);
  if (!exists) {
    message += `>Exists?>item com id ${queryValues} não encontrado.`;
    statusCode = 404;
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      message += `>Item com id ${queryValues} deletado com sucesso.`;
      statusCode = 200;
      console.log(message, statusCode, queryResult)
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = local + ">Erro ao executar a deleção.";
      console.error(message, statusCode, error);
    }
  }
  return getPayloadResponse(message, query, queryValues, queryResult, localError, statusCode);
}

function getPayloadResponse(message, query, queryValues, queryResult, error, statusCode) {
  let myBody = {
    message: message ?? null,
    query: query ?? null,
    queryValues: queryValues ?? null,
    queryResult: queryResult[0] ?? null,
    error: error ?? null,
  };
  let payloadResponse = {
    statusCode: statusCode ?? null,
    body: myBody ?? null,
  };
  console.log(payloadResponse);
  return payloadResponse;
}

async function checkExistance(id) {
  local += ">checkExistance";
  let message = local;
  let checkQuery = "SELECT * FROM professores WHERE idprofessor = ?";
  try {
    let queryResult = dbExecute(checkQuery, [id]);
    let rows = queryResult[0] ?? [];
    return rows.length > 0;
  } catch (error) {
    message = `>Erro ao executar a {query: ${checkQuery}}`;
    console.error(message, error);
    return false;
  }
}

export { handler };