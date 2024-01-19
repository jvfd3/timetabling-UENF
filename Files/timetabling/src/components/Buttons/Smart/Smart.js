import React from "react";
import {
  CreateHora,
  CreateInfo,
  CustomCreateButton,
  CustomDeleteButton,
  DeleteHora,
  DeleteInfo,
  InputDisciplina,
} from "../Dumb/Dumb";
import options from "../../../DB/local/options";
import {
  createTurma,
  deleteTurma,
  createClassTime,
  deleteHorario,
} from "../../../helpers/hourclassMagic";
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

function SmartCreateClassTime(createClassTimeProps) {
  /* Should receive these props:
  const { classes, setClasses, classItem, setClassItem, classTimeIndex } = classTimeStates;
  */
  const { createClassTimeDB } = createClassTimeProps;
  const titleText = "Adicionar horário";

  return compactBuild ? (
    <CreateHora createFunc={createClassTimeDB} text={titleText} />
  ) : (
    <CustomCreateButton createFunc={createClassTimeDB} text={titleText} />
  );
}

function SmartDeleteClassTime(classTimeRowStates) {
  const { classTime } = classTimeRowStates;
  let titleText = `Remover  horário:\n`;
  titleText += `  - idTurma ${classTime?.idTurma}\n`;
  titleText += `  - idHorario: ${getId(classTime)}`;

  function removeHour() {
    deleteHorario(classTimeRowStates);
  }
  return compactBuild ? (
    <DeleteHora deleteFunc={removeHour} text={titleText} />
  ) : (
    <CustomDeleteButton deleteFunc={removeHour} text={titleText} />
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

export {
  SmartCreateTurma,
  SmartDeleteTurma,
  SmartCreateClassTime,
  SmartDeleteClassTime,
  AddTurmaWithDisciplinaButton,
};
