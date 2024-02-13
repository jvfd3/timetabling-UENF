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
    specificTexts: frontText.room,
  };

  return <ClassesTableView {...customPageStates} />;
}

function ProfessorClasses(professor) {
  const customPageStates = {
    baseFilter: filterProfessor,
    baseValueToFilter: professor,
    specificTexts: frontText.professor,
  };

  return <ClassesTableView {...customPageStates} />;
}

function SubjectClasses(subject) {
  const customPageStates = {
    baseFilter: filterSubject,
    baseValueToFilter: subject,
    specificTexts: frontText.subject,
  };

  return <ClassesTableView {...customPageStates} />;
}

export { RoomClasses, ProfessorClasses, SubjectClasses };
