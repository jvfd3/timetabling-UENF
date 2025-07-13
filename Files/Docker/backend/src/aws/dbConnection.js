import { pool } from "../db.js";

let local = "db.js>";
const isDebugging = true;

async function dbExecute(query, values = null) {
  local += "dbExecute>";
  let connection;
  try {
    connection = await pool.getConnection(); // Obtém uma conexão do pool
    isDebugging && console.log(local, query, values);
    isDebugging && console.log(local, connection);
    isDebugging &&
      console.log(
        local,
        `Query: "${query}", Values: ${JSON.stringify(values)}`
      );

    // Usa connection.execute para prepared statements, que é mais seguro e performático
    const [rows, fields] = await connection.execute(query, values);

    isDebugging && console.log(local, `Query Result (rows):`, rows);
    isDebugging && console.log(local, `Query Result (fields):`, fields);

    return [rows, fields]; // Retorna tanto as linhas quanto os metadados dos campos
  } catch (err) {
    isDebugging && console.error(local, `Erro ao executar query:`, err);
    throw err; // Relança o erro para que a função chamadora possa tratá-lo
  } finally {
    if (connection) {
      connection.release(); // IMPORTANTE: Libera a conexão de volta para o pool
      isDebugging &&
        console.log(local, "Conexão liberada de volta para o pool.");
    }
  }
}

async function checkExistance(checkQuery, idInList) {
  local += "checkExistance>";
  const errorMessage = `>Error while checking existance>`;
  try {
    const [rows, _] = await dbExecute(checkQuery, idInList);
    return rows?.length > 0;
  } catch (error) {
    const message = local + errorMessage + checkQuery;
    isDebugging && console.error(message, error);
    return false;
  }
}

function getPayloadResponse(
  message,
  query,
  queryValues,
  queryResult,
  error,
  statusCode
) {
  const myBody = {
    message: message ?? null,
    query: query ?? null,
    queryValues: queryValues ?? null,
    queryResult: queryResult ?? null,
    error: error ?? null,
  };
  const payloadResponse = {
    statusCode: statusCode ?? null,
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*", // Permite que qualquer origem acesse
      // "Access-Control-Allow-Credentials": true, // Permite o envio de cookies
    },
    body: JSON.stringify(myBody ?? null),
  };
  isDebugging && console.log("[getPayloadResponse]", payloadResponse);
  return payloadResponse;
}

async function defaultCreate(query, queryValues, exists) {
  const action = "CREAT";
  const errorMessage = `>Error while ${action}ING`;
  const successMessage = `>Item ${action}ED successfully: ${queryValues}`;
  local += `default${action}E>`;
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 201;

  if (!exists) {
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      message += successMessage;
      isDebugging && console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = local + errorMessage;
      isDebugging && console.error(message, statusCode, error);
    }
  }
  return getPayloadResponse(
    message,
    query,
    queryValues,
    queryResult,
    localError,
    statusCode
  );
}

async function defaultRead(query, queryValues, exists) {
  const action = "READ";
  const errorMessage = `>Error while ${action}ING`;
  const successMessage = `>Items ${action} successfully: `;
  local += `default${action}>`;
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 200;
  if (!exists) {
  } else {
    try {
      // console.log("pre chamada bd");
      queryResult = await dbExecute(query, queryValues);
      // console.log("pos chamada bd");
      message += successMessage + `${queryResult.length}`;
      isDebugging && console.log(message, statusCode, queryResult?.[0]);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = local + errorMessage;
      isDebugging && console.error(message, statusCode, error);
    }
  }
  // console.log("pre saída BD");

  const small = [
    {
      id: 1,
      anoEntrada: 2014,
      curso: "Ciência da Computação",
      matricula: "00114110001",
      nome: "Augusto Amaral Pereira",
    },
    {
      id: 2,
      anoEntrada: 2015,
      curso: "Ciência da Computação",
      matricula: "00115110002",
      nome: "Mateus Nunes Schulz",
    },
    {
      id: 3,
      anoEntrada: 2015,
      curso: "Ciência da Computação",
      matricula: "00115110003",
      nome: "Ralf Cruz Mateus",
    },
  ];

  const payload = getPayloadResponse(
    message,
    query,
    queryValues,
    queryResult,
    // small,
    localError,
    statusCode
  );

  // console.log("payload", payload);

  return payload;
}

async function defaultUpdate(query, queryValues, exists) {
  const action = "UPDAT";
  const notFoundMessage =
    local + `>Exists?>Not found item with id ${queryValues[4]}.`;
  const successMessage =
    local +
    `>Item ${action}ED successfully: Item with id ${queryValues[4]} now has the values: ${queryValues}.`;
  const errorMessage = local + `>Error while ${action}ING`;
  local += `default ${action}E>`;
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 404;
  if (!exists) {
    message = notFoundMessage;
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message = successMessage;
      statusCode = 200;
      isDebugging && console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = errorMessage;
      isDebugging && console.error(message, statusCode, error);
    }
  }
  return getPayloadResponse(
    message,
    query,
    queryValues,
    queryResult,
    localError,
    statusCode
  );
}

async function defaultDelete(query, queryValues, exists) {
  const action = "DELET";
  const notFoundMessage =
    local + `>Exists?>Not found item with id ${queryValues[0]}.`;
  const successMessage =
    local +
    `>Item ${action}ED successfully: there is no more item with id ${queryValues[4]}.`;
  const errorMessage = local + `>Error while ${action}ING`;
  local += `default ${action}E>`;
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 404;
  if (!exists) {
    message = notFoundMessage;
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message = successMessage;
      statusCode = 200;
      isDebugging && console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = errorMessage;
      isDebugging && console.error(message, statusCode, error);
    }
  }
  return getPayloadResponse(
    message,
    query,
    queryValues,
    queryResult,
    localError,
    statusCode
  );
}

export {
  dbExecute,
  checkExistance,
  getPayloadResponse,
  defaultCreate,
  defaultRead,
  defaultUpdate,
  defaultDelete,
};
