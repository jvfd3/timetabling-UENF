import React, { useEffect, useState } from "react";
import configInfo from "../../../config/configInfo";
import emptyObjects from "../../../config/emptyObjects";
import ClassTimeTable from "../../../components/ClassTimeTable/ClassTimeTable";
import CRUDPageSelection from "../../../components/PageSelect";
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

const classNames = {
  selectionBar: "selectionBar",
  showBasicDataCard: "showBasicDataCard",
  showBasicDataTable: "showBasicDataTable",
  infoCard: "infoCard",
  CRUDContainComponents: "CRUDContainComponents",
  background: "background",
  yearSemesterSelect: "SelectAnoSemestre",
};


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
    <div className={classNames.selectionBar}>
      <CRUDButtonsContainer {...ClassCRUDFunctions} />
      <SelectClassItem {...classStates} />
      <ClassesFilters {...classStates} />
    </div>
  );
}

function BaseInfoCard(classesStates) {
  const conflictStyles = classesStates.conflicts.styled;
  return (
      <h3>INFORMAÇÕES DA TURMA</h3>
    <div className={classNames.showBasicDataCard}>
      <table className={classNames.showBasicDataTable}>
        <thead></thead>
        <tbody>
          <tr>
            <th>Ano/Semestre</th>
            <td>
              <div className={classNames.yearSemesterSelect}>
                <SelectClassYear {...classesStates} />
                <SelectClassSemester {...classesStates} />
              </div>
            </td>
          </tr>
          <tr>
            <th>Disciplina</th>
            <td {...conflictStyles.subject.merged}>
              <SelectClassSubject {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Professor</th>
            <td {...conflictStyles.professor.merged}>
              <SelectClassProfessor {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Demanda Estimada</th>
            <td {...conflictStyles.expectedDemand.merged}>
              <TextInputClassExpectedDemand {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Id</th>
            <td>
              <TextInputClassId {...classesStates} />
            </td>
          </tr>
        </tbody>
      </table>
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

  const classTimes = classItem?.horarios ?? [];

  return (
    <div className={classNames.CRUDContainComponents}>
      <ClassSelection {...classesStates} />
      <div className={classNames.infoCard}>
        <div className="showBasicDataCard">
          <h3>{classTimes.length > 0 ? "Horários" : "Adicione um horário"}</h3>
          <ClassTimeTable {...classesStates} />
        </div>
        {/* <Participants {...myTurmaStates} /> */}
        <BaseInfoCard {...classesStates} />
      </div>
    </div>
  );
}

function CRUDclass() {
  const defaultPageValue = configInfo.pageSelection.classes;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Classes />
    </div>
  );
}

export default CRUDclass;
