import text from "../../config/frontText";
import ClassesTableView from "./ClassTimeViewTable";
import {
  filterRoom,
  filterSubject,
  filterProfessor,
} from "../../helpers/filteringFunc";

const frontText = text.component.classTimeViewTable.specificTexts;

function RoomClasses(room) {
  // const {id, bloco, descricao, capacidade, codigo, idBlock} = room;

  const customPageStates = {
    baseFilter: filterRoom,
    baseValueToFilter: room,
    headerTitle: frontText.room.headerTitle,
    noClassesTitle: frontText.room.noClassesTitle,
  };

  return <ClassesTableView {...customPageStates} />;
}

function ProfessorClasses(professor) {
  const customPageStates = {
    baseFilter: filterProfessor,
    baseValueToFilter: professor,
    headerTitle: frontText.professor.headerTitle,
    noClassesTitle: frontText.professor.noClassesTitle,
  };

  return <ClassesTableView {...customPageStates} />;
}

function SubjectClasses(subject) {
  const customPageStates = {
    baseFilter: filterSubject,
    baseValueToFilter: subject,
    headerTitle: frontText.subject.headerTitle,
    noClassesTitle: frontText.subject.noClassesTitle,
  };

  return <ClassesTableView {...customPageStates} />;
}

export { RoomClasses, ProfessorClasses, SubjectClasses };
