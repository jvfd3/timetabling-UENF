import "./ClassTimeTable.css";
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
    ...classTimeRowStates,
    oldClassTime,
    setOldClassTime,
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

function ClassTimeHeader(classStates) {
  const headerKey = `ClassTime Header: ${getId(classStates.classItem)}`;
  return (
    <thead>
      <tr key={headerKey}>
        <th>
          <SmartCreateClassTime {...classStates} />
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

  const classTimes = classItem?.classTimes ?? classItem?.horarios;
  const hasClassTimes = classTimes?.length > 0;

  const sortedClassTimes = sortClassTimes(classTimes);

  return !hasClassTimes ? (
    <div className={myStyles.classNames.local.component.classTimeTable.padding}>
      <SmartCreateClassTime {...classStates} />
    </div>
  ) : (
    <table className={defaultClassNames.componentTable}>
      <ClassTimeHeader {...classStates} />
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
