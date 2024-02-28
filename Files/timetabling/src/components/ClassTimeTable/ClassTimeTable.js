import React, { useEffect, useState } from "react";
import myStyles from "../../config/myStyles";
import { getId } from "../../helpers/auxCRUD";
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
import text from "../../config/frontText";

const defaultClassNames = myStyles.classNames.default;
const frontText = text.component.classTimesTable.tableTitles;

function ClassTimeRow(classTimeRowStates) {
  const { classTime, conflicts, filteredClasses, index } = classTimeRowStates;

  const classTimeConflicts = getClassTimeConflicts(
    filteredClasses,
    classTime,
    conflicts
  );

  const conflictStyles = classTimeConflicts.timeConflicts.styled;

  const CRUDClassTimeProps = {
    classTime,
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
        <th>{frontText.day}</th>
        <th>{frontText.duration}</th>
        <th>{frontText.hour}</th>
        <th>{frontText.room}</th>
      </tr>
    </thead>
  );
}

function ClassTimeTable(classesStates) {
  const { classItem, conflicts } = classesStates;
  const [classTimes, setClassTimes] = useState(classItem?.horarios ?? []);

  const createClassTimeProps = {
    classItem,
    createClassTimeDB: () => {
      // console.log("classesStates", classesStates);
      createClassTime(classesStates);
    },
  };

  // MAYBE THE ERROR IS HERE
  useEffect(() => {
    setClassTimes(classItem?.horarios ?? []);
  }, [classItem?.horarios]);

  const hasClassTimes = classTimes.length > 0;

  return !hasClassTimes ? (
    <SmartCreateClassTime {...createClassTimeProps} />
  ) : (
    <table className={defaultClassNames.componentTable}>
      <ClassTimeHeader {...createClassTimeProps} />
      <tbody>
        {classTimes.map((iterClassTime, index) => {
          const classTimeRowStates = {
            ...classesStates,
            classTime: iterClassTime,
            // shouldUpdate,
            key: `ClassTimeRow: ${JSON.stringify(iterClassTime)}`,
            conflicts,
            index,
          };
          return <ClassTimeRow {...classTimeRowStates} />;
        })}
      </tbody>
    </table>
  );
}

export default ClassTimeTable;
