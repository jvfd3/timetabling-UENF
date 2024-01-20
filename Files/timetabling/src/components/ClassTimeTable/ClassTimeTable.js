import "./ClassTimeTable.css";
import React, { useEffect, useRef, useState } from "react";
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
  const currentId = getId(classTime);
  const deleteClassTimeProps = {
    classTime,
    classItem,
    deleteClassTimeDB: () => deleteClassTime(classTimeRowStates),
  };

  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [message, setMessage] = useState("");
  const initialValue = useRef(classTime);
  let currentMessage = `Atualizar horário (id: ${getId(
    classTime
  )}, idTurma: ${getId(classItem)}):\n`;

  useEffect(() => {
    const baseClassTime = initialValue.current;

    const sameRoom = classTime?.sala?.id === baseClassTime?.sala?.id;
    const sameDay = classTime?.dia === baseClassTime?.dia;
    const sameStartHour = classTime?.horaInicio === baseClassTime?.horaInicio;
    const sameDuration = classTime?.duracao === baseClassTime?.duracao;

    currentMessage += sameRoom
      ? ``
      : `sala: ${baseClassTime?.sala?.id} -> ${classTime?.sala?.id ?? null}\n`;
    currentMessage += sameDay
      ? ``
      : `dia: ${baseClassTime?.dia} -> ${classTime?.dia}\n`;
    currentMessage += sameStartHour
      ? ``
      : `horaInicio: ${baseClassTime?.horaInicio} -> ${classTime?.horaInicio}\n`;
    currentMessage += sameDuration
      ? ``
      : `duracao: ${baseClassTime?.duracao} -> ${classTime?.duracao}\n`;

    const needsChange =
      !sameRoom || !sameDay || !sameStartHour || !sameDuration;

    setMessage(currentMessage);
    setNeedsUpdate(needsChange);

    console.log(`shouldUpdate ${classTime.id}?`, needsChange);
  }, [classTime]);

  const updateClassTimeProps = {
    classTime,
    classItem,
    updateClassTimeDB: () => {
      updateClassTime(classTimeRowStates);
      setNeedsUpdate(false);
      initialValue.current = classTime;
    },
    iconColor: needsUpdate ? "yellow" : "",
    message,
  };

  return (
    <tr key={`ClassTimeRow: ${currentId}-${index}`}>
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

function ClassTimeTable(classTimeTableProps) {
  const { classesStates } = classTimeTableProps;
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
