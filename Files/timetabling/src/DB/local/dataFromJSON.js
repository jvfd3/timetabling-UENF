/* SQL */
import disciplinasDataSQL from "./JSON/SQL/disciplinas.json";
import professoresDataSQL from "./JSON/SQL/professores.json";
import salasDataSQL from "./JSON/SQL/salas.json";
import turmasDataSQL from "./JSON/SQL/turmas.json";
import horariosDataSQL from "./JSON/SQL/horarios.json";
import infoAlunosDataSQL from "./JSON/SQL/alunos.json";

import professorsDataSQL from "./JSON/SQL/professores.json";
import classtimesDataSQL from "./JSON/SQL/horarios.json";
import subjectsDataSQL from "./JSON/SQL/disciplinas.json";
import studentsDataSQL from "./JSON/SQL/alunos.json";
import classesDataSQL from "./JSON/SQL/turmas.json";
import roomsDataSQL from "./JSON/SQL/salas.json";

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

const sqlDataFromJson = {
  professors: professorsDataSQL,
  classtimes: classtimesDataSQL,
  subjects: subjectsDataSQL,
  students: studentsDataSQL,
  classes: classesDataSQL,
  rooms: roomsDataSQL,
};

// Talvez esse seja um ponto de melhoria. Por estar catando todos os dados de uma vez só, pode ser que o sistema fique lento.

export { allLocalJsonData, sqlDataFromJson };
