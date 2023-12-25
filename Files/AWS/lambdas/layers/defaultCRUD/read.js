async function defaultRead(query, queryValues) {
  let action = "READ";
  let statusCode = 200;
  
  let successMessage = ">itens lidos com sucesso: ";
  let local = ">default " + action;
  let errorMessage = ">Erro ao executar a operação " + action;
  let message = local;
  let queryResult = null;
  let localError = null;

  if (false) {


  } else {
    try {
      queryResult = await dbExecute(query, queryValues);
      queryResult[1] = null; // remove excessive metadata
      message += successMessage + `${queryResult.length}`;
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
