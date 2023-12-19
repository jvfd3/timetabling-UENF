import axios from "axios";
import options from "../../code/temp/options";
import { toast } from "react-toastify";

let url = options.AWS.fullEndpoint;

/*
API CREATE RETURN:
{

}
*/

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
    if (res.data.statusCode === 201 || res.status === 200) {
      let currentId = res.data.body.queryResult[0].insertId;
      toast.success(`Professor criado: ${currentId}`);
      return currentId;
    } else {
      // Trate outros códigos de status aqui
      let errorMessage = `Erro ${res.status} ao criar professor. Mensagem: ${res.data.body.message}`;
      console.error(errorMessage);
      toast.error(errorMessage);
    }
  } catch (error) {
    toast.error("erro externo", error);
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
    toast.error("read Professores Axios Error: <", error, ">");
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
  console.log("ready for an updating journey?", professor);
  let localEndpoint = "professores";
  let localUrl = url + localEndpoint;
  try {
    const res = await axios.put(localUrl, { newProfessor: professor });
    if (res.data.statusCode === 200) {
      // toast.success(`Professor atualizado! ${JSON.stringify(professor)}`);
      toast.success(`Professor atualizado!`);
      // console.log(
      //   "CRUDTesting>CRUDConverter>axiosConnection>UpdateProfessor>res",
      //   res
      // );
      return JSON.parse(res.data.body);
    } else if (res.data.statusCode === 400) {
      // Tratamento para código de status 400
      toast.warning(`Erro ao atualizar professor: ${res.data.body.message}`);
      // console.error(
      //   `Erro ${res.status} ao atualizar professor. Mensagem: ${res.data.body.message}`
      // );
    } else if (res.data.statusCode === 500) {
      // Tratamento para código de status 500
      toast.error(
        `Erro interno do servidor ao atualizar professor: ${res.data.body.message}`
      );
      // console.error(
      //   `Erro ${res.status} ao atualizar professor. Mensagem: ${res.data.body.message}`
      // );
    } else {
      // Trate outros códigos de status aqui
      // console.error(
      //   `Erro ${res.status} ao atualizar professor. Mensagem: ${res.data.body.message}`
      // );
    }
  } catch (error) {
    toast.error("erro externo", error);
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
