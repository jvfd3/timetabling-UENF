import "./ccTable.css";
import React, { useEffect, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import CCTableDB from "./ccTableDB";
import { CCTableFilters } from "../../../components/Filters/Filters";
import { getDefaultClassTime } from "../../../helpers/auxCRUD";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";

function CCTableView() {
  const [classTimes, setClassTimes] = useState([]);
  const [filteredClassTimes, setFilteredClassTimes] = useState([]);
  const [classTime, setClassTime] = useState(getDefaultClassTime());

  const classTimeStates = {
    classTimes,
    setClassTimes,
    filteredClassTimes,
    setFilteredClassTimes,
    classTime,
    setClassTime,
  };

  useEffect(() => {
    // console.log("useEffect");
    readClassTime(classTimeStates);
  }, []);

  return (
    <div className="CRUDContainComponents">
      <div className="infoCard">
        <CCTableFilters {...classTimeStates} />
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
