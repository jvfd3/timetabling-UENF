import axios from "axios";
import options from "../../code/temp/options";
import { toast } from "react-toastify";

let url = options.AWS.fullEndpoint;
let debuggingLocal = ">axiosConnection";

function debugPayload(payload) {
  let local = debuggingLocal + ">debugPayload";
  console.log(`${local}>payload:`, payload);
}

async function axiosTeste(data) {
  console.log("ready for a journey?", data);
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

async function createProfessores(professor) {
  console.log("ready for a creating journey?");
  let toastToUse = toast;
  let toastMessages = {debug: [], pretty: ""}
  let localMessage = debuggingLocal + ">createProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let returnedData = null;
  let localError = null;
  let dataToSend = { newProfessor: professor };
  if (!professor) {
    toastMessages.debug.append(`${localMessage}>O professor "${professor}" é inválido. A requisição nem saiu do app.`);
    toastMessages.pretty = `O professor "${professor}" é inválido.`;
    console.error(toastMessages);
    localError = new Error(toastMessages.debug);
  } else {
    try {
      let res = await axios.post(localUrl, dataToSend);
      // debugPayload(res);
      if (res.data.statusCode === 201) {
        let currentId = res.data.body.queryResult.insertId;
        returnedData = currentId;
        toastMessages.pretty = `Professor criado com id ${currentId}.`;
        toastToUse = toast.success;
      } else {
        toastMessages.debug.append(`Erro ${res.status} ao criar professor. Mensagem: ${res.data.body.message}`);
        toastMessages.pretty = `Erro ${res.status} ao criar professor.`;
        toastToUse = toast.error;
      }
    } catch (error) {
      toastMessages.debug.append(`${localMessage}>{Error: ${error}}`);
      toastMessages.pretty = `Erro ao criar professor.`;
      toastToUse = toast.error;
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.log(toastMessages.debug)
    throw localError
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

async function readProfessores() {
  console.log("Ready for a reading journey?");
  let toastToUse = toast;
  let toastMessages = {debug: [], pretty: ""}
  let local = debuggingLocal + ">readProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let returnedData = null;
  let localError = null;
  try {
    let res = await axios.get(localUrl);
    // debugPayload(res);
    let returnedProfessores = res.data.body.queryResult;
    returnedData = returnedProfessores;
    toastToUse = toast.success;
    toastMessages.debug.append(`${local}>{ProfesoresLidos: ` + returnedProfessores + "}");
    toastMessages.pretty = `${returnedProfessores.length} Professores lidos com sucesso!`;
  } catch (error) {
    toastToUse = toast.error;
    localError = error;
    toastMessages.debug.append(`${local}>Catch>Erro interno ao ler professores: ${error}`);
    toastMessages.pretty = `Erro local ao ler professores.`;
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.log(toastMessages.debug)
    throw localError
  }
  return returnedData;
}

async function updateProfessores(professor) {
  console.log("ready for an updating journey?");
  let toastToUse = toast;
  let toastMessages = {debug: [], pretty: ""}
  let localMessage = debuggingLocal + ">updateProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let returnedData = null;
  let localError = null;
  let dataToSend = { newProfessor: professor };
  if (!professor) {
    toastMessages.debug.append(`${localMessage}>O professor "${professor}" é inválido. A requisição nem saiu do app.`);
    toastMessages.pretty = `O professor "${professor}" é inválido.`;
    toastToUse = toast.warning;
    localError = new Error(toastMessages.debug);
    console.error(toastMessages);
  } else {
    try {
      let res = await axios.put(localUrl, dataToSend);
      // debugPayload(res);
      let statusCode = res.data.statusCode;
      switch (statusCode) {
        case 200: // Deu bom
          let newProfessor = res.data.body.queryValues;
          returnedData = newProfessor;
          toastMessages.pretty = `Professor atualizado com sucesso!`;
          toastToUse = toast.success;
          break;
        case 404: // Tratamento para código de status 404 (not found)
          toastMessages.debug.append(`${localMessage}>404>Erro ${statusCode} ao atualizar professor.`);
          toastMessages.pretty= `Professor de id ${professor.idprofessor} não foi encontrado no banco de dados.`;
          toastToUse = toast.warning;
          break;
        default: // Trate outros códigos de status aqui
          toastMessages.debug.append(`${localMessage}>Defaul>Erro interno do servidor ao atualizar professor`);
          toastMessages.debug.append(res.data.body.message);
          toastMessages.debug.append(res.data.body.error);
          localError = new Error(toastMessages.debug);
          toastToUse = toast.error;
          break;
        }
      } catch (error) {
        toastMessages.debug.append(`${localMessage}>ExternalCatch>{Error: ${error}}`);
        localError = new Error(toastMessages.debug);
        toastToUse = toast.error;
    }
  }
  toastToUse(toastMessages.pretty);
  if (localError) {
    console.log(toastMessages.debug)
    throw localError
  }
  return returnedData;
}


async function deleteProfessores(id) {
  // let newDebuggingLocal = debuggingLocal + ">deleteProfessores";
  console.log("ready for a deleting journey?", id);
  let toastMessage = "";
  let localEndpoint = "professores/";
  let localUrl = url + localEndpoint + id.toString();
  if (!id) {
    toastMessage = `O ID "${id}" é inválido.`;
    toast.warning(toastMessage);
    throw new Error(toastMessage);
  }
  // let receivedAPIpayload = await axios.delete(localUrl);
  let deletePromise = axios
    .delete(localUrl)
    .then((receivedAPIpayload) => {
      let statusCode = receivedAPIpayload.data.statusCode;
      let body = receivedAPIpayload.data.body;
      // console.log(
      //   `${newDebuggingLocal}>receivedAPIpayload:`,
      //   receivedAPIpayload
      // );
      switch (statusCode) {
        case 200: // Deu bom
          toastMessage = "Professor deletado com sucesso!";
          toast.success(toastMessage);
          break;
        case 404: // Tratamento para código de status 404 (not found)
          toastMessage = `Erro ${statusCode} ao deletar professor. `;
          toastMessage += `Professor de id ${id} não foi encontrado.`;
          toast.warning(toastMessage);
          throw new Error(toastMessage);
        case 500: // Erro no servidor
          let errorInfo = {
            error: body.error,
            errorMessage: body.message,
          };
          toastMessage = "Erro interno do servidor ao deletar professor:";
          toastMessage += JSON.stringify(errorInfo);
          toast.error(toastMessage);
          throw new Error(toastMessage);
        default: // Trate outros códigos de status aqui
          toastMessage = "Algo inexperado aconteceu: ";
          toastMessage += JSON.stringify(receivedAPIpayload);
          toast.error(toastMessage);
          throw new Error(toastMessage);
      }
    })
    .catch((error) => {
      toastMessage = `Erro interno ao deletar professor: ${error}`;
      throw new Error(toastMessage);
    });
  return deletePromise;
}

export {
  axiosTeste,
  createProfessores,
  updateProfessores,
  readProfessores,
  deleteProfessores,
};
