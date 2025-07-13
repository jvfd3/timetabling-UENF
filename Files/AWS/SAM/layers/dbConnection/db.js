const mysql = require("mysql2/promise");

let local = "db.js>";
const isDebugging = false;

function getDbConfig() {
  const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PSWD,
    database: process.env.DB_NAME,
  };
  return dbConfig;
}

async function createDbConnection() {
  local += "createDbConnection>";
  try {
    const dbConfig = getDbConfig();
    isDebugging && console.log(local, dbConfig);
    const connection = await mysql.createConnection(dbConfig);
    isDebugging && console.log(connection);
    return connection;
  } catch (err) {
    const error = new Error(local + err);
    isDebugging && console.error(error);
    throw error;
  }
}

async function dbExecute(query, values = null) {
  local += "dbExecute>";
  try {
    const dbConnection = await createDbConnection();
    isDebugging && console.log(local, query, values);
    isDebugging && console.log(local, dbConnection);
    const queryResult = await dbConnection.execute(query, values);
    isDebugging && console.log(local, queryResult);
    await dbConnection.end();
    return queryResult;
  } catch (err) {
    const error = new Error(local + err);
    isDebugging && console.error(error);
    throw error;
  }
}

async function checkExistance(checkQuery, idInList) {
  local += "checkExistance>";
  const errorMessage = `>Error while checking existance>`;
  try {
    const queryResult = await dbExecute(checkQuery, idInList);
    const rows = queryResult[0] ?? [];
    return rows.length > 0;
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
  isDebugging && console.log(payloadResponse);
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
      queryResult = await dbExecute(query, queryValues);
      message += successMessage + `${queryResult.length}`;
      isDebugging && console.log(message, statusCode, queryResult?.[0]);
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

export default {
  dbExecute,
  checkExistance,
  getPayloadResponse,
  defaultCreate,
  defaultRead,
  defaultUpdate,
  defaultDelete,
};
