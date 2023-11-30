import andamentoAlunosData from "./JSON/dynamic/andamentoAlunos.json";
import preferenciasProfessoresData from "./JSON/dynamic/preferenciasProfessores.json";
import turmas_2022Data from "./JSON/dynamic/turmas_2022.json";
import turmas_passadoData from "./JSON/dynamic/turmas_passado.json";
import turmasData from "./JSON/dynamic/turmas.json";
import RSalunosData from "./JSON/select/RSalunos.json";
import RSdisciplinasData from "./JSON/select/RSdisciplinas.json";
import RSprofessoresData from "./JSON/select/RSprofessores.json";
import RSsalasData from "./JSON/select/RSsalas.json";
import infoAlunosData from "./JSON/static/infoAlunos.json";
import infoDisciplinasCCData from "./JSON/static/infoDisciplinasCC.json";
import infoProfessoresData from "./JSON/static/infoProfessores.json";
import infoSalasData from "./JSON/static/infoSalas.json";
import turmasTesteData from "./JSON/dynamic/turmasTeste.json";
import templatesData from "./JSON/templates/templates.json";

const allLocalJsonData = {
  dynamic: {
    andamentoAlunos: andamentoAlunosData,
    preferenciasProfessores: preferenciasProfessoresData,
    turmas_2022: turmas_2022Data,
    turmas_passado: turmas_passadoData,
    turmas: turmasData,
    turmasTeste: turmasTesteData,
  },
  select: {
    RSalunos: RSalunosData,
    RSdisciplinas: RSdisciplinasData,
    RSprofessores: RSprofessoresData,
    RSsalas: RSsalasData,
  },
  static: {
    infoAlunos: infoAlunosData,
    infoDisciplinasCC: infoDisciplinasCCData,
    infoProfessores: infoProfessoresData,
    infoSalas: infoSalasData,
  },
  templates: templatesData,
};

console.log("Am I exporting all data from JSON?");

export { allLocalJsonData };
