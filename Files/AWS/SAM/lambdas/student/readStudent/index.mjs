// alunosRead->index.js
import { dbExecute } from "/opt/db.js";
import { getPayloadResponse } from "/opt/auxFunctions.js";
let local = "";

async function handler(event) {
  local = "aws>lambda>alunos>Read>handler";
  console.log(local + ">{event: ", event, "}");

  return await readAlunos();
}

async function readAlunos() {
  local += ">readAlunos";
  let readAlunosQuery = "SELECT * FROM alunos";
  return await defaultRead(readAlunosQuery, null);
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
