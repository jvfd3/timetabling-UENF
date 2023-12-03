import andamentoAlunosData from "./JSON/dynamic/andamentoAlunos.json";
import preferenciasProfessoresData from "./JSON/dynamic/preferenciasProfessores.json";
import turmasData from "./JSON/dynamic/turmas.json";
import RSalunosData from "./JSON/select/RSalunos.json";
import RSdisciplinasData from "./JSON/select/RSdisciplinas.json";
import RSprofessoresData from "./JSON/select/RSprofessores.json";
import RSsalasData from "./JSON/select/RSsalas.json";
import infoAlunosData from "./JSON/static/infoAlunos.json";
import infoDisciplinasCCData from "./JSON/static/infoDisciplinasCC.json";
import infoProfessoresData from "./JSON/static/infoProfessores.json";
import infoSalasData from "./JSON/static/infoSalas.json";
import templatesData from "./JSON/templates/templates.json";
import turmasTesteData from "./JSON/tests/turmasTeste.json";
import turmaTesteAlunosData from "./JSON/tests/turmasTesteAlunos.json";
import turmasTesteConflitosProfessorData from "./JSON/tests/turmasTesteConflitosProfessor.json";
import turmasTesteConflitosSalaData from "./JSON/tests/turmasTesteConflitosSala";

const allLocalJsonData = {
  dynamic: {
    andamentoAlunos: andamentoAlunosData,
    preferenciasProfessores: preferenciasProfessoresData,
    turmas: turmasData,
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
  tests: {
    turmasTesteConflitosProfessor: turmasTesteConflitosProfessorData,
    turmasTesteConflitosSala: turmasTesteConflitosSalaData,
    turmasTesteAlunos: turmaTesteAlunosData,
    turmasTeste: turmasTesteData,
  },
  templates: templatesData,
};

console.log("Am I exporting all data from JSON?");

export { allLocalJsonData };
