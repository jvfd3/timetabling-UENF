import professorsDataSQL from "./JSON/SQL/professores.json";
import classtimesDataSQL from "./JSON/SQL/horarios.json";
import subjectsDataSQL from "./JSON/SQL/disciplinas.json";
import studentsDataSQL from "./JSON/SQL/alunos.json";
import classesDataSQL from "./JSON/SQL/turmas.json";
import salasDataSQL from "./JSON/SQL/salas.json";
import roomsDataSQL from "./JSON/SQL/rooms.json";

const sqlDataFromJson = {
  professors: professorsDataSQL,
  classtimes: classtimesDataSQL,
  subjects: subjectsDataSQL,
  students: studentsDataSQL,
  classes: classesDataSQL,
  rooms: roomsDataSQL,
  salas: salasDataSQL,
};

// Talvez esse seja um ponto de melhoria. Por estar catando todos os dados de uma vez só, pode ser que o sistema fique lento.

export { sqlDataFromJson };