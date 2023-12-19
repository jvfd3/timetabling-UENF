// index.js
import {createDbConnection} from "./db.js";

let local = "aws>lambda>professores>Read";

/*
aws lambda create-function --function-name professoresRead --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/createProfessor/createProfessor.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
*/

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
    const [rows, _] = await dbConnection.execute(query);
    await dbConnection.end();
    console.log(local + ">defaultRead, rows:", rows);
    return {
      statusCode: 200,
      body: JSON.stringify(rows),
    };
  } catch (error) {
    console.error(local + ">defaultRead>Erro ao executar a query:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao executar a query' }),
    };
  }
}

export { handler };