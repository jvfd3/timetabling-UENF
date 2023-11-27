import { allLocalJsonData } from "../../DB/dataFromJSON"
import { options } from "../temp/options"
import { updateData } from "./CRUD_JSONBIN"

console.log("ovô atualizar")
// updateData(allLocalJsonData.static.infoProfessores, options.JBVars.bins.infoProfessores)
// updateData(allLocalJsonData.static.infoSalas, options.JBVars.bins.infoSalas)
// updateData(allLocalJsonData.static.infoDisciplinasCC, options.JBVars.bins.infoDisciplinasCC)
// updateData(allLocalJsonData.static.infoAlunos, options.JBVars.bins.infoAlunos)
// updateData(allLocalJsonData.dynamic.andamentoAlunos, options.JBVars.bins.andamentoAlunos)
updateData(allLocalJsonData.dynamic.preferenciasProfessores, options.JBVars.bins.preferenciasProfessores)

console.log("atualizô?")