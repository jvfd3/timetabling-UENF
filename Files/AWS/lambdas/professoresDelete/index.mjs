// index.js
import {createDbConnection} from "./db.js";

let local = "aws>lambda>professores>delete";

/*
aws lambda create-function --function-name professoresDelete --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/professoresDelete/professoresDelete.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
*/

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
  if (!exists) {
    let errorMessage = local + ">defaultDelete>id:" + id + " não existe";
    console.error(errorMessage);
    let myBody = {
      errorMessage: errorMessage,
      userMessage: `Professor com id ${id} não encontrado`,
    }
    let returnedMessage = {
      statusCode: 404,
      body: JSON.stringify(myBody),
    };
    return returnedMessage;
  }
  try {
    let dbConnection = await createDbConnection();
    await dbConnection.execute(query, [id]);
    await dbConnection.end();
    let successMessage = local + ">defaultDelete, id:" + id + " deletado com sucesso";
    console.log(successMessage);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: successMessage}),
    };
  } catch (error) {
    let errorMessage = local + ">defaultDelete>Erro ao executar a query:"
    console.error(errorMessage, error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessage }),
    };
  }
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