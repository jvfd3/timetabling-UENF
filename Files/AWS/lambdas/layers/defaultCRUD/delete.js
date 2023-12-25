async function defaultDelete(query, queryValues) {
  let action = "DELETE";
  let statusCode = 200;
  let local = ">default " + action;
  let notFoundMessage = local + `>Exists?>item com id ${queryValues} não encontrado.`;
  let successMessage = local + ">Deletado com sucesso item com id: ";
  let errorMessage = local + ">Erro ao executar a operação " + action;
  let message = local;
  let queryResult = null;
  let localError = null;
  let exists = await checkExistance(queryValues);
  if (!exists) {
    message += notFoundMessage;
    statusCode = 404;
  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message += successMessage + `${queryValues}`;
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
