import React, { useEffect, useRef, useState } from "react";
import emptyObjects from "../../../config/emptyObjects";
import defaultColors from "../../../config/defaultColors";
import { getId } from "../../../helpers/auxCRUD";
import { createClass } from "../../../helpers/CRUDFunctions/classCRUD";
import { filterSubject } from "../../../helpers/filteringFunc";
import { createClassTime } from "../../../helpers/CRUDFunctions/classTimeCRUD";
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
  getNewClassItem,
  getNewClassTimes,
  getUsualInfo,
} from "../../MultiClasses/NotOfferedSubjects/processInitialValues";
import configInfo from "../../../config/configInfo";

function SmartInputSubject(inputSubjectProps) {
  const { inputConfig, subjects } = inputSubjectProps;

  function createPreFilledClass(classCreationProps) {
    const { currentSemester, classTimeStates, classStates, subjects } =
      classCreationProps;

    let localClasses = [...classStates.classes];
    let creationStates = [];

    subjects.forEach((iterSubject) => {
      const sameSubjectClasses = filterSubject(localClasses, iterSubject);
      const sameSubjectClassTimes = filterSubject(
        classTimeStates.classTimes,
        iterSubject
      );

      const usualInfo = getUsualInfo(sameSubjectClasses, sameSubjectClassTimes);

      const newClassTimes = getNewClassTimes(usualInfo);
      const newClassItem = getNewClassItem(
        currentSemester,
        iterSubject,
        usualInfo
      );
      newClassItem.horarios = newClassTimes;

      const newLocalStates = {
        ...classStates,
        classes: localClasses,
        classItem: newClassItem,
        newClassTimes: newClassItem?.horarios,
      };

      creationStates.push(newLocalStates);
      localClasses.push(newClassItem);
    });

    function asyncCreateClassDB(creationState) {
      createClass(creationState);
      // console.log("Creating Class:", creationState.classItem);
    }

    creationStates.forEach((interClassStates, index) => {
      setTimeout(
        () => asyncCreateClassDB(interClassStates),
        (index + 1) * configInfo.AWS.defaultRequestDelay
      );
    });
  }

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
  const date = `${classItem?.ano}.${classItem?.semestre}`;
  const classItemId = ` ${date} (id: ${getId(classItem)})\n`;

  const dontUpdateMessage =
    `Não foram identificadas alterações na turma` + classItemId;

  const baseMessage = `Atualizar turma` + classItemId;

  const [modifiedMessage, setModifiedMessage] = useState(dontUpdateMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  const iconColor = needsUpdateStatus
    ? defaultColors.CRUD.update
    : defaultColors.CRUD.default;

  useEffect(() => {
    const modProps = getModificationsProps(oldClassItem, classItem);
    // const modProps = getModificationsProps(oldClassItem, classItem);
    const wasUpdated = modProps.updateStatus;
    const newMessage = wasUpdated
      ? baseMessage + modProps.updateText
      : dontUpdateMessage;
    setNeedsUpdateStatus(wasUpdated);
    setModifiedMessage(newMessage);
  }, [classItem]);

  function getModificationsProps(oldClassItem, classItem) {
    const oldSubject = getId(oldClassItem?.disciplina);
    const newSubject = getId(classItem?.disciplina);
    const oldProfessor = getId(oldClassItem?.professor);
    const newProfessor = getId(classItem?.professor);
    const oldExpectedDemand = oldClassItem?.demandaEstimada;
    const newExpectedDemand = classItem?.demandaEstimada;
    const oldDescription = oldClassItem?.description;
    const newDescription = classItem?.description;

    const sameSubject = oldSubject === newSubject;
    const sameProfessor = oldProfessor === newProfessor;
    const sameExpectedDemand = oldExpectedDemand === newExpectedDemand;
    const sameDescription = oldDescription === newDescription;

    const newSubjectText = `disciplina: ${oldSubject} -> ${newSubject}\n`;
    const newProfessorText = `professor: ${oldProfessor} -> ${newProfessor}\n`;
    const newExpectedDemandText = `demandaEstimada: ${oldExpectedDemand} -> ${newExpectedDemand}\n`;
    const newDescriptionText = `description: ${oldDescription} -> ${newDescription}\n`;

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
  const date = `${classItem?.ano}.${classItem?.semestre}`;
  const titleText = `Remover turma ${date} (id: ${getId(classItem)})`;

  return <DeleteItem deleteFunc={deleteClassItemDB} text={titleText} />;
}

function SmartCreateClassTime({ classItem, createClassTimeDB }) {
  const titleText = `Adicionar horário à turma id: ${getId(classItem)}`;

  return <CreateClassTime createFunc={createClassTimeDB} text={titleText} />;
}

function SmartUpdateClassTime({ classTime, updateClassTimeDB }) {
  const oldClassTime = useRef(classTime);
  const classTimeId = ` (id: ${getId(classTime)})\n`;

  let dontUpdateMessage = `Não foram identificadas alterações no horário `;
  dontUpdateMessage += classTimeId;

  let baseMessage = `Atualizar horário `;
  baseMessage += classTimeId + `  -- idTurma: ${classTime?.idTurma})\n`;

  const [modifiedMessage, setModifiedMessage] = useState(dontUpdateMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  const iconColor = needsUpdateStatus
    ? defaultColors.CRUD.update
    : defaultColors.CRUD.default;

  useEffect(() => {
    const modProps = getModificationsProps(oldClassTime.current, classTime);

    const wasUpdated = modProps.updateStatus;
    const newMessage = wasUpdated
      ? baseMessage + modProps.updateText
      : dontUpdateMessage;

    setNeedsUpdateStatus(wasUpdated);
    setModifiedMessage(newMessage);
  }, [classTime]);

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

    const newRoomText = `sala: ${oldRoom} -> ${newRoom}\n`;
    const newDayText = `dia: ${oldDay} -> ${newDay}\n`;
    const newStartHourText = `horaInicio: ${oldStartHour} -> ${newStartHour}\n`;
    const newDurationText = `duracao: ${oldDuration} -> ${newDuration}\n`;

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

function SmartDeleteClassTime({ classTime, deleteClassTimeDB }) {
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
  SmartInputSubject,
};
