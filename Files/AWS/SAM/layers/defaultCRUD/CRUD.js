// const { dbExecute } = require("./dbExecute.js");

async function defaultCreate(query, queryValues) {
  const action = "CREAT";
  const errorMessage = ">Error while " + action + "ING";
  const successMessage = `>Item ${action}ED successfully: ${queryValues}`;
  const local = ">default " + action + "E";
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 201;

  if (false) {
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

module.exports = { defaultCreate };
