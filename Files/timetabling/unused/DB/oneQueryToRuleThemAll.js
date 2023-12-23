import axios from "axios";
import { toast } from "react-toastify";
import options from "../code/temp/options";

async function customQuery(queryStr) {
  console.log(queryStr);
  let url = options.AWS.fullEndpoint;
  try {
    const response = await axios.post(url, { query: queryStr });
    console.log("oneQueryResponse", response);
    let receivedData = JSON.parse(response.data.body);
    // console.log("interno", receivedData.length);
    toast.success(`Dados lidos com sucesso: ${queryStr}`);
    return receivedData;
  } catch (error) {
    toast.error("toaster interno", error);
    throw error;
  }
}

async function customQuery2(queryStr) {
  console.log(queryStr);
  let url = options.AWS.fullEndpoint;
  axios
    .post(url, { query: queryStr })
    .then((response) => {
      let data = response.data;
      let status = data.statusCode;
      if (status !== 200) {
        toast.error(`Erro interno: ${status}`);
        return [];
      } else {
        toast.success(`Ok Interno: ${queryStr}`);
        let receivedData = JSON.parse(data.body);
        return receivedData;
      }
    })
    .catch((error) => {
      toast.error(error);
    });
}

export { customQuery, customQuery2 };
