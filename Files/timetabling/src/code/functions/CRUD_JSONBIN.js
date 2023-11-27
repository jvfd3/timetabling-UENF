const JBVars = {
  //Json Bin Variables
  BaseLink: "https://api.jsonbin.io/v3/b/",
  bin_id: "6563a5660574da7622cc69f6",
  headerNames: [
    "Content-Type",
    "X-Master-Key",
    "X-Access-Key",
    "X-Bin-Versioning",
  ],
  headers: {
    contentType: "application/json",
    masterKey: "$2a$10$ZRJif54XslBOlG.SvdaIVevb21oEDFsnyH0LjnovkwFK7vy.RvIt6",
    accessKey: "$2a$10$vQ0860DgxubMR6AngRg3AOLE5mXONyBc0BFmo.wLkIIBr8m/YTgTO",
    binVersioning: false, // "<true / false>"
  },
};

function updateData(objectToPut) {
  let stringifyedObject = JSON.stringify(objectToPut);

  let req = new XMLHttpRequest();
  req.open("PUT", JBVars.BaseLink + JBVars.bin_id, true);
  req.setRequestHeader(JBVars.headerNames[0], JBVars.headers.contentType);
  req.setRequestHeader(JBVars.headerNames[1], JBVars.headers.masterKey);
  req.send(stringifyedObject);

  req.onreadystatechange = () => {
    if (req.readyState === XMLHttpRequest.DONE) {
      console.log(req.responseText);
      console.log("Atualizei pra ti, chefe");
    }
  };
}

async function readData() {
  function cleanResponse(dirty) {
    let clean = JSON.parse(dirty).record;
    return clean;
  }
  return new Promise((resolve, reject) => {
    // Preparando a requisição
    let req = new XMLHttpRequest();
    req.open("GET", JBVars.BaseLink + JBVars.bin_id, true);
    req.setRequestHeader(JBVars.headerNames[1], JBVars.headers.masterKey);
    req.send();

    // O que fazer após concluir a requisição
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          let answer = cleanResponse(req.responseText);
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
