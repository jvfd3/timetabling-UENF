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

const defaultClassNames = myStyles.classNames.default;

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

  const wholeClassTime = JSON.stringify(classTime);
  const classTimeTableRowKey = `ClassTimeTableRow: ${wholeClassTime}-${index}`;

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

  useEffect(() => {
    setClassTimes(classItem?.horarios ?? []);
  }, [classItem?.horarios]);

  const headerKey = `ClassTime Header: ${getId(classItem)}`;

  return classTimes.length == 0 ? (
    <SmartCreateClassTime {...createClassTimeProps} />
  ) : (
    <table className={defaultClassNames.componentTable}>
      <thead>
        <tr key={headerKey}>
          <th>
            <SmartCreateClassTime {...createClassTimeProps} />
          </th>
          <th>Sala</th>
          <th>Dia</th>
          <th>Hora de início</th>
          <th>Duração</th>
        </tr>
      </thead>
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
