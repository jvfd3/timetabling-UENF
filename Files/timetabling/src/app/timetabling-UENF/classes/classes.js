import "./classes.css";
import React, { useEffect, useState } from "react";
import text from "../../../config/frontText";
import myStyles from "../../../config/myStyles";
import ClassTimeTable from "../../../components/ClassTimeTable/ClassTimeTable";
import { ClassesFilters } from "../../../components/Filters/Filters";
import { sortClassesSelection } from "../../../components/Sorts/sortingFunctions";
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
  TextInputClassDescription,
  TextInputClassExpectedDemand,
  TextInputClassId,
} from "../../../components/MyTextFields";
import {
  getDefaultClassItem,
  getSelectStates,
  replaceNewItemInListById,
} from "../../../helpers/auxCRUD";
import NoSelectedObject from "../../../components/Dumb/NoSelectedObject";
import sqlDataFromJson from "../../../DB/dataFromJSON";
import { mergeClassesToClassTimes } from "../../../helpers/auxFunctions";
import configInfo from "../../../config/configInfo";

const defaultClassNames = myStyles.classNames.default;
const pageTexts = text.page.classes;

function ClassSelection({ classStates }) {
  /* It just contains the selection an maybe allows scrolling selection */
  const createStates = {
    ...classStates,
    classes: sortClassesSelection(classStates.classes),
  };

  const ClassCRUDFunctions = {
    createFunc: () => createClass(createStates),
    readFunc: () => readClass(classStates),
    updateFunc: () => updateClass(classStates),
    deleteFunc: () => deleteClass(classStates),
  };

  return (
    <div className={defaultClassNames.containerItemSelection}>
      <CRUDButtonsContainer {...ClassCRUDFunctions} />
      <SelectClassItem {...createStates} />
      <ClassesFilters {...createStates} />
    </div>
  );
}

function BaseInfoCard(oldClassesStates) {
  const { classStates, selectStates, conflicts } = oldClassesStates;
  const classesStates = {
    ...classStates,
    professors: selectStates.professorStates.professors,
    subjects: selectStates.subjectStates.subjects,
    rooms: selectStates.roomStates.rooms,
  };
  const conflictStyles = conflicts.styled;

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>{pageTexts.title}</h3>
      <table className={defaultClassNames.componentTable}>
        <tbody>
          <tr>
            <th>{pageTexts.tableTitles.yearSemester}</th>
            <td
              className={myStyles.classNames.local.page.classes.horizontalIcons}
            >
              <SelectClassYear {...classesStates} />
              <SelectClassSemester {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.subject}</th>
            <td {...conflictStyles.subject.merged}>
              <SelectClassSubject {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.professor}</th>
            <td {...conflictStyles.professor.merged}>
              <SelectClassProfessor {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.expectedDemand}</th>
            <td {...conflictStyles.expectedDemand.merged}>
              <TextInputClassExpectedDemand {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.description}</th>
            <td>
              <TextInputClassDescription {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>{pageTexts.tableTitles.id}</th>
            <td>
              <TextInputClassId {...classesStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function ClassTimesTable({ classStates, conflicts }) {
  const classTimes = classStates?.classItem?.horarios ?? [];
  const classTimeTableStates = {
    ...classStates,
    conflicts,
  };

  return (
    <div className={defaultClassNames.containerCardBaseInfo}>
      <h3>
        {classTimes.length > 0
          ? pageTexts.classTimeTitles.classTimes
          : pageTexts.classTimeTitles.addClassTime}
      </h3>
      <ClassTimeTable {...classTimeTableStates} />
    </div>
  );
}

function ClassCard(globalStates) {
  return (
    <div className={defaultClassNames.containerCardsHolder}>
      <BaseInfoCard {...globalStates} />
      <ClassTimesTable {...globalStates} />
      {/* <Participants /> */}
    </div>
  );
}

function Classes() {
  let classTimes = [];
  let onlyClasses = [];
  let defaultClasses = [];
  let defaultClassItem = null;

  if (configInfo.usesLocalJSON) {
    onlyClasses = sqlDataFromJson.classes;
    classTimes = sqlDataFromJson.classtimes;
    defaultClasses = mergeClassesToClassTimes(onlyClasses, classTimes);
    defaultClassItem = defaultClasses[0];
  }

  const [classes, setClasses] = useState(defaultClasses);
  const [filteredClasses, setFilteredClasses] = useState(defaultClasses);
  const [classItemFilter, setClassItemFilter] = useState(getDefaultClassItem());

  const selectStates = getSelectStates();

  const [classItem, setClassItem] = useState(defaultClassItem);

  const conflicts = getClassItemConflicts(filteredClasses, classItem);

  const classStates = {
    classItem,
    setClassItem,
    classes,
    setClasses,
    filteredClasses,
    setFilteredClasses,
    classItemFilter,
    setClassItemFilter,
  };

  const globalStates = {
    selectStates,
    classStates,
    conflicts,
  };

  const noClass = { title: pageTexts.noSelectedObject };

  const readClassProps = {
    classes,
    setClasses,
    setClassItem: setClassItem,
  };

  useEffect(() => {
    readClass(readClassProps);
  }, []);

  useEffect(() => {
    setClasses((oldClasses) => replaceNewItemInListById(classItem, oldClasses));
  }, [classItem]);

  return (
    <div className={defaultClassNames.containerCards}>
      <ClassSelection {...globalStates} />
      {classItem ? (
        <ClassCard {...globalStates} />
      ) : (
        <NoSelectedObject {...noClass} />
      )}
    </div>
  );
}

export default Classes;
