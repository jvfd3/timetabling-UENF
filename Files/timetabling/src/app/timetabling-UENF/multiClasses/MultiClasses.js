import "./multiClasses.css";
import React, { useState, useEffect } from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";
import ClassesTable from "../../../components/MultiClasses/ClassItemTable";
import NotOfferedSubjects from "../../../components/MultiClasses/NotOfferedSubjects/NotOfferedSubjects";
import { readClass } from "../../../helpers/CRUDFunctions/classCRUD";
import { MultiClassesFilters } from "../../../components/Filters/Filters";
import { SmartCreateClassItem } from "../../../components/Buttons/Smart/Smart";
import { getDefaultClassItem, getSelectStates } from "../../../helpers/auxCRUD";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.multiClasses;

function MultiClassesCardHeader({ filterStates }) {
  return (
    <div className={myStyles.classNames.local.page.multiClasses.header}>
      <h2>{pageTexts.title}</h2>
      <MultiClassesFilters {...filterStates} />
    </div>
  );
}

function NoOfferedClasses(createClassItemStates) {
  return (
    <div className={myStyles.classNames.local.page.multiClasses.noClasses}>
      <p>{pageTexts.noClasses}</p>
      <SmartCreateClassItem {...createClassItemStates} />
    </div>
  );
}

function MultiClassesCard(globalStates) {
  const hasClasses = globalStates.classStates.filteredClasses.length > 0;
  return (
    <div className={defaultClassNames.containerCardsHolder}>
      <MultiClassesCardHeader {...globalStates} />
      <div className={defaultClassNames.containerCardBaseInfo}>
        {hasClasses ? (
          <ClassesTable {...globalStates} />
        ) : (
          <NoOfferedClasses {...globalStates.createClassItemStates} />
        )}
      </div>
    </div>
  );
}

function MultiClasses() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItem, setClassItem] = useState(getDefaultClassItem());
  const [classItemFilter, setClassItemFilter] = useState(getDefaultClassItem());

  const selectStates = getSelectStates();

  const classStates = {
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItem,
    setClassItem,
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
  // I want to remove this setClassItem
  const createClassItemStates = { setClasses, classItemFilter };
  const globalStates = {
    classStates,
    filterStates,
    createClassItemStates,
    rooms: [...selectStates.roomStates.rooms],
    subjects: [...selectStates.subjectStates.subjects],
    professors: [...selectStates.professorStates.professors],
  };

  useEffect(() => {
    readClass(classStates);
  }, []);

  return (
    <div className={defaultClassNames.containerCards}>
      <MultiClassesCard {...globalStates} />
      {/* <NotOfferedSubjects {...globalStates} /> */}
    </div>
  );
}

export default MultiClasses;
