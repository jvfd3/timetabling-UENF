/* SQL */
import disciplinasDataSQL from "./JSON/SQL/disciplinas.json";
import professoresDataSQL from "./JSON/SQL/professores.json";
import salasDataSQL from "./JSON/SQL/salas.json";
import turmasDataSQL from "./JSON/SQL/turmas.json";
import horariosDataSQL from "./JSON/SQL/horarios.json";
import infoAlunosDataSQL from "./JSON/SQL/alunos.json";

const allLocalJsonData = {
  SQL: {
    disciplinas: disciplinasDataSQL,
    professores: professoresDataSQL,
    salas: salasDataSQL,
    turmas: turmasDataSQL,
    horarios: horariosDataSQL,
    alunos: infoAlunosDataSQL,
  },
};

// Talvez esse seja um ponto de melhoria. Por estar catando todos os dados de uma vez só, pode ser que o sistema fique lento.

export { allLocalJsonData };
