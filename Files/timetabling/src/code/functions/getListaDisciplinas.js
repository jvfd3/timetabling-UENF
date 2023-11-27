import options from "../temp/options";
import {readData} from "../functions/CRUD_JSONBIN";

// import {allLocalJsonData} from "../../DB/dataFromJSON";

// let disciplinasInfoDB = allLocalJsonData.static.infoDisciplinasCC;


let DBdisciplinas = await readData(options.JBVars.bins.infoDisciplinasCC);

function getNomeDisciplina(codigoDisciplina) {
    let disciplina = DBdisciplinas.ementa_cc.find(
      (disciplina) => disciplina.codigo === codigoDisciplina
    );
    return disciplina.nome;
  }
  
function getNomesDasDisciplinas(listaDeCodigos) {
let listaDeCodigosNomes = [];
for (let i = 0; i < listaDeCodigos.length; i++) {
    let codigo = listaDeCodigos[i];
    let nome = getNomeDisciplina(codigo);
    listaDeCodigosNomes.push({ value: codigo, label: nome });
}
return listaDeCodigosNomes;
}

function getCodigoNomeDisciplinas() {
  let disciplinas_RS = DBdisciplinas.ementa_cc.map((disciplina) => ({
    value: disciplina.codigo,
    label: disciplina.nome,
}));
return disciplinas_RS;
}

const disciplinas_RS = getCodigoNomeDisciplinas();

export {getNomesDasDisciplinas, getCodigoNomeDisciplinas}