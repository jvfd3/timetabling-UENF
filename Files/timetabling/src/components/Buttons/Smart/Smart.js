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
  createHorario,
  deleteHorario,
} from "../../../helpers/hourclassMagic";

let compactBuild = options.config.iconButtons;

function SmartCreateTurma(myProps) {
  let titleText = "Adicionar turma";
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
  let titleText = `Remover turma ${turma.idTurma}`;
  function delTurma() {
    deleteTurma(turmas, setTurmas, turma);
  }
  return compactBuild ? (
    <DeleteInfo deleteFunc={delTurma} text={titleText} />
  ) : (
    <CustomDeleteButton deleteFunc={delTurma} text={titleText} />
  );
}

function SmartCreateHora(myProps) {
  /* Should receive these props:
  const { turmas, setTurmas, rowTurma, setRowTurma, classTimeIndex } = turmasStates;
  */

  let titleText = "Adicionar horário";
  function addHour() {
    createHorario(myProps);
  }
  return compactBuild ? (
    <CreateHora createFunc={addHour} text={titleText} />
  ) : (
    <CustomCreateButton createFunc={addHour} text={titleText} />
  );
}

function SmartDeleteHora(myProps) {
  let titleText = `Remover horário ${myProps.idHorario} da turma ${myProps.turma.idTurma}`;
  // console.log("SmartDeleteHora", horaIndex);
  function removeHour() {
    deleteHorario(myProps);
  }
  return compactBuild ? (
    <DeleteHora deleteFunc={removeHour} text={titleText} />
  ) : (
    <CustomDeleteButton deleteFunc={removeHour} text={titleText} />
  );
}

function AddTurmaWithDisciplinaButton({ turmas, setTurmas, disciplina }) {
  function addTurmaWithDisciplina() {
    let newTurma = {
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
  SmartCreateHora,
  SmartDeleteHora,
  AddTurmaWithDisciplinaButton,
};
