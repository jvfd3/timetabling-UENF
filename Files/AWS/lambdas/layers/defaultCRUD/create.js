async function defaultCreate(query, queryValues) {
  let action = "CREATE";
  let statusCode = 201;
  let successMessage = ">Item criado com sucesso: ";
  let local = ">default " + action;
  let baseActionErrorMessage = ">Erro ao executar a operação " + action;
  let message = local;
  let queryResult = null;
  let localError = null;

  if (false) {
    
    
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message += successMessage + `${queryValues}`;
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
