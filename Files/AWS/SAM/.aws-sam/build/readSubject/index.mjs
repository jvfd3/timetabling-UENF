// SubjectsRead->index.js
import { dbExecute } from "/opt/db.js";
import { getPayloadResponse } from "/opt/auxFunctions.js";
let local = "aws>lambda>Read>Subject>";

async function handler(event) {
  local += "handler>";
  console.log(local + "{event: ", event, "}");

  return await readSubjects();
}

async function readSubjects() {
  local += ">readSubjects";
  let readSubjectsQuery = "SELECT * FROM disciplinas";
  return await defaultRead(readSubjectsQuery, null);
}

async function defaultRead(query, queryValues) {
  local += ">defaultRead";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  try {
    queryResult = await dbExecute(query);
    queryResult[1] = null; // remove excessive metadata
    message = `>itens lidos com sucesso: ${queryResult.length}`;
    statusCode = 200;
    console.log(message, statusCode, queryResult);
  } catch (error) {
    statusCode = 500;
    localError = error;
    message = local + ">Erro ao executar a leitura.";
    console.error(message, statusCode, error);
  }
  return getPayloadResponse(
    message,
    query,
    queryValues,
    queryResult,
    localError,
    statusCode
  );
}

export { handler };
