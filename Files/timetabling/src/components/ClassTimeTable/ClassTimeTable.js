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
} from "../Buttons/Smart/Smart";
import { getId } from "../../helpers/auxCRUD";
import {
  createClassTime,
  // readClassTime,
  updateClassTime,
  deleteClassTime,
} from "../../helpers/CRUDFunctions/classTimeCRUD";

function ClassTimeRow(classTimeRowStates) {
  /*
  const classTimeRowStates = {
    ...createClassTimeProps,
    classTime: iterClassTime,
    index,
  };
  */
  const { index, currentId } = classTimeRowStates;

  return (
    <tr key={`ClassTimeRow: ${currentId}-${index}`}>
      <td>
        <SmartDeleteClassTime {...classTimeRowStates} />
      </td>
      <td>
        <SelectClassTimeRoom {...classTimeRowStates} />
      </td>
      <td>
        <SelectClassTimeDay {...classTimeRowStates} />
      </td>
      <td>
        <SelectClassTimeStartHour {...classTimeRowStates} />
      </td>
      <td>
        <SelectClassTimeDuration {...classTimeRowStates} />
      </td>
    </tr>
  );
}

function ClassTimeTable(classTimeTableProps) {
  const { classesStates, indexes } = classTimeTableProps;
  const { classItem, setClassItem, classes, setClasses } = classesStates;

  // const classTimes = classItem?.horarios ?? [];
  const [classTimes, setClassTimes] = useState(classItem?.horarios ?? []);

  const createClassTimeProps = {
    // ...classesStates,
    // ...indexes,
    // ...classTimeStates,
    createClassTimeDB: () => createClassTime(classesStates),
  };

  console.log("ClassTimeTable", classTimes);

  useEffect(() => {
    setClassTimes(classItem?.horarios ?? []);
  }, [classItem.horarios]);

  // useEffect(() => {
  //   const newClassItem = { ...classItem, horarios: classTimes };
  //   setClassItem(newClassItem);
  //   setClasses([...classes, newClassItem]);
  // }, [classTimes]);

  return (
    <div className="showBasicDataCard">
      <h3>{classTimes.length > 0 ? "Horários" : "Adicione um horário"}</h3>
      {classTimes.length == 0 ? (
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
              const currentId = getId(iterClassTime);
              const classTimeRowStates = {
                ...createClassTimeProps,
                classTime: iterClassTime,
                index,
              };
              return <ClassTimeRow {...classTimeRowStates} key={currentId} />;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClassTimeTable;
