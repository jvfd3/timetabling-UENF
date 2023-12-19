// index.js
// aws lambda create-function --function-name professoresRead --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/createProfessor/createProfessor.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
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

export { handler };