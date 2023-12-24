/* Dynamic */
import andamentoAlunosData from "./JSON/dynamic/andamentoAlunos.json";
/* SQL */
import disciplinasDataSQL from "./JSON/SQL/disciplinas.json";
import professoresDataSQL from "./JSON/SQL/professores.json";
import salasDataSQL from "./JSON/SQL/salas.json";
import turmasDataSQL from "./JSON/SQL/turmas.json";
import horariosDataSQL from "./JSON/SQL/horarios.json";
import infoAlunosDataSQL from "./JSON/SQL/alunos.json";

const allLocalJsonData = {
  dynamic: {
    andamentoAlunos: andamentoAlunosData,
  },
  SQL: {
    disciplinas: disciplinasDataSQL,
    professores: professoresDataSQL,
    salas: salasDataSQL,
    turmas: turmasDataSQL,
    horarios: horariosDataSQL,
    alunos: infoAlunosDataSQL,
  },
};

export { allLocalJsonData };
