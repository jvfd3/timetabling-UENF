// index.js
import {createDbConnection} from "./db.js";
let local = "aws>lambda>professores>delete";

async function handler(event) {
  console.log(local + ">handler>receivedEvent: <", event, ">");
  let idToDelete = event.params.path.id;
  return await deleteProfessor(idToDelete);
}

async function deleteProfessor(professorIdToDelete) {
  let deleteProfessorQuery = "DELETE FROM professores WHERE idprofessor = ?";
  return await defaultDelete(deleteProfessorQuery, professorIdToDelete);
}

async function defaultDelete(query, id) {
  let exists = await checkExistance(id);
  local += ">defaultDelete";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 404;
  if (!exists) {
    message = `>Exists?>id: Professor com id ${id} não encontrado`;
  } else {
    try {
      let dbConnection = await createDbConnection();
      queryResult = await dbConnection.execute(query, [id]);
      await dbConnection.end();
      message = `>professor com id ${id} deletado com sucesso`;
      statusCode = 200;
    } catch (error) {
      message = ">Erro ao executar a query:";
      localError = error;
      statusCode = 500;
    }
  }
  let payloadResponse = getPayloadResponse(message, query, id, queryResult, localError, statusCode);
  console.error(payloadResponse);
  return payloadResponse;
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


async function checkExistance(id) {
  const checkQuery = "SELECT * FROM professores WHERE idprofessor = ?";
  try {
    let dbConnection = await createDbConnection();
    let [rows] = await dbConnection.execute(checkQuery, [id]);
    await dbConnection.end();
    return rows.length > 0;
  } catch (error) {
    let errorMessage = local + ">checkExistance>Erro ao executar a query:" + checkQuery;
    console.error(errorMessage, error);
    return false;
  }
}

export { handler };