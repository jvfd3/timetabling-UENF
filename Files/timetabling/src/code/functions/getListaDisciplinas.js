
import disciplinasInfoDB from "../../DB/JSON/static/infoDisciplinasCC.json";

import options from "../temp/options";
import {readData} from "../functions/CRUD_JSONBIN";

let DBdisciplinas = await readData(options.JBVars.bins.infoDisciplinasCC);

DBdisciplinas = DBdisciplinas.ementa_cc;


function getNomeDisciplina(codigoDisciplina) {
  // console.log(codigoDisciplina)
    let disciplina = DBdisciplinas.find(
      (disciplina) => disciplina.codigo === codigoDisciplina
    );
    return disciplina.nome;
  }
  
function getNomesDasDisciplinas(listaDeCodigos) {
let listaDeCodigosNomes = [];
for (let i = 0; i < listaDeCodigos.length; i++) {
    let codigo = listaDeCodigos[i];
    let nome = getNomeDisciplina(codigo);
    // listaDeCodigosNomes.push({ [codigo]: nome });
    listaDeCodigosNomes.push({ value: codigo, label: nome });
}
return listaDeCodigosNomes;
}
  
  
function getCodigoNomeDisciplinas() {
let disciplinas = DBdisciplinas;
let disciplinas_RS = disciplinas.map((disciplina) => ({
    value: disciplina.codigo,
    label: disciplina.nome,
}));
return disciplinas_RS;
}

const disciplinas_RS = getCodigoNomeDisciplinas();

export {getNomesDasDisciplinas, disciplinas_RS}