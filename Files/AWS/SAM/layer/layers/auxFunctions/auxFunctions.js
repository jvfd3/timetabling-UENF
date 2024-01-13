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

module.exports = { getPayloadResponse };
