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
  if (!professor) {
    let errorMessage =
      "axiosConnection>Professor inválido: " +
      professor +
      ", a requisição nem saiu do app";
    console.error(errorMessage);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: errorMessage }),
    };
  }
  console.log("ready for a creating journey?");
  // console.log("Creating professor: {", professor, "}");
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let dataToSend = { newProfessor: professor };
  try {
    let res = await axios.post(localUrl, dataToSend);
    // console.log(
    //   "CRUDTesting>CRUDConverter>axiosConnection>createProfessores>res: <",
    //   res,
    //   ">"
    // );
    if (res.data.statusCode === 201) {
      let currentId = res.data.body.queryResult[0].insertId;
      toast.success(`Professor criado com id ${currentId}`);
      return currentId;
    } else {
      // Trate outros códigos de status aqui
      let errorMessage = `Erro ${res.status} ao criar professor. Mensagem: ${res.data.body.message}`;
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  } catch (error) {
    toast.error("axiosConnection>createProfessor>Error: <", error, ">");
  }
}

async function readProfessores() {
  console.log("Ready for a reading journey?");
  let toastToUse = toast;
  let toastMessages = {
    debug: [],
    pretty: "",
  }
  let local = debuggingLocal + ">readProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let returnedData = [null];
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
  // let newDebuggingLocal = debuggingLocal + ">updateProfessores";
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let dataToSend = { newProfessor: professor };
  let toastMessage = "";
  if (!professor) {
    let toastMessage = `${newDebuggingLocal}>Professor inválido: ${professor}, a requisição nem saiu do app`;
    toast.warning(toastMessage);
    throw new Error(toastMessage);
  }
  try {
    let res = await axios.put(localUrl, dataToSend);
    let statusCode = res.data.statusCode;
    // console.log(
    //   "CRUDTesting>CRUDConverter>axiosConnection>readProfessores>res: <",
    //   res,
    //   ">"
    // );
    switch (statusCode) {
      case 200: // Deu bom
        toastMessage = `Professor atualizado com sucesso!`;
        toast.success(`Professor atualizado!`);
        let newProfessor = res.data.body.queryValues;
        return newProfessor;
      case 404: // Tratamento para código de status 404 (not found)
        toastMessage = `Erro ${statusCode} ao atualizar professor.`;
        toastMessage += `Professor de id ${professor.idprofessor} não foi encontrado.`;
        toast.warning(toastMessage);
        break;
      case 500: // Erro no servidor
        let errorInfo = {
          error: res.data.body.error,
          errorMessage: res.data.body.message,
        };
        toast.error(
          `Erro interno do servidor ao atualizar professor: ${JSON.stringify(
            errorInfo
          )}`
        );
        break;
      default: // Trate outros códigos de status aqui
        toastMessage = `Erro ${statusCode} ao atualizar professor. Mensagem: ${res.data.body.message}`;
        toast.error(toastMessage);
        break;
    }
  } catch (error) {
    toast.error("axiosConnection>createProfessor>Error: <", error, ">");
  }
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
