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
              style={{
                gap: 5,
                display: "flex",
                flexDirection: "row",
              }}
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

function Classes() {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [classItemFilter, setClassItemFilter] = useState(getDefaultClassItem());

  const selectStates = getSelectStates();

  const [classItem, setClassItem] = useState(null);

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
      <div className={defaultClassNames.containerCardsHolder}>
        <BaseInfoCard {...globalStates} />
        <ClassTimesTable {...globalStates} />
        {/* <Participants /> */}
      </div>
    </div>
  );
}

export default Classes;
