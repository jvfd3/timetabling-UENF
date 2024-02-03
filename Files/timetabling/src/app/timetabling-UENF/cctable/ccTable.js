import React, { useEffect, useState } from "react";
import myStyles from "../../../config/myStyles";
import configInfo from "../../../config/configInfo";
import ClassTimeGridCC from "../../../components/GridView/ClassTimeGridCC";
import CRUDPageSelection from "../../../components/PageSelect";
import { readClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
import { CCTableFilters } from "../../../components/Filters/Filters";
import { getDefaultClassTime } from "../../../helpers/auxCRUD";

const defaultClassNames = myStyles.classNames.default;

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
    <div className={defaultClassNames.containerCards}>
      <CCTableFilters {...classTimeStates} />
      <div className={defaultClassNames.containerCardsHolder}>
        <ClassTimeGridCC classTimes={filteredClassTimes} />
      </div>
    </div>
  );
}

function CCTable() {
  const defaultPageValue = configInfo.pageSelection.CCTable;
  return (
    <div className={defaultClassNames.background}>
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <CCTableView />
    </div>
  );
}

export default CCTable;
