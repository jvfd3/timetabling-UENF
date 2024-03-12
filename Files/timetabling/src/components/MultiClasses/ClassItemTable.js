import "./ClassItemTable.css";

import React, { useEffect, useState } from "react";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import configInfo from "../../config/configInfo";
import ClassTimeTable from "../ClassTimeTable/ClassTimeTable";
import { getId, replaceNewItemInListById } from "../../helpers/auxCRUD";
import { sortMultiClasses } from "../Sorts/sortingFunctions";
import { getClassItemConflicts } from "../../helpers/conflicts/centralConflicts";
import { SelectClassProfessor, SelectClassSubject } from "../mySelects";
import {
  NumberInputMultiClassesExpectedDemand,
  TextInputClassDescription,
} from "../MyTextFields";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartUpdateClassItem,
} from "../Buttons/Smart/Smart";

const frontText = text.component.classItemTable.tableTitles;
const defaultClassNames = myStyles.classNames.local.component.classItemTable;
const tableClassName = myStyles.classNames.default.componentTable;

function ClassTableHeader({ createClassItemStates }) {
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateClassItem {...createClassItemStates} />
        </th>
        {configInfo.hasDenseClassSelects ? (
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
  const { iterClassItem, filteredClasses } = classItemRowStates;
  const [rowClassItem, setRowClassItem] = useState({ ...iterClassItem });
  const conflicts = getClassItemConflicts(filteredClasses, iterClassItem);
  const classTimeTableProps = { ...classItemRowStates, conflicts };

  function updateClasses(setClasses, newClassItem) {
    setClasses((oldClasses) =>
      replaceNewItemInListById(newClassItem, oldClasses)
    );
  }

  useEffect(() => {
    updateClasses(classItemRowStates.setClasses, rowClassItem);
  }, [rowClassItem]);

  const CRUDClassItemProps = {
    rowClassItem,
    setRowClassItem,
    classItemRowStates,
  };

  const classItemRowKey = `ClassItemTableRow: ${getId(iterClassItem)}`;

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
      {configInfo.hasDenseClassSelects ? (
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

function ClassesTable(globalStates) {
  const filteredClasses = globalStates.classStates.filteredClasses;
  const sortedMultiClasses = sortMultiClasses(filteredClasses);

  return (
    <table className={tableClassName}>
      <ClassTableHeader {...globalStates} />
      <tbody>
        {sortedMultiClasses.map((iterClassItem) => {
          const classItemRowProps = {
            ...globalStates.classStates,
            classItem: iterClassItem,
            iterClassItem,
            key: `ClassItemTableRow: ${getId(iterClassItem)}`,
          };
          return <ClassItemTableRow {...classItemRowProps} />;
        })}
      </tbody>
    </table>
  );
}

export default ClassesTable;
