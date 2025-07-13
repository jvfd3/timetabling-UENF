import React, { useEffect, useState } from "react";
import text from "../../../config/frontText";
import defaultColors from "../../../config/defaultColors";
import createPreFilledClass from "./createPreFilledClass";
import { getId, getItemFromListById } from "../../../helpers/auxCRUD";
import {
  createClass,
  deleteClass,
  updateClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
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
  getAliasNameText,
  getClassItemText,
  getClassTimeText,
  getCreateClassItemTitle,
  getRoomText,
  getSubjectInputMessage,
} from "../../../helpers/visualizationText/textLabels";
import {
  createClassTime,
  deleteClassTime,
  updateClassTime,
} from "../../../helpers/CRUDFunctions/classTimeCRUD";

const defaultText = text.component.classTimesTable.buttons;

function SmartInputSubject(inputSubjectProps) {
  const { inputConfig, subjects } = inputSubjectProps;

  const inputProps = {
    text: getSubjectInputMessage(inputConfig, subjects),
    size: inputConfig?.size ?? "2em",
    createFunc: () => createPreFilledClass(inputSubjectProps),
  };

  return <InputSubject {...inputProps} />;
}

function SmartCreateClassItem(createClassItemStates) {
  const createItemProps = {
    createFunc: () => createClass(createClassItemStates),
    text: getCreateClassItemTitle(createClassItemStates.classItemFilter),
  };

  return <CreateItem {...createItemProps} />;
}

function SmartUpdateClassItem(updateClassItemProps) {
  const { classItemRowStates, rowClassItem, setRowClassItem } =
    updateClassItemProps;
  const { iterClassItem } = classItemRowStates;

  const classItemText = getClassItemText(iterClassItem) + "\n";

  let dontUpdateMessage = `Não foram identificadas alterações na turma `;
  dontUpdateMessage += classItemText;

  const baseMessage = `Atualizar turma ` + classItemText;

  const [modifiedMessage, setModifiedMessage] = useState(dontUpdateMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

  useEffect(() => {
    const modProps = getModificationsProps(rowClassItem, iterClassItem);

    const wasUpdated = modProps.hasChanges;
    const newMessage = wasUpdated
      ? baseMessage + modProps.updateText
      : dontUpdateMessage;

    setNeedsUpdateStatus(wasUpdated);
    setModifiedMessage(newMessage);
  }, [iterClassItem]);

  function getModificationsProps(classItem, rowClassItem) {
    function getDiffText(key, oldText, rowText) {
      let diffText = "";

      const notNull = (text) => (text == "" || text == null ? "null" : text);
      diffText += `\t- ${key}: ${notNull(oldText)} -> ${notNull(rowText)}\n`;
      return diffText;
    }

    const modObject = { updateText: "", hasChanges: false };

    const keysToCheck = {
      subject: "Disciplina",
      disciplina: "Disciplina",
      professor: "Professor",
      expectedDemand: "Demanda estimada",
      demandaEstimada: "Demanda estimada",
      description: "Descrição",
      descricao: "Descrição",
    };

    for (let key of Object.keys(keysToCheck)) {
      if (classItem.hasOwnProperty(key)) {
        const oldItem = classItem[key];
        const rowItem = rowClassItem[key];

        const checkObject = (value) => typeof value === "object";

        const oldText = checkObject(oldItem)
          ? getAliasNameText(oldItem)
          : oldItem;
        const rowText = checkObject(rowItem)
          ? getAliasNameText(rowItem)
          : rowItem;

        if (oldText !== rowText) {
          modObject.hasChanges = true;
          modObject.updateText += getDiffText(
            keysToCheck[key],
            oldText,
            rowText
          );
        }
      }
    }
    return modObject;
  }

  function smartUpdateClassItem() {
    setNeedsUpdateStatus(false);
    setModifiedMessage(dontUpdateMessage);
    setRowClassItem(iterClassItem); // Maybe unnecessary
    updateClass(classItemRowStates);
  }

  const updateProps = {
    updateFunc: smartUpdateClassItem,
    text: modifiedMessage,
    color: needsUpdateStatus
      ? defaultColors.CRUD.update
      : defaultColors.CRUD.default,
  };

  return <UpdateItem {...updateProps} />;
}

function SmartDeleteClassItem({ classItemRowStates }) {
  const deleteProps = {
    deleteFunc: () => deleteClass(classItemRowStates),
    text: "Remover turma " + getClassItemText(classItemRowStates.classItem),
  };

  return <DeleteItem {...deleteProps} />;
}

function SmartCreateClassTime(classStates) {
  const classItemText = getClassItemText(classStates.classItem);
  const createClassTimeProps = {
    createFunc: () => createClassTime(classStates),
    text: `Adicionar horário à turma ${classItemText}`,
  };
  return <CreateClassTime {...createClassTimeProps} />;
}

function SmartUpdateClassTime(updateClassTimeStates) {
  const { classTime, oldClassTime, setOldClassTime } = updateClassTimeStates;

  const classTimeText = getClassTimeText(classTime);
  let dontUpdateMessage = defaultText.update.noChanges;
  dontUpdateMessage += classTimeText;

  let baseMessage = `Atualizar horário\n`;

  const [modifiedMessage, setModifiedMessage] = useState(dontUpdateMessage);
  const [needsUpdateStatus, setNeedsUpdateStatus] = useState(false);

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

    const oldRoomInfo = oldRoom === null ? "null" : getRoomText(oldRoom);
    const newRoomInfo = newRoom === null ? "null" : getRoomText(newRoom);

    function getNewValueLine(propName, oldValue, newValue) {
      return `\t- ${propName}: ${oldValue} -> ${newValue}\n`;
    }

    const newRoomText = `\t- Sala: ${oldRoomInfo} -> ${newRoomInfo}\n`;
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
    setModifiedMessage(dontUpdateMessage);
    updateClassTime(updateClassTimeStates);
  }

  const updateClassTimeProps = {
    updateFunc: smartUpdateClassTime,
    text: modifiedMessage,
    color: needsUpdateStatus
      ? defaultColors.CRUD.update
      : defaultColors.CRUD.default,
  };

  return <UpdateClassTime {...updateClassTimeProps} />;
}

function SmartDeleteClassTime(classTimeRowStates) {
  const { classTime, filteredClasses } = classTimeRowStates;
  // get classItem from filteredClasses

  const fakeClassItem = { id: classTime.idTurma };
  const classItem = getItemFromListById(fakeClassItem, filteredClasses);

  const timeText = getClassTimeText(classTime);
  const classText = getClassItemText(classItem);

  const deleteClassTimeProps = {
    deleteFunc: () => deleteClassTime(classTimeRowStates),
    text: `Remover horário${timeText}:\n\t- turma: ${classText}`,
  };

  return <DeleteClassTime {...deleteClassTimeProps} />;
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
