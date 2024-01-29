import "./multiTurmas.css";
import React, { useState, useEffect } from "react";
import { SmartCreateClassItem } from "../../../components/Buttons/Smart/Smart";
import { MultiClassesFilters } from "../../../components/Filters/Filters";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import ClassesTable from "../../../components/ClassItemTable/ClassItemTable";
import NotOfferedSubjects from "../../../components/multiClasses/NotOfferedSubjects";
import {
  createClass,
  readClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import { readSubject } from "../../../helpers/CRUDFunctions/subjectCRUD";
import { readProfessor } from "../../../helpers/CRUDFunctions/professorCRUD";
import { readRoom } from "../../../helpers/CRUDFunctions/roomCRUD";
import {
  getDefaultClassItem,
  getDefaultClassTime,
} from "../../../helpers/auxCRUD";

function MultiClassesCardHeader(globalStates) {
  return (
    <div className="MultiTurmasTitle">
      <h2>MultiTurmas</h2>
      <MultiClassesFilters {...globalStates} />
    </div>
  );
}

function NoOfferedClasses(classStates) {
  const createStates = {
    classesStates: classStates,
    year: classStates.classItem.ano,
    semester: classStates.classItem.semestre,
    createClassDB: createClass,
  };
  return (
    <div
      className="infoCard"
      style={{
        display: "flex",
        flexDirection: "row",
        textAlignLast: "center",
        alignItems: "center",
      }}
    >
      <p>Ainda não há turmas cadastradas. Para criar uma turma clique aqui: </p>
      <SmartCreateClassItem {...createStates} />
    </div>
  );
}

function MultiClassesCard(globalStates) {
  const { classStates } = globalStates;
  const hasClasses = classStates.filteredClasses.length > 0;
  return (
    <div className="infoCard">
      <MultiClassesCardHeader {...globalStates} />
      <div className="showBasicDataCard">
        {hasClasses ? (
          <ClassesTable {...globalStates} />
        ) : (
          <NoOfferedClasses {...classStates} />
        )}
      </div>
    </div>
  );
}

function MultiClassesRefactor() {
  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);
  const [classTime, setClassTime] = useState(getDefaultClassTime());

  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItem, setClassItem] = useState(getDefaultClassItem());

  const [professors, setProfessors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);

  const classTimeStates = {
    classTimes,
    setClassTimes,
    filteredClassTimes,
    setFilteredClassTimes,
    classTime,
    setClassTime,
  };
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
  const classStates = {
    ...selectStates,
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItem,
    setClassItem,
  };

  const globalStates = { classTimeStates, classStates };

  useEffect(() => {
    readClassTime(classTimeStates);
    readClass(classStates);
    readSubject(selectStates);
    readProfessor(selectStates);
    readRoom(selectStates);
  }, []);

  return (
    <div className="CRUDContainComponents">
      <MultiClassesCard {...globalStates} />
      {/* <NotOfferedSubjects {...classStates} /> */}
    </div>
  );
}

export { MultiClassesRefactor };
