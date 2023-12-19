// index.js
// aws lambda create-function --function-name professoresCreate --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/professoresCreate/professoresCreate.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
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
    return getPayloadResponse(successMessage, query, newProfessor, queryResult, null, 200);
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
    queryValues: queryValues,
    queryResult: queryResult,
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