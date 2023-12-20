import axios from "axios";
import options from "../../code/temp/options";
import { toast } from "react-toastify";

let url = options.AWS.fullEndpoint;

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
    console.log(
      "CRUDTesting>CRUDConverter>axiosConnection>createProfessores>res: <",
      res,
      ">"
    );
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
  console.log("ready for a reading journey?");
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  try {
    let res = await axios.get(localUrl);
    let readProfessores = res.data.body.queryResult[0];
    toast.success(`${readProfessores.length} professores lidos com sucesso!`);
    // console.log(
    //   "CRUDTesting>CRUDConverter>axiosConnection>readProfessores>res: <",
    //   res,
    //   ">"
    // );
    return readProfessores;
  } catch (error) {
    toast.error("axiosConnection>readProfessor>Error: <", error, ">");
  }
}

async function updateProfessores(professor) {
  if (!professor) {
    let errorMessage =
      "axiosConnection>Professor inválido: " +
      professor +
      ", a requisição nem saiu do app";
    // console.error(errorMessage);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: errorMessage }),
    };
  }
  console.log("ready for an updating journey?");
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  let dataToSend = { newProfessor: professor };
  let toastMessage = "";
  try {
    let res = await axios.put(localUrl, dataToSend);
    let statusCode = res.data.statusCode;
    console.log(
      "CRUDTesting>CRUDConverter>axiosConnection>readProfessores>res: <",
      res,
      ">"
    );
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
  if (!id) {
    let errorMessage =
      "axiosConnection>ID inválido: " + id + ", a requisição nem saiu do app";
    // console.error(errorMessage);
    return {
      statusCode: 400,
      body: JSON.stringify({ message: errorMessage }),
    };
  }
  console.log("ready for a deleting journey?", id);
  let localEndpoint = "professores/";
  let localUrl = url + localEndpoint + id.toString();
  try {
    const res = await axios.delete(localUrl);
    toast.success(`Professor Deletado: ${localEndpoint}`);
    // console.log(
    // "CRUDTesting>CRUDConverter>axiosConnection>DeleteProfessor>res",
    // res
    // );
    return JSON.parse(res.data.body);
  } catch (error) {
    toast.error("erro externo", error);
  }
}

export {
  axiosTeste,
  createProfessores,
  updateProfessores,
  readProfessores,
  deleteProfessores,
};
