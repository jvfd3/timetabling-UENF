import "./multiClasses.css";
import React, { useState, useEffect } from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";
import ClassesTable from "../../../components/MultiClasses/ClassItemTable";
import NotOfferedSubjects from "../../../components/MultiClasses/NotOfferedSubjects/NotOfferedSubjects";
import { readRoom } from "../../../helpers/CRUDFunctions/roomCRUD";
import { readSubject } from "../../../helpers/CRUDFunctions/subjectCRUD";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import { readProfessor } from "../../../helpers/CRUDFunctions/professorCRUD";
import { MultiClassesFilters } from "../../../components/Filters/Filters";
import { SmartCreateClassItem } from "../../../components/Buttons/Smart/Smart";
import {
  createClass,
  readClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import {
  getDefaultClassItem,
  getDefaultClassTime,
} from "../../../helpers/auxCRUD";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.multiClasses;

function MultiClassesCardHeader(globalStates) {
  return (
    <div className={myStyles.classNames.local.page.multiClasses.header}>
      <h2>{pageTexts.title}</h2>
      <MultiClassesFilters {...globalStates} />
    </div>
  );
}

function NoOfferedClasses(classStates) {
  const createStates = {
    classesStates: classStates,
    year: classStates.classItem?.ano,
    semester: classStates.classItem?.semestre,
    createClassDB: createClass,
  };
  return (
    <div
      className={defaultClassNames.containerCardBaseInfo}
      style={{
        display: "flex",
        flexDirection: "row",
        textAlignLast: "center",
        alignItems: "center",
      }}
    >
      <p>{pageTexts.noClasses}</p>
      <SmartCreateClassItem {...createStates} />
    </div>
  );
}

function MultiClassesCard(globalStates) {
  const { classStates } = globalStates;
  const hasClasses = classStates.filteredClasses.length > 0;
  return (
    <div className={defaultClassNames.containerCardsHolder}>
      <MultiClassesCardHeader {...globalStates} />
      <div className={defaultClassNames.containerCardBaseInfo}>
        {hasClasses ? (
          <ClassesTable {...globalStates} />
        ) : (
          <NoOfferedClasses {...classStates} />
        )}
      </div>
    </div>
  );
}

function MultiClasses() {
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
  const classStates = {
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItem,
    setClassItem,
  };
  const professorStates = {
    professors,
    setProfessors,
    professor: {},
    setProfessor: () => {},
  };
  const subjectStates = {
    subjects,
    setSubjects,
    subject: {},
    setSubject: () => {},
  };
  const roomStates = {
    rooms,
    setRooms,
    room: {},
    setRoom: () => {},
  };
  const currentSemester = {
    year: classItem?.ano,
    semester: classItem?.semestre,
  };
  const selectStates = {
    professorStates,
    subjectStates,
    roomStates,
  };
  const globalStates = {
    classStates,
    selectStates,
    classTimeStates,
    currentSemester,
  };

  useEffect(() => {
    readRoom(roomStates);
    readClass(classStates);
    readSubject(subjectStates);
    readProfessor(professorStates);
    readClassTime(classTimeStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <MultiClassesCard {...globalStates} />
      <NotOfferedSubjects {...globalStates} />
    </div>
  );
}

export default MultiClasses;
