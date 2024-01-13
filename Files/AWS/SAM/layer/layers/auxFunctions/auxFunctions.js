function getPayloadResponse(message, query, queryValues, queryResult, error, statusCode) {
  let myBody = {
    message: message ?? null,
    query: query ?? null,
    queryValues: queryValues ?? null,
    queryResult: queryResult?.[0] ?? null,
    error: error ?? null,
  };
  let payloadResponse = {
    statusCode: statusCode ?? null,
    body: myBody ?? null,
  };
  console.log(payloadResponse);
  return payloadResponse;
}

module.exports = { getPayloadResponse };