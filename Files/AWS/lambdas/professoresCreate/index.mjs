// index.js
import {createDbConnection} from "./db.js";

let local = "aws>lambda>professores>Create";

/*
aws lambda create-function --function-name professoresCreate --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/professoresCreate/professoresCreate.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
*/

async function handler(event) {
  console.log(local + ">handler>{event: ", event,"}");
  let newProfessor = event.newProfessor;
  return await createProfessor(newProfessor);
}

async function createProfessor(newProfessor) {
  let createProfessorQuery = "INSERT INTO professores(`apelidoProfessor`, `curso`, `laboratorio`, `nomeProfessor`) VALUES(?, ?, ?, ?)";
  return await defaultCreate(createProfessorQuery, convertToList(newProfessor));
}

async function defaultCreate(query, queryValues) {
  try {
    let dbConnection = await createDbConnection();
    let [result, _] = await dbConnection.execute(query, queryValues);
    let insertedId = result.insertId;
    console.log("Resultado retornado pela query: <", result, ">");
    await dbConnection.end();
    let successMessage = local + `>defaultCreate, professor criado com sucesso com id ${insertedId}`;
    console.log(successMessage);
    let myBody = {
      message: successMessage,
      newID: insertedId
    };
    let returnedObject = {
      statusCode: 201,
      body: JSON.stringify(myBody),
    };
    return returnedObject;
  } catch (error) {
    let errorMessage = local + ">defaultCreate>Erro ao executar a query:";
    console.error(errorMessage, error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessage }),
    };
  }
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