import "./ccTable.css";
import React, { useEffect, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import CCTableDB from "./ccTableDB";
import { CCTableFilters } from "../../../components/Filters/Filters";
import { getDefaultClassTime } from "../../../helpers/auxCRUD";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import { readSubject } from "../../../helpers/CRUDFunctions/subjectCRUD";
import { readProfessor } from "../../../helpers/CRUDFunctions/professorCRUD";
import { readRoom } from "../../../helpers/CRUDFunctions/roomCRUD";

function CCTableView() {
  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);
  const [classTime, setClassTime] = useState(getDefaultClassTime());

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

  // console.log(classTimes.length, filteredClassTimes.length);

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

  const globalStates = { classTimeStates, selectStates };

  useEffect(() => {
    // console.log("useEffect");
    readRoom(selectStates);
    readProfessor(selectStates);
    readSubject(selectStates);
    readClassTime(classTimeStates);
  }, []);

  return (
    <div className="CRUDContainComponents">
      <div className="infoCard">
        <CCTableFilters {...globalStates} />
        <CCTableDB classTimes={filteredClassTimes} />
      </div>
    </div>
  );
}

function CCTable() {
  const defaultPageValue = options.constantValues.pageSelection.CCTable;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <CCTableView />
    </div>
  );
}

export default CCTable;
