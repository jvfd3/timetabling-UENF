import { allLocalJsonData } from "../../DB/dataFromJSON";
import options from "../temp/options";
import { updateData } from "./CRUD_JSONBIN";

console.log("ovô atualizar");

function updateDB(bin) {
  let data;
  switch (bin) {
    // PROFESORES
    case options.JBVars.bins.infoProfessores:         data = allLocalJsonData.static.infoProfessores;          break;
    // SALAS
    case options.JBVars.bins.infoSalas:               data = allLocalJsonData.static.infoSalas;                break;
    // DISCIPLINAS
    case options.JBVars.bins.infoDisciplinasCC:       data = allLocalJsonData.static.infoDisciplinasCC;        break;
    // ALUNOS
    case options.JBVars.bins.infoAlunos:              data = allLocalJsonData.static.infoAlunos;               break;
    // ANDAMENTO ALUNOS
    case options.JBVars.bins.andamentoAlunos:         data = allLocalJsonData.dynamic.andamentoAlunos;         break;
    // PREFERENCIA DE PROFESSORES
    case options.JBVars.bins.preferenciasProfessores: data = allLocalJsonData.dynamic.preferenciasProfessores; break;
    default: break;
  }
  updateData(data, bin);
}

// updateData(allLocalJsonData.static.infoProfessores, options.JBVars.bins.infoProfessores)
// updateData(allLocalJsonData.static.infoSalas, options.JBVars.bins.infoSalas)
// updateData(allLocalJsonData.static.infoDisciplinasCC, options.JBVars.bins.infoDisciplinasCC);
// updateData(allLocalJsonData.static.infoAlunos, options.JBVars.bins.infoAlunos)
// updateData(allLocalJsonData.dynamic.andamentoAlunos, options.JBVars.bins.andamentoAlunos)
// updateData(allLocalJsonData.dynamic.preferenciasProfessores, options.JBVars.bins.preferenciasProfessores)

console.log("atualizô?");

/*
import options from "../temp/options";
import { updateDB } from "../functions/update_DB";
updateDB(options.JBVars.bins.aBinQueTuTáQuerendoAtualizar);
*/

export {updateDB};