// index.js
import {createDbConnection} from "./db.js";
let local = "aws>lambda>professores>Read";

async function handler(event) {
  console.log(local + ">handler:", event);

  return await readProfessores();
}

async function readProfessores() {
  let readProfessoresQuery = "SELECT * FROM professores";
  return await defaultRead(readProfessoresQuery);
}

async function defaultRead(query) {
  try {
    let dbConnection = await createDbConnection();
    let queryResult = await dbConnection.execute(query);
    await dbConnection.end();
    let successMessage = local + `>defaultRead, professores lidos com sucesso`;
    console.log(successMessage, queryResult);
    queryResult[1] = null; // remove excessive metadata
    return getPayloadResponse(successMessage, query, null, queryResult, null, 200);
  } catch (error) {
    let errorMessage = local + ">defaultRead>Erro ao executar a query:";
    console.error(errorMessage, error);
    return getPayloadResponse(errorMessage, query, null, null, error, 500);
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

export { handler };