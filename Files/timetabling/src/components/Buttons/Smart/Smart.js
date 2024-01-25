import React, { useEffect, useRef, useState } from "react";
import {
  CreateClassTime,
  DeleteClassTime,
  CreateItem,
  DeleteItem,
  InputDisciplina,
  UpdateClassTime,
  UpdateItem,
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

function SmartUpdateClassItem({ classItem, updateClassItemDB }) {
  const baseMessage = `Atualizar turma (id: ${getId(classItem)})\n`;

  const oldClassItem = useRef(classItem);

  const [modifiedMessage, setModifiedMessage] = useState(baseMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  useEffect(() => {
    const modProps = getModificationsProps(oldClassItem.current, classItem);

    setModifiedMessage(baseMessage + modProps.updateText);
    setNeedsUpdateStatus(modProps.updateStatus);
    // console.log(classItem.id, modProps);
    // console.log("int: ", oldClassTime.current?.dia);
    // console.log("new: ", classTime?.dia);

    // console.log("// SmartUpdateClassTime \\");
  }, [classItem]);

  const iconColor = needsUpdateStatus
    ? options.config.colors.CRUD.update
    : options.config.colors.CRUD.default;

  function getModificationsProps(oldClassItem, classItem) {
    const oldSubject = getId(oldClassItem?.disciplina);
    const newSubject = getId(classItem?.disciplina);
    const oldProfessor = getId(oldClassItem?.professor);
    const newProfessor = getId(classItem?.professor);
    const oldExpectedDemand = oldClassItem?.demandaEstimada;
    const newExpectedDemand = classItem?.demandaEstimada;

    const sameSubject = oldSubject === newSubject;
    const sameProfessor = oldProfessor === newProfessor;
    const sameExpectedDemand = oldExpectedDemand === newExpectedDemand;

    const newSubjectText = `disciplina: ${oldSubject} -> ${newSubject}\n`;
    const newProfessorText = `professor: ${oldProfessor} -> ${newProfessor}\n`;
    const newExpectedDemandText = `demandaEstimada: ${oldExpectedDemand} -> ${newExpectedDemand}\n`;

    let modifications = "";
    modifications += sameSubject ? "" : newSubjectText;
    modifications += sameProfessor ? "" : newProfessorText;
    modifications += sameExpectedDemand ? "" : newExpectedDemandText;

    console.log(newSubjectText);

    // const hasChanges = !sameSubject || !sameProfessor || !sameExpectedDemand;
    const hasChanges = modifications.length > 0;

    const modificationsObject = {
      updateStatus: hasChanges,
      updateText: modifications,
    };

    return modificationsObject;
  }

  function smartUpdateClassItem() {
    setNeedsUpdateStatus(false);
    updateClassItemDB();
  }

  return (
    <UpdateItem
      updateFunc={smartUpdateClassItem}
      text={modifiedMessage}
      color={iconColor}
    />
  );
}

function SmartDeleteClassItem(deleteProps) {
  const { classes, setClasses, classItem, setClassItem, deleteClassDB } =
    deleteProps;
  const classStates = {
    classes,
    setClasses,
    classItem,
    setClassItem,
  };

  function deleteClassItemFromDB() {
    deleteClassDB(classStates);
  }

  const titleText = `Remover turma (id: ${getId(classItem)})`;
  return <DeleteItem deleteFunc={deleteClassItemFromDB} text={titleText} />;
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
  // console.log(needsUpdateStatus);
  const iconColor = needsUpdateStatus
    ? options.config.colors.CRUD.update
    : options.config.colors.CRUD.default;

  function getModificationsProps(oldClassTime, newClassTime) {
    const oldRoom = getId(oldClassTime?.sala);
    const newRoom = getId(newClassTime?.sala);
    const oldDay = oldClassTime?.dia;
    const newDay = newClassTime?.dia;
    const oldStartHour = oldClassTime?.horaInicio;
    const newStartHour = newClassTime?.horaInicio;
    const oldDuration = oldClassTime?.duracao;
    const newDuration = newClassTime?.duracao;

    const sameRoom = oldRoom === newRoom;
    const sameDay = oldDay === newDay;
    const sameStartHour = oldStartHour === newStartHour;
    const sameDuration = oldDuration === newDuration;

    let modifications = "";
    modifications += sameRoom ? "" : `sala: ${oldRoom} -> ${newRoom}\n`;
    modifications += sameDay ? "" : `dia: ${oldDay} -> ${newDay}\n`;
    modifications += sameStartHour
      ? ""
      : `horaInicio: ${oldStartHour} -> ${newStartHour}\n`;
    modifications += sameDuration
      ? ""
      : `duracao: ${oldDuration} -> ${newDuration}\n`;

    const hasChanges = !sameRoom || !sameDay || !sameStartHour || !sameDuration;

    const modificationsObject = {
      updateStatus: hasChanges,
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
  SmartUpdateClassItem,
  SmartDeleteClassItem,
  SmartCreateClassTime,
  SmartUpdateClassTime,
  SmartDeleteClassTime,
  AddTurmaWithDisciplinaButton,
};
