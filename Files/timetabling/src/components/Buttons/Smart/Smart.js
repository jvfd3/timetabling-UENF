import React, { useEffect, useRef, useState } from "react";
import {
  CreateClassTime,
  DeleteClassTime,
  CreateItem,
  DeleteItem,
  InputDisciplina,
  UpdateClassTime,
} from "../Dumb/Dumb";
import { getId } from "../../../helpers/auxCRUD";
import options from "../../../DB/local/options";
import {
  getDefaultYearSemesterValues,
  getValueFromObject,
} from "../../../helpers/auxFunctions";

function AddTurmaWithDisciplinaButton({ turmas, setTurmas, disciplina }) {
  function addTurmaWithDisciplina() {
    const newTurma = {
      id: turmas.length + 1,
      disciplina: disciplina,
    };
    setTurmas([...turmas, newTurma]);
  }
  return (
    <InputDisciplina
      insertDiscFunc={addTurmaWithDisciplina}
      text={"Adicionar turma dessa disciplina"}
    />
  );
}

function SmartCreateClassItem(createStates) {
  const { classesStates, year, semester, createClassDB } = createStates;

  const yearSemester = getDefaultYearSemesterValues();

  const yearValue = getValueFromObject(year) ?? yearSemester.year;
  const semesterValue = getValueFromObject(semester) ?? yearSemester.semester;

  function createClassItemInDB() {
    const newClass = options.emptyObjects.classItem;
    newClass.ano = yearValue;
    newClass.semestre = semesterValue;

    const createClassStates = {
      ...classesStates,
      classItem: newClass,
    };
    createClassDB(createClassStates);
  }

  const titleText = `Adicionar turma ${yearValue}.${semesterValue}`;
  return <CreateItem createFunc={createClassItemInDB} text={titleText} />;
}

function SmartDeleteClassItem({ classItem, deleteClassDB }) {
  const titleText = `Remover turma (id: ${getId(classItem)})`;
  return <DeleteItem deleteFunc={deleteClassDB} text={titleText} />;
}

function SmartCreateClassTime({ classItem, createClassTimeDB }) {
  const titleText = `Adicionar horário à turma id: ${getId(classItem)}`;

  return <CreateClassTime createFunc={createClassTimeDB} text={titleText} />;
}

function SmartUpdateClassTime(updateClassTimeProps) {
  const { classTime, updateClassTimeDB } = updateClassTimeProps;

  let baseMessage = `Atualizar horário `;
  baseMessage += `(id: ${getId(classTime)}, `;
  baseMessage += `idTurma: ${classTime?.idTurma})\n`;

  const oldClassTime = useRef(classTime);

  const [modifiedMessage, setModifiedMessage] = useState(baseMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  useEffect(() => {
    const modProps = getModificationsProps(oldClassTime.current, classTime);

    setModifiedMessage(baseMessage + modProps.updateText);
    setNeedsUpdateStatus(modProps.updateStatus);

    // console.log(classTime.id, modProps);
    // console.log("int: ", oldClassTime.current?.dia);
    // console.log("new: ", classTime?.dia);

    // console.log("// SmartUpdateClassTime \\");
  }, [classTime]);

  const iconColor = needsUpdateStatus ? "yellow" : "";

  function getModificationsProps(oldClassTime, newClassTime) {
    let modifications = "";
    const sameRoom = newClassTime?.sala?.id === oldClassTime?.sala?.id;
    const sameDay = newClassTime?.dia === oldClassTime?.dia;
    const sameStartHour = newClassTime?.horaInicio === oldClassTime?.horaInicio;
    const sameDuration = newClassTime?.duracao === oldClassTime?.duracao;

    modifications += sameRoom
      ? ""
      : `sala: ${oldClassTime?.sala?.id} -> ${
          newClassTime?.sala?.id ?? null
        }\n`;
    modifications += sameDay
      ? ""
      : `dia: ${oldClassTime?.dia} -> ${newClassTime?.dia}\n`;
    modifications += sameStartHour
      ? ""
      : `horaInicio: ${oldClassTime?.horaInicio} -> ${newClassTime?.horaInicio}\n`;
    modifications += sameDuration
      ? ""
      : `duracao: ${oldClassTime?.duracao} -> ${newClassTime?.duracao}\n`;

    const modificationsObject = {
      updateStatus: !sameRoom || !sameDay || !sameStartHour || !sameDuration,
      updateText: modifications,
    };

    return modificationsObject;
  }

  function smartUpdateClassTime() {
    setNeedsUpdateStatus(false);
    oldClassTime.current = classTime;
    updateClassTimeDB();
  }

  return (
    <UpdateClassTime
      updateFunc={smartUpdateClassTime}
      text={modifiedMessage}
      color={iconColor}
    />
  );
}

function SmartDeleteClassTime(deleteClassTimeProps) {
  const { classTime, deleteClassTimeDB } = deleteClassTimeProps;
  let titleText = `Remover horário (id: ${getId(classTime)}):\n`;
  titleText += `  - idTurma ${classTime?.idTurma}`;

  return <DeleteClassTime deleteFunc={deleteClassTimeDB} text={titleText} />;
}

export {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartCreateClassTime,
  SmartUpdateClassTime,
  SmartDeleteClassTime,
  AddTurmaWithDisciplinaButton,
};
