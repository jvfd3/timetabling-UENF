import React, { useState } from "react";
import text from "../../config/frontText";
import myStyles from "../../config/myStyles";
import { getId } from "../../helpers/auxCRUD";
import { sortClassTimes } from "../Sorts/sortingFunctions";
import { getClassTimeConflicts } from "../../helpers/conflicts/centralConflicts";
import {
  SelectClassTimeDay,
  SelectClassTimeRoom,
  SelectClassTimeDuration,
  SelectClassTimeStartHour,
} from "../mySelects";
import {
  SmartCreateClassTime,
  SmartDeleteClassTime,
  SmartUpdateClassTime,
} from "../Buttons/Smart/Smart";
import {
  createClassTime,
  // readClassTime,
  updateClassTime,
  deleteClassTime,
} from "../../helpers/CRUDFunctions/classTimeCRUD";

const defaultClassNames = myStyles.classNames.default;
const frontText = text.component.classTimesTable.tableTitles;

function ClassTimeRow(classTimeRowStates) {
  const { classTime, conflicts, filteredClasses } = classTimeRowStates;
  const [oldClassTime, setOldClassTime] = useState(classTime);

  const classTimeConflicts = getClassTimeConflicts(
    filteredClasses,
    classTime,
    conflicts
  );

  const conflictStyles = classTimeConflicts.timeConflicts.styled;

  const CRUDClassTimeProps = {
    classTime,
    oldClassTime,
    filteredClasses,
    setOldClassTime,
    deleteClassTimeDB: () => deleteClassTime(classTimeRowStates),
    updateClassTimeDB: () => updateClassTime(classTimeRowStates),
  };

  const classTimeTableRowKey = `ClassTimeTableRow: ${getId(classTime)}`;

  return (
    <tr key={classTimeTableRowKey}>
      <td>
        <SmartDeleteClassTime {...CRUDClassTimeProps} />
        <SmartUpdateClassTime {...CRUDClassTimeProps} />
      </td>
      <td {...conflictStyles.room.merged}>
        <SelectClassTimeRoom {...classTimeRowStates} />
      </td>
      <td {...conflictStyles.day.merged}>
        <SelectClassTimeDay {...classTimeRowStates} />
      </td>
      <td {...conflictStyles.hour.merged}>
        <SelectClassTimeStartHour {...classTimeRowStates} />
      </td>
      <td {...conflictStyles.duration.merged}>
        <SelectClassTimeDuration {...classTimeRowStates} />
      </td>
    </tr>
  );
}

function ClassTimeHeader(createClassTimeProps) {
  const { classItem } = createClassTimeProps;
  const headerKey = `ClassTime Header: ${getId(classItem)}`;
  return (
    <thead>
      <tr key={headerKey}>
        <th>
          <SmartCreateClassTime {...createClassTimeProps} />
        </th>
        <th>{frontText.room}</th>
        <th>{frontText.day}</th>
        <th>{frontText.hour}</th>
        <th>{frontText.duration}</th>
      </tr>
    </thead>
  );
}

function ClassTimeTable(classStates) {
  const { classItem, conflicts } = classStates;

  const createClassTimeProps = {
    classItem,
    createClassTimeDB: () => createClassTime(classStates),
  };

  const hasClassTimes = classItem?.horarios?.length > 0;

  const sortedClassTimes = sortClassTimes(classItem?.horarios);

  return !hasClassTimes ? (
    <SmartCreateClassTime {...createClassTimeProps} />
  ) : (
    <table className={defaultClassNames.componentTable}>
      <ClassTimeHeader {...createClassTimeProps} />
      <tbody>
        {sortedClassTimes?.map((iterClassTime) => {
          const classTimeRowStates = {
            ...classStates,
            classTime: iterClassTime,
            // shouldUpdate,
            key: `ClassTimeRow: ${getId(iterClassTime)}`,
            conflicts,
          };
          return <ClassTimeRow {...classTimeRowStates} />;
        })}
      </tbody>
    </table>
  );
}

export default ClassTimeTable;
