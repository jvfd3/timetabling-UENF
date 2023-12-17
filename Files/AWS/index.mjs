/*  */

import { createConnection } from 'mysql';

// Configurações do banco de dados
const dbConfig = {
  host: 'dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',
  user: 'tang',
  password: 'annabell',
  database: 'timetabling'
};

export async function handler(event, context) {
  const statement = "SELECT * FROM timetabling.professores";

  try {
    const response = await executeStatement(statement);

    // Formatar a resposta, se necessário
    const formattedResult = response.map(record => {
      // Faça ajustes conforme necessário, dependendo da estrutura dos seus dados
      return record;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(formattedResult)
    };
  } catch (error) {
    console.error('Erro no Lambda handler:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ errorMessage: 'Erro interno do servidor' })
    };
  }
}


function executeStatement(sql) {
  return new Promise((resolve, reject) => {
    const connection = createConnection(dbConfig);

    connection.connect();

    connection.query(sql, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }

      connection.end();
    });
  });
}