// index.js
import { dbExecute } from "./db.js";
let local = "";

async function handler(event) {
  local = "aws>lambda>professores>Create>handler";
  console.log(local + `>{event: ${event}}`);
  let newProfessor = event.newProfessor;
  return await createProfessor(newProfessor);
}

async function createProfessor(newProfessor) {
  local += ">createProfessor";
  let createProfessorQuery = "INSERT INTO professores(`apelidoProfessor`, `curso`, `laboratorio`, `nomeProfessor`) VALUES(?, ?, ?, ?)";
  return await defaultCreate(createProfessorQuery, convertToList(newProfessor));
}

async function defaultCreate(query, queryValues) {
  local += ">defaultCreate";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  try {
    queryResult = await dbExecute(query, queryValues);

    message += `>Item: ${queryValues} criado com sucesso.`;
    statusCode = 201;
    console.log(message, statusCode, queryResult)
  } catch (error) {
    statusCode = 500;
    localError = error;
    message = local + ">Erro ao executar a leitura.";
    console.error(message, statusCode, error);
  }
  return getPayloadResponse(message, query, queryValues, queryResult, localError, statusCode);
}

function getPayloadResponse(message, query, queryValues, queryResult, error, statusCode) {
  let myBody = {
    message: message,
    query: query,
    queryValues: queryValues,
    queryResult: queryResult[0],
    error: error,
  };
  let payloadResponse = {
    statusCode: statusCode,
    body: myBody,
  };
  console.log(payloadResponse);
  return payloadResponse;
}

function convertToList(professor) {
  const values = [  /* Vai ser nulo se algum item não for definido */
    professor.apelidoProfessor ?? null,
    professor.curso ?? null,
    professor.laboratorio ?? null,
    professor.nomeProfessor ?? null,
  ];
  return values;
}

export { handler };