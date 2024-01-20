import React from "react";
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
  let titleText = `Atualizar horário (id: ${getId(classTime)}):\n`;
  titleText += `  - idTurma ${classTime?.idTurma}`;

  return <UpdateClassTime updateFunc={updateClassTimeDB} text={titleText} />;
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
