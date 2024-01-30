import {
  filterProfessor,
  filterRoom,
  filterSubject,
} from "../../helpers/filteringFunc";
import ClassesTableView from "./ClassTimeViewTable";

function RoomClasses(room) {
  // const {id, bloco, descricao, capacidade, codigo, idBlock} = room;

  const customPageStates = {
    baseFilter: filterRoom,
    baseValueToFilter: room,
    headerTitle: "Turmas nesta sala: ",
    noClassesTitle: "Não há turmas nesta sala",
  };

  return <ClassesTableView {...customPageStates} />;
}

function ProfessorClasses(professor) {
  const customPageStates = {
    baseFilter: filterProfessor,
    baseValueToFilter: professor,
    headerTitle: "Turmas desse professor: ",
    noClassesTitle: "Não há turmas para este professor",
  };

  return <ClassesTableView {...customPageStates} />;
}

function SubjectClasses(subject) {
  const customPageStates = {
    baseFilter: filterSubject,
    baseValueToFilter: subject,
    headerTitle: "Turmas desta disciplina: ",
    noClassesTitle: "Não há turmas para esta disciplina",
  };

  return <ClassesTableView {...customPageStates} />;
}

export { RoomClasses, ProfessorClasses, SubjectClasses };
