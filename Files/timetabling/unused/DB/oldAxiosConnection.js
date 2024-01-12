async function createProfessores(professor) {
  // console.log("ready for a creating journey?");
  let toastToUse = toast;
  let toastMessages = { debug: [], pretty: "" };
  let localMessage = debuggingLocal + ">createProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let returnedData = null;
  let localError = null;
  let dataToSend = { newProfessor: professor };
  if (!professor) {
    toastMessages.debug.push(
      `${localMessage}>O professor "${professor}" é inválido. A requisição nem saiu do app.`
    );
    toastMessages.pretty = `O professor "${professor}" é inválido.`;
    toastToUse = toast.warning;
    localError = new Error(toastMessages.debug);
    console.error(toastMessages);
  } else {
    try {
      let res = await axios.post(localUrl, dataToSend);
      debugModeOn && debugPayload(res); // Apenas executa se debugModeOn for true
      let statusCode = res.data.statusCode;
      if (statusCode === 201) {
        let currentId = res.data.body.queryResult.insertId;
        returnedData = currentId;
        toastMessages.pretty = `Professor criado com id ${currentId}.`;
        toastToUse = toast.success;
      } else {
        toastMessages.debug.push(
          `${localMessage}>Not201>Erro ${res.status}, ${statusCode} ao criar professor. Mensagem: ${res.data.body.message}`
        );
        toastMessages.pretty = `Erro ${statusCode} ao criar professor.`;
        toastToUse = toast.error;
        localError = new Error(toastMessages.debug);
      }
    } catch (error) {
      toastMessages.debug.push(`${localMessage}>{Error: ${error}}`);
      toastMessages.pretty = `Erro ao criar professor.`;
      toastToUse = toast.error;
      localError = new Error(toastMessages.debug);
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

/* async function defaultRead(url){
  let local = debuggingLocal + ">defaultRead";
  let returnedData = [null];
  let localError = null;
  let toastToUse = toast;
  let toastMessages = {
    debug: "",
    pretty: "",
  }
  try {
    let returnedPayload = axios.get(url)
    returnedData = returnedPayload.data.body.queryResult;
  } catch (error) {
    toastToUse = toast.error;
    localError = error;
  }
  if (localError) {
    console.log(toastMessages.debug)
    throw localError
  }
  return returnedData;
} */

/* async function readProfessores() {
  // console.log("Ready for a reading journey?");
  let toastToUse = toast;
  let toastMessages = { debug: [], pretty: "" };
  let local = debuggingLocal + ">readProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let returnedData = null;
  let localError = null;
  try {
    let res = await axios.get(localUrl);
    debugModeOn && debugPayload(res); // Apenas executa se debugModeOn for true
    let returnedProfessores = res.data.body.queryResult;
    returnedData = returnedProfessores;
    toastToUse = toast.success;
    toastMessages.debug.push(
      `${local}>{ProfessoresLidos: ` + returnedProfessores + "}"
    );
    toastMessages.pretty = `${returnedProfessores.length} Professores lidos com sucesso!`;
  } catch (error) {
    toastToUse = toast.error;
    localError = error;
    toastMessages.debug.push(
      `${local}>Catch>Erro interno ao ler professores: ${error}`
    );
    toastMessages.pretty = `Erro local ao ler professores.`;
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
} */
