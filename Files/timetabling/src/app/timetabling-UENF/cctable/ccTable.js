import React, { useEffect, useState } from "react";
import myStyles from "../../../config/myStyles";
import ClassTimeGridCC from "../../../components/GridView/ClassTimeGridCC";
import { getDefaultClassItem, getSelectStates } from "../../../helpers/auxCRUD";
import { MultiClassesFilters } from "../../../components/Filters/Filters";
import { readClass } from "../../../helpers/CRUDFunctions/classCRUD";

const defaultClassNames = myStyles.classNames.default;

function CCTableView() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItemFilter, setClassItemFilter] = useState(getDefaultClassItem());

  const selectStates = getSelectStates();

  const classStates = {
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItemFilter,
    setClassItemFilter,
  };

  const filterStates = {
    setFilteredClasses,
    setClassItemFilter,
    classItemFilter,
    classes,
    selectStates,
  };

  useEffect(() => {
    readClass(classStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <MultiClassesFilters {...filterStates} />
      <div className={defaultClassNames.containerCardsHolder}>
        <ClassTimeGridCC {...classStates} />
      </div>
    </div>
  );
}

export default CCTableView;
