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

function ClassTimeRow(classTimeRowStates) {
  const { classItem, classTime, index } = classTimeRowStates;

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

  return (
    <tr key={`ClassTimeRow: ${getId(classTime)}-${index}`}>
      <td>
        <SmartDeleteClassTime {...deleteClassTimeProps} />
        <SmartUpdateClassTime {...updateClassTimeProps} />
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

function ClassTimeTable(classesStates) {
  const { classItem } = classesStates;

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
                ...classesStates,
                classTime: iterClassTime,
                // shouldUpdate,
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
