/* Dynamic */
import andamentoAlunosData from "./JSON/dynamic/andamentoAlunos.json";
import preferenciasProfessoresData from "./JSON/dynamic/preferenciasProfessores.json";
import turmasData from "./JSON/dynamic/turmas.json";
/* Select */
import RSalunosData from "./JSON/select/RSalunos.json";
import RSdisciplinasData from "./JSON/select/RSdisciplinas.json";
import RSprofessoresData from "./JSON/select/RSprofessores.json";
import RSsalasData from "./JSON/select/RSsalas.json";
/* Static */
import infoAlunosData from "./JSON/static/infoAlunos.json";
import infoDisciplinasCCData from "./JSON/static/infoDisciplinasCC.json";
import infoProfessoresData from "./JSON/static/infoProfessores.json";
import infoSalasData from "./JSON/static/infoSalas.json";
/* Templates */
import templatesData from "./JSON/templates/templates.json";
/* Tests */
import alocacaoDuplaAlunosData from "./JSON/tests/alocacaoDuplaAlunos.json";
import alocacaoDuplaProfessorData from "./JSON/tests/alocacaoDuplaProfessor.json";
import alocacaoDuplaSalaData from "./JSON/tests/alocacaoDuplaSala.json";
import capacidadeSalasData from "./JSON/tests/capacidadeSalas.json";
import demandaAndamentoAlunosData from "./JSON/tests/demandaAndamentoAlunos.json";
import demandaTurmasData from "./JSON/tests/demandaTurmas.json";
import turmasTesteData from "./JSON/tests/turmasTeste.json";

import disciplinasDataSQL from "./JSON/SQL/infoDisciplinasCC.json";
import professoresDataSQL from "./JSON/SQL/infoProfessores.json";
import salasDataSQL from "./JSON/SQL/infoSalas.json";
import turmasDataSQL from "./JSON/SQL/smallturmas.json";

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
  SQL: {
    disciplinas: disciplinasDataSQL,
    professores: professoresDataSQL,
    salas: salasDataSQL,
    turmas: turmasDataSQL,
  },
  tests: {
    alocacaoDuplaAlunos: alocacaoDuplaAlunosData,
    alocacaoDuplaProfessor: alocacaoDuplaProfessorData,
    alocacaoDuplaSala: alocacaoDuplaSalaData,
    capacidadeSalas: capacidadeSalasData,
    demandaAndamentoAlunos: demandaAndamentoAlunosData,
    demandaTurmas: demandaTurmasData,
    turmasTeste: turmasTesteData,
  },
  templates: templatesData,
};

export { allLocalJsonData };
