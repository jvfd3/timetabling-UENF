import React, { useEffect, useState } from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";
import configInfo from "../../../config/configInfo";
import emptyObjects from "../../../config/emptyObjects";
import ClassTimeTable from "../../../components/ClassTimeTable/ClassTimeTable";
import CRUDPageSelection from "../../../components/PageSelection/PageSelect";
import { readRoom } from "../../../helpers/CRUDFunctions/roomCRUD";
import { readSubject } from "../../../helpers/CRUDFunctions/subjectCRUD";
import { readProfessor } from "../../../helpers/CRUDFunctions/professorCRUD";
import { ClassesFilters } from "../../../components/Filters/Filters";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
import { getClassItemConflicts } from "../../../helpers/conflicts/centralConflicts";
import {
  SelectClassItem,
  SelectClassYear,
  SelectClassSemester,
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import {
  createClass,
  readClass,
  updateClass,
  deleteClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import {
  TextInputClassExpectedDemand,
  TextInputClassId,
} from "../../../components/MyTextFields";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.classes;

function ClassSelection(classStates) {
  /* It just contains the selection an maybe allows scrolling selection */
  const createStates = {
    ...classStates,
    classItem: {
      ...classStates.classItem,
      disciplina: emptyObjects.classItem.disciplina,
    },
  };

  const ClassCRUDFunctions = {
    createFunc: () => createClass(createStates),
    readFunc: () => readClass(classStates),
    updateFunc: () => updateClass(classStates),
    deleteFunc: () => deleteClass(classStates),
  };

  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...ClassCRUDFunctions} />
      <SelectClassItem {...classStates} />
      <ClassesFilters {...classStates} />
    </div>
  );
}

function BaseInfoCard(classesStates) {
  const conflictStyles = classesStates.conflicts.styled;
  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{pageTexts.tableTitles.yearSemester}</th>
            <td>
              <SelectClassYear {...classesStates} />
              <SelectClassSemester {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.subject}</th>
            <td {...conflictStyles.subject.merged}>
              <SelectClassSubject {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.professor}</th>
            <td {...conflictStyles.professor.merged}>
              <SelectClassProfessor {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.expectedDemand}</th>
            <td {...conflictStyles.expectedDemand.merged}>
              <TextInputClassExpectedDemand {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.id}</th>
            <td>
              <TextInputClassId {...classesStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ClassTimesTable(classesStates) {
  const classTimes = classesStates?.classItem?.horarios ?? [];

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>
        {classTimes.length > 0
          ? pageTexts.classTimeTitles.classTimes
          : pageTexts.classTimeTitles.addClassTime}
      </h3>
      <ClassTimeTable {...classesStates} />
    </div>
  );
}

function Classes() {
  const defaultClasses = [];
  const [classes, setClasses] = useState(defaultClasses);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItem, setClassItem] = useState(
    classes?.[configInfo.defaultIndexes.classItem] ?? classes?.[0]
  );
  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);

  const selectStates = {
    professors,
    setProfessors,
    professor: {},
    setProfessor: () => {},
    subjects,
    setSubjects,
    subject: {},
    setSubject: () => {},
    rooms,
    setRooms,
    room: {},
    setRoom: () => {},
  };

  const conflicts = getClassItemConflicts(filteredClasses, classItem);
  const classesStates = {
    ...selectStates,
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItem,
    setClassItem,
    conflicts,
  };

  useEffect(() => {
    readClass(classesStates);
    readProfessor(selectStates);
    readSubject(selectStates);
    readRoom(selectStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <ClassSelection {...classesStates} />
      <div className={defaultClassNames.containerCardsHolder}>
        <BaseInfoCard {...classesStates} />
        <ClassTimesTable {...classesStates} />
        {/* <Participants /> */}
      </div>
    </div>
  );
}

function CRUDclass() {
  const defaultPageValue = configInfo.pageSelection.classes;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Classes />
    </div>
  );
}

export default CRUDclass;
