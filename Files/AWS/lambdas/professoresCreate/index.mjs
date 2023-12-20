// index.js
import {createDbConnection} from "./db.js";
let local = "aws>lambda>professores>Create";

async function handler(event) {
  console.log(local + ">handler>{event: ", event,"}");
  let newProfessor = event.newProfessor;
  return await createProfessor(newProfessor);
}

async function createProfessor(newProfessor) {
  let createProfessorQuery = "INSERT INTO professores(`apelidoProfessor`, `curso`, `laboratorio`, `nomeProfessor`) VALUES(?, ?, ?, ?)";
  return await defaultCreate(createProfessorQuery, newProfessor);
}

async function defaultCreate(query, newProfessor) {
  try {
    let dbConnection = await createDbConnection();
    let queryResult = await dbConnection.execute(query, convertToList(newProfessor));
    await dbConnection.end();
    let successMessage = local + `>defaultCreate>Professor criado com sucesso`;
    console.log(successMessage, queryResult);
    return getPayloadResponse(successMessage, query, newProfessor, queryResult, null, 201);
  } catch (error) {
    let errorMessage = local + ">defaultCreate>Erro ao executar a query:";
    console.error(errorMessage, error);
    return getPayloadResponse(errorMessage, query, newProfessor, null, error, 500);
  }
}

function getPayloadResponse(message, query, queryValues, queryResult, error, statusCode) {
  let myBody = {
    message: message,
    query: query,
    queryResult: queryResult,
    queryValues: queryValues,
    error: error
  };
  let returnedMessage = {
    statusCode: statusCode,
    body: myBody,
  };
  return returnedMessage;
}

function convertToList(professor) {
  const values = [
    professor.apelidoProfessor,
    professor.curso,
    professor.laboratorio,
    professor.nomeProfessor,
  ];
  return values;
}

export { handler };