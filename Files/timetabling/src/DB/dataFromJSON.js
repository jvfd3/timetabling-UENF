import professorsDataSQL from "./JSON/professores.json";
import classtimesDataSQL from "./JSON/horarios.json";
import subjectsDataSQL from "./JSON/disciplinas.json";
import studentsDataSQL from "./JSON/alunos.json";
import classesDataSQL from "./JSON/turmas.json";
import salasDataSQL from "./JSON/salas.json";
import roomsDataSQL from "./JSON/rooms.json";

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

export default sqlDataFromJson;
