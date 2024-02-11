import axios from "axios";
import { toast } from "react-toastify";
import options from "../../src/DB/local/options";

let url = options.AWS.fullEndpoint;
let debuggingLocal = ">axiosConnection";
let debugModeOn = false;

function debugPayload(payload) {
  let local = debuggingLocal + ">debugPayload";
  console.log(`${local}>payload:`, payload);
}

async function axiosTeste(data) {
  // console.log("ready for a journey?", data);
  url += "professores";
  axios
    // .post(url, { query: data })
    .post(url, data)
    .then((response) => {
      console.log("Essa foi a resposta", response);
      // let data = response.data;
      // let status = data.statusCode;
      // if (status !== 200) {
      // toast.error(`Erro interno: ${status}`);
      // return [];
      // } else {
      // toast.success(`Ok Interno: ${queryStr}`);
      // let receivedData = JSON.parse(data.body);
      // return receivedData;
      // }
    })
    .catch((error) => {
      console.log("Deu erro no axios", error);
      toast.error(error);
    });
}

async function readTurmas() {
  // console.log("Ready for a reading journey?");
  let toastToUse = toast;
  let toastMessages = { debug: [], pretty: "" };
  let local = debuggingLocal + ">readTurmas";
  let localEndpoint = "turmas";
  let localUrl = url + localEndpoint;
  let returnedData = null;
  let localError = null;
  try {
    let res = await axios.get(localUrl);
    debugModeOn && debugPayload(res); // Apenas executa se debugModeOn for true
    let returnedTurmas = res.data.body.queryResult;
    returnedData = returnedTurmas;
    toastToUse = toast.success;
    toastMessages.debug.push(`${local}>{Turmas lidas: ` + returnedTurmas + "}");
    toastMessages.pretty = `${returnedTurmas.length} Turmas lidos com sucesso!`;
  } catch (error) {
    toastToUse = toast.error;
    localError = error;
    toastMessages.debug.push(
      `${local}>Catch>Erro interno ao ler Turmas: ${error}`
    );
    toastMessages.pretty = `Erro local ao ler Turmas.`;
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

export { axiosTeste, readTurmas };
