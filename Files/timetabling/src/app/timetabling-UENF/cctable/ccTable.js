import React, { useEffect, useState } from "react";
import configInfo from "../../../config/configInfo";
import ClassTimeGridCC from "../../../components/GridView/ClassTimeGridCC";
import CRUDPageSelection from "../../../components/PageSelect";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import { CCTableFilters } from "../../../components/Filters/Filters";
import { getDefaultClassTime } from "../../../helpers/auxCRUD";

const classNames = {
  CRUDContainComponents: "CRUDContainComponents",
  infoCard: "infoCard",
  background: "background",
};

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
    readClassTime(classTimeStates);
  }, []);

  return (
    <div className={classNames.CRUDContainComponents}>
      <div className={classNames.infoCard}>
        <CCTableFilters {...classTimeStates} />
        <ClassTimeGridCC classTimes={filteredClassTimes} />
      </div>
    </div>
  );
}

function CCTable() {
  const defaultPageValue = configInfo.pageSelection.CCTable;
  return (
    <div className={classNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <CCTableView />
    </div>
  );
}

export default CCTable;
