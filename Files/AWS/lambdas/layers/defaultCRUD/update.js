async function defaultUpdate(query, queryValues) {
  let local = ">defaultUpdate";
  let action = "atualização.";
  let baseActionErrorMessage = ">Erro ao executar a " + action;
  let message = local;
  let queryResult = null;
  let localError = null;
  let statusCode = 500;
  let exists = await checkExistance([queryValues[4]]);
  if (!exists) {
    message += `>Exists?>item com id ${queryValues[4]} não encontrado.`;
    statusCode = 404;
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message += `>Item com id ${queryValues[4]} adquiriu os valores ${queryValues} com sucesso.`;
      statusCode = 200;
      console.log(message, statusCode, queryResult);
    } catch (error) {
      statusCode = 500;
      localError = error;
      message = local + baseActionErrorMessage;
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
