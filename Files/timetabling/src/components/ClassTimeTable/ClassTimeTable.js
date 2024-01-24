import "./ClassTimeTable.css";
import React, { useEffect, useState } from "react";
import {
  SelectClassTimeDay,
  SelectClassTimeDuration,
  SelectClassTimeRoom,
  SelectClassTimeStartHour,
} from "../mySelects";
import {
  SmartCreateClassTime,
  SmartDeleteClassTime,
  SmartUpdateClassTime,
} from "../Buttons/Smart/Smart";
import { getId } from "../../helpers/auxCRUD";
import {
  createClassTime,
  // readClassTime,
  updateClassTime,
  deleteClassTime,
} from "../../helpers/CRUDFunctions/classTimeCRUD";
import { classTimeConflicts } from "../../helpers/conflicts/visualConflicts";

function ClassTimeRow(classTimeRowStates) {
  const { classItem, classTime, index, conflicts } = classTimeRowStates;

  const classTimeVisualConflicts = classTimeConflicts(conflicts, classTime);

  const deleteClassTimeProps = {
    classTime,
    classItem,
    deleteClassTimeDB: () => deleteClassTime(classTimeRowStates),
  };

  const updateClassTimeProps = {
    classTime,
    classItem,
    updateClassTimeDB: () => updateClassTime(classTimeRowStates),
  };

  const classTimeTableRowKey = `ClassTimeTableRow: ${getId(
    classTime
  )}-${index}`;

  return (
    <tr key={classTimeTableRowKey}>
      <td>
        <SmartDeleteClassTime {...deleteClassTimeProps} />
        <SmartUpdateClassTime {...updateClassTimeProps} />
      </td>
      <td {...classTimeVisualConflicts.classRoom}>
        <SelectClassTimeRoom {...classTimeRowStates} />
      </td>
      <td {...classTimeVisualConflicts.day}>
        <SelectClassTimeDay {...classTimeRowStates} />
      </td>
      <td {...classTimeVisualConflicts.hour}>
        <SelectClassTimeStartHour {...classTimeRowStates} />
      </td>
      <td {...classTimeVisualConflicts.duration}>
        <SelectClassTimeDuration {...classTimeRowStates} />
      </td>
    </tr>
  );
}

function ClassTimeTable(classesStates) {
  const { classItem, conflicts } = classesStates;

  // const classTimes = classItem?.horarios ?? [];
  const [classTimes, setClassTimes] = useState(classItem?.horarios ?? []);

  const createClassTimeProps = {
    classItem,
    createClassTimeDB: () => createClassTime(classesStates),
  };

  // const shouldUpdate = useRef(false);

  useEffect(() => {
    setClassTimes(classItem?.horarios ?? []);
  }, [classItem.horarios]);

  return classTimes.length == 0 ? (
    <SmartCreateClassTime {...createClassTimeProps} />
  ) : (
    <table className="showBasicDataTable">
      <thead>
        <tr key={`ClassTime Header: ${getId(classItem)}`}>
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
            index,
            conflicts,
          };
          const currentId = getId(iterClassTime);
          const classTimeRowKey = `ClassTimeRow: ${currentId}-${index}`;
          return <ClassTimeRow {...classTimeRowStates} key={classTimeRowKey} />;
        })}
      </tbody>
    </table>
  );
}

export default ClassTimeTable;
