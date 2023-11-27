import options from "../code/temp/options";
import { readData } from "../code/functions/CRUD_JSONBIN";

let JB = options.JBVars;

const allDBData = {
  disciplinas: await readData(JB.bins.infoDisciplinasCC),
  professores: await readData(JB.bins.infoProfessores),
  alunos: await readData(JB.bins.infoAlunos),
  progressao: await readData(JB.bins.andamentoAlunos)
};

console.log("Am I exporting all data from DB?");

// import { readData, updateData } from "../functions/CRUD_JSONBIN";
//
// let dataReceived = await readData();
// console.log("valor que eu quero receber:", dataReceived);
//
// function MainPage() {
// const [testDict, setTestDict] = useState(dataReceived);

export { allDBData };
