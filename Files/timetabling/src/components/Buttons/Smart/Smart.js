import React, { useEffect, useRef, useState } from "react";
import {
  CreateHora,
  CreateInfo,
  CustomCreateButton,
  CustomDeleteButton,
  DeleteHora,
  DeleteInfo,
  InputDisciplina,
  UpdateClassTime,
} from "../Dumb/Dumb";
import options from "../../../DB/local/options";
import { getId } from "../../../helpers/auxCRUD";

const compactBuild = options.config.iconButtons;

function SmartCreateTurma(myProps) {
  const titleText = "Adicionar turma";
  function addTurma() {
    createTurma(myProps);
  }
  return compactBuild ? (
    <CreateInfo createFunc={addTurma} text={titleText} />
  ) : (
    <CustomCreateButton createFunc={addTurma} text={titleText} />
  );
}

function SmartDeleteTurma({ turmas, setTurmas, turma }) {
  const titleText = `Remover turma ${getId(turma)}`;
  function delTurma() {
    deleteTurma(turmas, setTurmas, turma);
  }
  return compactBuild ? (
    <DeleteInfo deleteFunc={delTurma} text={titleText} />
  ) : (
    <CustomDeleteButton deleteFunc={delTurma} text={titleText} />
  );
}

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

function SmartCreateClassTime(createClassTimeProps) {
  const { classItem, createClassTimeDB } = createClassTimeProps;

  const titleText = `Adicionar horário à turma id: ${getId(classItem)}`;

  return compactBuild ? (
    <CreateHora createFunc={createClassTimeDB} text={titleText} />
  ) : (
    <CustomCreateButton createFunc={createClassTimeDB} text={titleText} />
  );
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

  return compactBuild ? (
    <DeleteHora deleteFunc={deleteClassTimeDB} text={titleText} />
  ) : (
    <CustomDeleteButton deleteFunc={deleteClassTimeDB} text={titleText} />
  );
}

export {
  SmartCreateTurma,
  SmartDeleteTurma,
  SmartCreateClassTime,
  SmartUpdateClassTime,
  SmartDeleteClassTime,
  AddTurmaWithDisciplinaButton,
};
