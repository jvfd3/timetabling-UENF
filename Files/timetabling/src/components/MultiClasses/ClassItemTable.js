import "./ClassItemTable.css";

import React, { useState } from "react";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import ClassTimeTable from "../ClassTimeTable/ClassTimeTable";
import { getClassItemConflicts } from "../../helpers/conflicts/centralConflicts";
import { SelectClassProfessor, SelectClassSubject } from "../mySelects";
import {
  NumberInputMultiClassesExpectedDemand,
  TextInputClassDescription,
} from "../MyTextFields";
import {
  createClass,
  deleteClass,
  updateClass,
} from "../../helpers/CRUDFunctions/classCRUD";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartUpdateClassItem,
} from "../Buttons/Smart/Smart";
import { getId } from "../../helpers/auxCRUD";
import { sortMultiClasses } from "../Sorts/sortingFunctions";

const frontText = text.component.classItemTable.tableTitles;
const defaultClassNames = myStyles.classNames.local.component.classItemTable;
const hasDenseClassSelects = true;

function ClassTableHeader(createStates) {
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateClassItem {...createStates} />
        </th>
        {hasDenseClassSelects ? (
          <>
            <th>
              <div className={defaultClassNames.header}>
                <p>{frontText.subject}</p>
                <p>/</p>
                <p>{frontText.professor}</p>
              </div>
            </th>
            <th>
              <div className={defaultClassNames.header}>
                <p>{frontText.expectedDemand}</p>
                <p>/</p>
                <p>{frontText.description}</p>
              </div>
            </th>
          </>
        ) : (
          <>
            <th>{frontText.subject}</th>
            <th>{frontText.professor}</th>
            <th>{frontText.expectedDemand}</th>
            <th>{frontText.description}</th>
          </>
        )}
        <th colSpan={5}>
          <div className={defaultClassNames.header}>
            <p>{frontText.classTimes}</p>
          </div>
        </th>
      </tr>
    </thead>
  );
}

function ClassItemTableRow(classItemRowStates) {
  const { classItem, filteredClasses } = classItemRowStates;
  const [oldClassItem, setOldClassItem] = useState(classItem);
  const conflicts = getClassItemConflicts(filteredClasses, classItem);
  const classTimeTableProps = { ...classItemRowStates, conflicts };

  const CRUDClassItemProps = {
    classItem,
    oldClassItem,
    setOldClassItem,
    deleteClassItemDB: () => deleteClass(classItemRowStates),
    updateClassItemDB: () => updateClass(classItemRowStates),
  };

  const classItemRowKey = `ClassItemTableRow: ${getId(classItem)}`;

  return (
    <tr key={classItemRowKey}>
      <td>
        <div>
          <SmartDeleteClassItem {...CRUDClassItemProps} />
        </div>
        <div>
          <SmartUpdateClassItem {...CRUDClassItemProps} />
        </div>
      </td>
      {hasDenseClassSelects ? (
        <>
          <td>
            <div>
              <div
                className={defaultClassNames.select}
                {...conflicts.styled.subject.merged}
              >
                <SelectClassSubject {...classItemRowStates} />
              </div>
              <div
                className={defaultClassNames.select}
                {...conflicts.styled.professor.merged}
              >
                <SelectClassProfessor {...classItemRowStates} />
              </div>
            </div>
          </td>
          <td>
            <div>
              <div
                className={defaultClassNames.select}
                {...conflicts.styled.expectedDemand.merged}
              >
                <NumberInputMultiClassesExpectedDemand
                  {...classItemRowStates}
                />
              </div>
              <div className={defaultClassNames.select}>
                <TextInputClassDescription {...classItemRowStates} />
              </div>
            </div>
          </td>
        </>
      ) : (
        <>
          <td {...conflicts.styled.subject.merged}>
            <SelectClassSubject {...classItemRowStates} />
          </td>
          <td {...conflicts.styled.professor.merged}>
            <SelectClassProfessor {...classItemRowStates} />
          </td>
          <td {...conflicts.styled.expectedDemand.merged}>
            <NumberInputMultiClassesExpectedDemand {...classItemRowStates} />
          </td>
          <td>
            <TextInputClassDescription {...classItemRowStates} />
          </td>
        </>
      )}

      <td>
        <ClassTimeTable {...classTimeTableProps} />
      </td>
    </tr>
  );
}

function ClassesTable({ classStates, selectStates, currentSemester }) {
  const createStates = {
    currentSemester,
    classesStates: classStates,
    createClassDB: createClass,
  };

  const sortedMultiClasses = sortMultiClasses(classStates.filteredClasses);

  return (
    // <table className="showBasicDataTable">
    // <table className="Tabelinha">
    <table>
      <ClassTableHeader {...createStates} />
      <tbody>
        {sortedMultiClasses.map((iterClassItem) => {
          const classItemRowProps = {
            ...classStates,
            professors: selectStates.professorStates.professors,
            subjects: selectStates.subjectStates.subjects,
            rooms: selectStates.roomStates.rooms,
            classItem: iterClassItem,
            key: `ClassItemTableRow: ${getId(iterClassItem)}`,
          };
          return <ClassItemTableRow {...classItemRowProps} />;
        })}
      </tbody>
    </table>
  );
}

export default ClassesTable;
