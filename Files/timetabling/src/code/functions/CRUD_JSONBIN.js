import options from "../temp/options";

let JB = options.JBVars;

function updateData(objectToPut, binToPut = JB.bins.testing) {
  let stringifyedObject = JSON.stringify(objectToPut);

  let req = new XMLHttpRequest();
  req.open("PUT", JB.BaseLink + binToPut, true);
  req.setRequestHeader(JB.headerKey.contentType, JB.headerVal.contentType);
  req.setRequestHeader(JB.headerKey.masterKey, JB.headerVal.masterKey);
  req.send(stringifyedObject);

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      console.log(req.responseText);
      console.log("Atualizei pra ti, chefe");
    }
  };
}

async function readData(binToRead = JB.bins.testing) {
  function cleanResponse(dirty) {
    let clean = JSON.parse(dirty).record;
    return clean;
  }
  console.log("reading...", JB.bins.testing);

  return new Promise((resolve, reject) => {
    // Preparando a requisição
    let req = new XMLHttpRequest();
    req.open("GET", JB.BaseLink + binToRead, true);
    req.setRequestHeader(JB.headerKey.masterKey, JB.headerVal.masterKey);
    req.send();

    // O que fazer após concluir a requisição
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          let answer = cleanResponse(req.responseText);
          console.log("Finally read the data:", answer);
          resolve(answer);
        } else {
          reject(new Error(req.statusText));
        }
      }
    };

    // Lidar com erros de rede
    req.onerror = () => {
      reject(new Error("Erro de rede"));
    };
  });
}

// import { readData, updateData } from "../functions/CRUD_JSONBIN";
//
// let dataReceived = await readData();
// console.log("valor que eu quero receber:", dataReceived);
//
// function MainPage() {
// const [testDict, setTestDict] = useState(dataReceived);

export { readData, updateData };
