// index.js
import {createDbConnection} from "./db.js";

let local = "aws>lambda>professores>Update";

/*
aws lambda create-function --function-name professoresUpdate --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/professoresUpdate/professoresUpdate.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
*/

async function handler(event) {
  console.log(local + ">handler>event: <", event, ">");
  let newProfessor = event.newProfessor;
  return await updateProfessor(newProfessor);
}

async function updateProfessor(professorToUpdate) {
  let updateProfessorQuery = "UPDATE `professores` SET `apelidoProfessor` = ?, `curso` = ?, `laboratorio` = ?, `nomeProfessor` = ? WHERE `idprofessor` = ?";
  return await defaultUpdate(updateProfessorQuery, professorToUpdate);
}

async function defaultUpdate(query, newProfessor) {
  let exists = await checkExistance(newProfessor.idprofessor);
  if (!exists) {
    let errorMessage = local + ">defaultUpdate>id:" + newProfessor.idprofessor + " não existe";
    console.error(errorMessage);
    let myBody = {
      errorMessage: errorMessage,
      userMessage: `Professor com id ${newProfessor.idprofessor} não encontrado`,
    };
    let returnedMessage = {
      statusCode: 404,
      body: JSON.stringify(myBody),
    };
    return returnedMessage;
  }
  try {
    let dbConnection = await createDbConnection();
    await dbConnection.execute(query, convertToList(newProfessor));
    await dbConnection.end();
    let successMessage = local + ">defaultUpdate, id:" + newProfessor.idprofessor + " atualizado com sucesso";
    console.log(successMessage);
    let returnedMessage = {
      statusCode: 200,
      body: JSON.stringify({ message: successMessage}),
    };
    return returnedMessage;
  } catch (error) {
    let errorMessage = local + ">defaultUpdate>Erro ao executar a query:";
    errorMessage += "{q: '" + query + "'}";
    console.error(errorMessage, error);
    let returnedMessage = {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessage }),
    };
    return returnedMessage;
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