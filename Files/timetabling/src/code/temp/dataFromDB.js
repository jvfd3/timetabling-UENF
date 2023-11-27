import options from "../temp/options";
import { readData, updateData } from "../functions/CRUD_JSONBIN";

let JB = options.JBVars;

const DBData = {
  disciplinas: await readData(JB.bins.infoDisciplinasCC).ementa_cc,
  professores: await readData(JB.bins.infoProfessores).professores,
  alunos: await readData(JB.bins.infoAlunos).alunos,
  progressao: await readData(JB.bins.andamentoAlunos).andamento_alunos,
};

console.log("TESTE");

// import { readData, updateData } from "../functions/CRUD_JSONBIN";
//
// let dataReceived = await readData();
// console.log("valor que eu quero receber:", dataReceived);
//
// function MainPage() {
// const [testDict, setTestDict] = useState(dataReceived);

export { DBData };
