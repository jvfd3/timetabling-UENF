// index.js
import {createDbConnection} from "./db.js";
let local = "aws>lambda>professores>Update";

async function handler(event) {
  console.log(local + ">handler>event: <", event, ">");
  let newProfessor = event.newProfessor;
  return await updateProfessor(newProfessor);
}

async function updateProfessor(professorToUpdate) {
  let updateProfessorQuery = "UPDATE `professores` SET `apelidoProfessor` = ?, `curso` = ?, `laboratorio` = ?, `nomeProfessor` = ? WHERE `idprofessor` = ?";
  return await defaultUpdate(updateProfessorQuery, professorToUpdate);
}

async function defaultUpdate(query, professorToUpdate) {
  let exists = await checkExistance(professorToUpdate.idprofessor);
  local += ">defaultUpdate";
  if (!exists) {
    let errorMessage = local + ">id:" + professorToUpdate.idprofessor + " não existe";
    console.error(errorMessage);
    return getPayloadResponse(errorMessage, null, professorToUpdate, null, null, 404);
  }
  try {
    let dbConnection = await createDbConnection();
    let queryResult = await dbConnection.execute(query, convertToList(professorToUpdate));
    await dbConnection.end();
    let successMessage = local + ">id:" + professorToUpdate.idprofessor + " atualizado com sucesso";
    console.log(successMessage, queryResult);
    return getPayloadResponse(successMessage, query, professorToUpdate, queryResult, null, 200);
  } catch (error) {
    let errorMessage = local + ">Erro ao executar a query:";
    errorMessage += `{query: '${query}'}`;
    console.error(errorMessage, error);
    return getPayloadResponse(errorMessage, query, professorToUpdate, null, error, 500);
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

function convertToList(professor) {
  const values = [
    professor.apelidoProfessor,
    professor.curso,
    professor.laboratorio,
    professor.nomeProfessor,
    professor.idprofessor,
  ];
  return values;
}

export { handler };