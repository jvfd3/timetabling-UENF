import React, { useEffect, useState } from "react";
import emptyObjects from "../../../config/emptyObjects";
import defaultColors from "../../../config/defaultColors";
import createPreFilledClass from "./createPreFilledClass";
import { getId } from "../../../helpers/auxCRUD";
import {
  CreateClassTime,
  DeleteClassTime,
  CreateItem,
  DeleteItem,
  InputSubject,
  UpdateClassTime,
  UpdateItem,
} from "../Dumb/Dumb";
import {
  getValueFromObject,
  getDefaultYearSemesterValues,
} from "../../../helpers/auxFunctions";
import {
  getAliasNameText,
  getClassItemText,
  getClassTimeText,
  getRoomText,
} from "../../../helpers/visualizationText/textLabels";

function SmartInputSubject(inputSubjectProps) {
  const { inputConfig, subjects } = inputSubjectProps;

  function getMessage(subjects) {
    const subjectsSize = subjects.length;
    const offerAllSubjectsMessage = `Adicionar todas as ${subjectsSize} turmas pendentes `;
    const extraText = inputConfig?.text ?? "";

    let oneSubjectClassMessage = `Adicionar turma da disciplina`;
    let finalMessage = offerAllSubjectsMessage + extraText;

    if (subjects.length === 1) {
      oneSubjectClassMessage += ` ${subjects?.[0]?.codigo}`;
      finalMessage = oneSubjectClassMessage;
    }

    return finalMessage;
  }

  const inputProps = {
    text: getMessage(subjects),
    size: inputConfig?.size ?? "2em",
    createFunc: () => {
      createPreFilledClass(inputSubjectProps);
    },
  };

  return <InputSubject {...inputProps} />;
}

function SmartCreateClassItem(createStates) {
  /* I could clean this Button */
  const { classesStates, year, semester, createClassDB } = createStates;

  const yearSemester = getDefaultYearSemesterValues();

  const yearValue = getValueFromObject(year) ?? yearSemester.year;
  const semesterValue = getValueFromObject(semester) ?? yearSemester.semester;

  function createClassItemInDB() {
    const newClass = emptyObjects.classItem;
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

function SmartUpdateClassItem(updateClassItemProps) {
  const { classItem, updateClassItemDB, oldClassItem, setOldClassItem } =
    updateClassItemProps;

  const classItemText = getClassItemText(classItem) + "\n";

  let dontUpdateMessage = `Não foram identificadas alterações na turma `;
  dontUpdateMessage += classItemText;

  const baseMessage = `Atualizar turma ` + classItemText;

  const [modifiedMessage, setModifiedMessage] = useState(dontUpdateMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  const iconColor = needsUpdateStatus
    ? defaultColors.CRUD.update
    : defaultColors.CRUD.default;

  useEffect(() => {
    const modProps = getModificationsProps(oldClassItem, classItem);
    const wasUpdated = modProps.updateStatus;
    const newMessage = wasUpdated
      ? baseMessage + modProps.updateText
      : dontUpdateMessage;

    setNeedsUpdateStatus(wasUpdated);
    setModifiedMessage(newMessage);
  }, [classItem]);

  function getModificationsProps(oldClassItem, classItem) {
    const oldSubject = oldClassItem?.subject ?? oldClassItem?.disciplina;
    const newSubject = classItem?.subject ?? classItem?.disciplina;
    const oldProfessor = oldClassItem?.professor;
    const newProfessor = classItem?.professor;

    const oldSubjectId = getId(oldSubject);
    const newSubjectId = getId(newSubject);

    const oldProfessorId = getId(oldProfessor);
    const newProfessorId = getId(newProfessor);

    const oldExpectedDemand =
      oldClassItem?.expectedDemand ?? oldClassItem?.demandaEstimada;
    const newExpectedDemand =
      classItem?.expectedDemand ?? classItem?.demandaEstimada;

    const oldDescription = oldClassItem?.description;
    const newDescription = classItem?.description;

    const sameSubject = oldSubjectId === newSubjectId;
    const sameProfessor = oldProfessorId === newProfessorId;
    const sameExpectedDemand = oldExpectedDemand === newExpectedDemand;
    const sameDescription = oldDescription === newDescription;

    const oldSubjectAliasText = getAliasNameText(oldSubject);
    const newSubjectAliasText = getAliasNameText(newSubject);
    const oldProfessorAliasText = getAliasNameText(oldProfessor);
    const newProfessorAliasText = getAliasNameText(newProfessor);

    const newSubjectText = `\t- Disciplina: ${oldSubjectAliasText} -> ${newSubjectAliasText}\n`;
    const newProfessorText = `\t- Professor: ${oldProfessorAliasText} -> ${newProfessorAliasText}\n`;
    const newExpectedDemandText = `\t- Demanda estimada: ${oldExpectedDemand} -> ${newExpectedDemand}\n`;
    const newDescriptionText = `\t- Descrição: ${oldDescription} -> ${newDescription}\n`;

    let modifications = "";
    modifications += sameSubject ? "" : newSubjectText;
    modifications += sameProfessor ? "" : newProfessorText;
    modifications += sameExpectedDemand ? "" : newExpectedDemandText;
    modifications += sameDescription ? "" : newDescriptionText;

    /*
    const properties = [
      { name: 'disciplina', old: oldSubject, new: newSubject, same: sameSubject },
      { name: 'professor', old: oldProfessor, new: newProfessor, same: sameProfessor },
      { name: 'demandaEstimada', old: oldExpectedDemand, new: newExpectedDemand, same: sameExpectedDemand },
    ];

    let modifications = "";

    for (const prop of properties) {
      if (!prop.same) {
        modifications += `${prop.name}: ${prop.old} -> ${prop.new}\n`;
      }
    }

    const hasChanges = modifications.length > 0;

    const modificationsObject = {
      updateText: modifications,
      updateStatus: hasChanges,
    };
    */
    // console.log(newSubjectText);

    // const hasChanges = !sameSubject || !sameProfessor || !sameExpectedDemand;
    const hasChanges = modifications.length > 0;

    const modificationsObject = {
      updateText: modifications,
      updateStatus: hasChanges,
    };

    return modificationsObject;
  }

  function smartUpdateClassItem() {
    setNeedsUpdateStatus(false);
    setModifiedMessage(dontUpdateMessage);
    setOldClassItem(classItem); // Maybe unnecessary
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

function SmartDeleteClassItem({ classItem, deleteClassItemDB }) {
  const titleText = "Remover turma " + getClassItemText(classItem);
  return <DeleteItem deleteFunc={deleteClassItemDB} text={titleText} />;
}

function SmartCreateClassTime({ classItem, createClassTimeDB }) {
  const titleText = `Adicionar horário à turma ${getClassItemText(classItem)}`;

  return <CreateClassTime createFunc={createClassTimeDB} text={titleText} />;
}

function SmartUpdateClassTime(updateClassTimeProps) {
  const { classTime, updateClassTimeDB, oldClassTime, setOldClassTime } =
    updateClassTimeProps;

  const classTimeText = getClassTimeText(classTime);
  let dontUpdateMessage = `Não foram identificadas alterações no horário `;
  dontUpdateMessage += classTimeText;

  let baseMessage = `Atualizar horário\n`;

  const [modifiedMessage, setModifiedMessage] = useState(dontUpdateMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  const iconColor = needsUpdateStatus
    ? defaultColors.CRUD.update
    : defaultColors.CRUD.default;

  useEffect(() => {
    const modProps = getModificationsProps(oldClassTime, classTime);
    const wasUpdated = modProps.updateStatus;
    const newMessage = wasUpdated
      ? baseMessage + modProps.updateText
      : dontUpdateMessage;

    setNeedsUpdateStatus(wasUpdated);
    setModifiedMessage(newMessage);
  }, [classTime]);

  function getModificationsProps(oldClassTime, newClassTime) {
    // console.log(`${oldClassTime.dia} -> ${newClassTime.dia}`);
    const oldRoom = oldClassTime?.room ?? oldClassTime?.sala;
    const newRoom = newClassTime?.room ?? newClassTime?.sala;
    const oldRoomId = getId(oldRoom);
    const newRoomId = getId(newRoom);
    const oldDay = oldClassTime?.day ?? oldClassTime?.dia;
    const newDay = newClassTime?.day ?? newClassTime?.dia;
    const oldStartHour = oldClassTime?.startHour ?? oldClassTime?.horaInicio;
    const newStartHour = newClassTime?.startHour ?? newClassTime?.horaInicio;
    const oldDuration = oldClassTime?.duration ?? oldClassTime?.duracao;
    const newDuration = newClassTime?.duration ?? newClassTime?.duracao;

    const sameRoom = oldRoomId === newRoomId;
    const sameDay = oldDay === newDay;
    const sameStartHour = oldStartHour === newStartHour;
    const sameDuration = oldDuration === newDuration;

    const AAA = oldRoom === null ? "null" : getRoomText(oldRoom);
    const BBB = newRoom === null ? "null" : getRoomText(newRoom);

    const newRoomText = `\t- Sala: ${AAA} -> ${BBB}\n`;
    const newDayText = `\t- Dia: ${oldDay} -> ${newDay}\n`;
    const newStartHourText = `\t- Hora Início: ${oldStartHour} -> ${newStartHour}\n`;
    const newDurationText = `\t- Duracao: ${oldDuration} -> ${newDuration}\n`;

    let modifications = "";
    modifications += sameRoom ? "" : newRoomText;
    modifications += sameDay ? "" : newDayText;
    modifications += sameStartHour ? "" : newStartHourText;
    modifications += sameDuration ? "" : newDurationText;

    // const hasChanges = !sameRoom || !sameDay || !sameStartHour || !sameDuration;
    const hasChanges = modifications.length > 0;

    const modificationsObject = {
      updateText: modifications,
      updateStatus: hasChanges,
    };

    return modificationsObject;
  }

  function smartUpdateClassTime() {
    setNeedsUpdateStatus(false);
    setOldClassTime(classTime);
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

function SmartDeleteClassTime({
  classTime,
  filteredClasses,
  deleteClassTimeDB,
}) {
  const classTimeText = getClassTimeText(classTime);
  const idClass = classTime?.idTurma;

  // get classItem from filteredClasses
  const classItem = filteredClasses.find((c) => getId(c) === idClass);
  const classItemText = getClassItemText(classItem);

  let titleText = `Remover horário ${classTimeText}:\n`;
  titleText += `\t- turma: ${classItemText}`;

  return <DeleteClassTime deleteFunc={deleteClassTimeDB} text={titleText} />;
}

export {
  SmartCreateClassItem,
  SmartUpdateClassItem,
  SmartDeleteClassItem,
  SmartCreateClassTime,
  SmartUpdateClassTime,
  SmartDeleteClassTime,
  SmartInputSubject,
};
