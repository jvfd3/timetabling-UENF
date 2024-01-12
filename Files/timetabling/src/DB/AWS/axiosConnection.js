import axios from "axios";
import { toast } from "react-toastify";
import options from "../local/options";

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

async function updateProfessores(professor) {
  // console.log("ready for an updating journey?", professor);
  let toastToUse = toast;
  let toastMessages = { debug: [], pretty: "" };
  let localMessage = debuggingLocal + ">updateProfessores";
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
      let res = await axios.put(localUrl, dataToSend);
      debugModeOn && debugPayload(res); // Apenas executa se debugModeOn for true
      let statusCode = res.data.statusCode;
      let body = res.data.body;
      switch (statusCode) {
        case 200: // Deu bom
          returnedData = professor;
          toastMessages.pretty = `Professor atualizado com sucesso!`;
          toastToUse = toast.success;
          break;
        case 404: // Tratamento para código de status 404 (not found)
          toastMessages.debug.push(
            `${localMessage}>404>Erro ${statusCode}> O professor não foi encontrado no BD.`
          );
          toastMessages.pretty = `Professor de id ${professor.id} não foi encontrado no banco de dados.`;
          toastToUse = toast.warning;
          break;
        default: // Trate outros códigos de status aqui
          toastMessages.debug.push(
            `${localMessage}>Default>Erro interno do servidor ao atualizar professor`
          );
          toastMessages.debug.push(body);
          localError = new Error(toastMessages.debug);
          toastToUse = toast.error;
          break;
      }
    } catch (error) {
      toastMessages.debug.push(
        `${localMessage}>ExternalCatch>{Error: ${error}}`
      );
      localError = new Error(toastMessages.debug);
      toastToUse = toast.error;
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

async function deleteProfessores(professorToDelete) {
  // console.log("ready for a deleting journey?");
  let toastToUse = toast;
  let toastMessages = { debug: [], pretty: "" };
  let localMessage = debuggingLocal + ">deleteProfessores";
  let localEndpoint = "professores/";
  let id = professorToDelete.id;
  let localUrl = url + localEndpoint + id.toString();
  let returnedData = null;
  let localError = null;
  if (!id) {
    toastMessages.debug.push(`${localMessage}>O ID "${id}" é inválido.`);
    toastMessages.pretty = `O ID "${id}" é inválido.`;
    toastToUse = toast.warning;
    localError = new Error(toastMessages.pretty);
  } else {
    try {
      let res = await axios.delete(localUrl);
      debugModeOn && debugPayload(res); // Apenas executa se debugModeOn for true
      let statusCode = res.data.statusCode;
      let body = res.data.body;
      switch (statusCode) {
        case 200: // Deu bom
          toastMessages.pretty = `Professor deletado com sucesso!`;
          toastToUse = toast.success;
          returnedData = professorToDelete;
          break;
        case 404: // Tratamento para código de status 404 (not found)
          toastMessages.debug.push(
            `${localMessage}>404>Erro ${statusCode}> O professor não foi encontrado no BD.`
          );
          toastMessages.pretty = `Erro ${statusCode} ao deletar professor: id ${id} não encontrado.`;
          toastToUse = toast.warning;
          break;
        default: // Trate outros códigos de status aqui
          toastMessages.debug.push(`${localMessage}>Default>`);
          toastMessages.pretty = "Ocorreu um erro ao deletar o professor.";
          toastMessages.debug.push(body);
          localError = new Error(toastMessages.debug);
          toastToUse = toast.error;
          break;
      }
    } catch (error) {
      toastMessages.debug.push(
        `${localMessage}>ExternalCatch>{Error: ${error}}`
      );
      toastMessages.pretty = `Erro interno ao deletar professor.`;
      localError = new Error(toastMessages.debug);
      toastToUse = toast.error;
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.error(toastMessages.debug);
    throw localError;
  }
  return returnedData;
}

export { axiosTeste, readTurmas, updateProfessores, deleteProfessores };
