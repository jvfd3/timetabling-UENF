import { createConnection } from 'mysql';

export async function handler(event) {
  let query = event.body.query;
  let returnedObject = {
    statusCode: 123,
    body: JSON.stringify({ message: 'Hello World!' })
  };
  try {
    const response = await runQueryOnDatabase(query);
    returnedObject.statusCode = 200;
    returnedObject.body = JSON.stringify(response);
  } catch (error) {
    console.error('Erro no Lambda handler:', error);
    returnedObject.statusCode = 500;
    returnedObject.body = JSON.stringify({ errorMessage: 'Erro interno do servidor' });
  }
  return returnedObject;
}

function runQueryOnDatabase(query) {
  // Configurações do banco de dados
  const dbConfig = {
    host: 'dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',
    user: 'tang',
    password: 'annabell',
    database: 'timetabling'
  };
  return new Promise((resolve, reject) => {
    const connection = createConnection(dbConfig);
    connection.query(query, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
}
