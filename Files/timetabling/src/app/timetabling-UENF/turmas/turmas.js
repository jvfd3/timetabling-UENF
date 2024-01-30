import React, { useEffect, useState } from "react";
import options from "../../../DB/local/options";
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

function TurmaSelection(classStates) {
  /* It just contains the selection an maybe allows scrolling selection */
  const turmaCRUDFunctions = {
    createFunc: () => createClass(classStates),
    readFunc: () => readClass(classStates),
    updateFunc: () => updateClass(classStates),
    deleteFunc: () => deleteClass(classStates),
  };

  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...turmaCRUDFunctions} />
      <SelectClassItem {...classStates} />
      <ClassesFilters {...classStates} />
    </div>
  );
}

function ClassData(classesStates) {
  const conflictStyles = classesStates.conflicts.styled;
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA TURMA</h3>
      <table className="showBasicDataTable">
        <thead></thead>
        <tbody>
          <tr>
            <th>Ano/Semestre</th>
            <td>
              <div className="SelectAnoSemestre">
                <SelectClassYear {...classesStates} />
                <SelectClassSemester {...classesStates} />
              </div>
            </td>
          </tr>
          <tr>
            <th>Disciplina</th>
            <td {...conflictStyles.subject}>
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
            <td {...conflictStyles.expectedDemand}>
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
    classes?.[options.config.defaultIndexes.classItem] ?? classes?.[0]
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

  // console.log("subjects", subjects);

  /* useEffect(() => {
    updateClass(classesStates);
  }, [
    classItem?.ano,
    classItem?.semestre,
    classItem?.disciplina?.id,
    classItem?.professor?.id,
  ]); */

  useEffect(() => {
    // console.log("initialUseEffect", subjects);
    readClass(classesStates);
    readProfessor(selectStates);
    readSubject(selectStates);
    readRoom(selectStates);
  }, []);

  const classTimes = classItem?.horarios ?? [];

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...classesStates} />
      <div className="infoCard">
        <ClassData {...classesStates} />
        <div className="showBasicDataCard">
          <h3>{classTimes.length > 0 ? "Horários" : "Adicione um horário"}</h3>
          <ClassTimeTable {...classesStates} />
        </div>
        {/* <Participants {...myTurmaStates} /> */}
      </div>
    </div>
  );
}

function CRUDclass() {
  const defaultPageValue = options.constantValues.pageSelection.classes;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Classes />
    </div>
  );
}

export default CRUDclass;
