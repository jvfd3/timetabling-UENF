const mysql = require("mysql2/promise");

let local = "db.js>";

async function getDbConfig() {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };
  return dbConfig;
}

async function createDbConnection() {
  try {
    const dbConfig = getDbConfig();
    return await mysql.createConnection(dbConfig);
  } catch (err) {
    let error = new Error(["db.js>createDbConnection", err]);
    console.error(error);
    throw error;
  }
}

async function dbExecute(query, values = null) {
  try {
    let dbConnection = await createDbConnection();
    let queryResult = await dbConnection.execute(query, values);
    await dbConnection.end();
    return queryResult;
  } catch (err) {
    let error = new Error(["db.js>dbExecute", err]);
    console.error(error);
    throw error;
  }
}

async function checkExistance(checkQuery, idInList) {
  local += ">checkExistance";
  let message = local;
  try {
    const queryResult = await dbExecute(checkQuery, idInList);
    const rows = queryResult[0] ?? [];
    return rows.length > 0;
  } catch (error) {
    message = `>Erro ao executar a {query: ${checkQuery}}`;
    console.error(message, error);
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
    queryResult: queryResult?.[0] ?? null,
    error: error ?? null,
  };
  const payloadResponse = {
    statusCode: statusCode ?? null,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*", // Permite que qualquer origem acesse
      "Access-Control-Allow-Credentials": true, // Permite o envio de cookies
    },
    body: JSON.stringify(myBody ?? null),
  };
  console.log(payloadResponse);
  return payloadResponse;
}

async function defaultCreate(query, queryValues, exists) {
  const action = "CREAT";
  const errorMessage = `>Error while ${action}ING`;
  const successMessage = `>Item ${action}ED successfully: ${queryValues}`;
  local += ">default " + action + "E";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 201;

  if (!exists) {
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      message += successMessage;
      console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = local + errorMessage;
      console.error(message, statusCode, error);
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
  local += ">default " + action;
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 200;

  if (!exists) {
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      message += successMessage + `${queryResult.length}`;
      console.log(message, statusCode, queryResult?.[0]);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = local + errorMessage;
      console.error(message, statusCode, error);
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

async function defaultUpdate(query, queryValues, exists) {
  const action = "UPDAT";
  local += `>default ${action}E`;
  let message = local;
  const notFoundMessage =
    local + `>Exists?>Not found item with id ${queryValues[4]}.`;
  const successMessage =
    local +
    `>Item ${action}ED successfully: Item with id ${queryValues[4]} now has the values: ${queryValues}.`;
  const errorMessage = local + `>Error while ${action}ING`;
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
      console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = errorMessage;
      console.error(message, statusCode, error);
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
  let action = "DELET";
  local += `>default ${action}E`;
  let message = local;
  const notFoundMessage =
    local + `>Exists?>Not found item with id ${queryValues[0]}.`;
  const successMessage =
    local +
    `>Item ${action}ED successfully: there is no more item with id ${queryValues[4]}.`;
  const errorMessage = local + `>Error while ${action}ING`;
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
      console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = errorMessage;
      console.error(message, statusCode, error);
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

module.exports = {
  dbExecute,
  checkExistance,
  getPayloadResponse,
  defaultCreate,
  defaultRead,
  defaultUpdate,
  defaultDelete,
};
