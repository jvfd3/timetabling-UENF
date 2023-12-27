import React from "react";
import {
  CreateHora,
  CreateInfo,
  CustomCreateButton,
  CustomDeleteButton,
  DeleteHora,
  DeleteInfo,
} from "../Dumb/Dumb";
import options from "../../../DB/local/options";
import {
  createTurma,
  deleteTurma,
  createHorario,
  deleteHorario,
} from "../../../helpers/hourclassMagic";

let compactBuild = options.config.iconButtons;

function SmartCreateTurma({ turmas, setTurmas }) {
  function addTurma() {
    createTurma(turmas, setTurmas);
  }
  return compactBuild ? (
    <CreateInfo createFunc={addTurma} text={"Adicionar turma"} />
  ) : (
    <CustomCreateButton createFunc={addTurma} text="Adicionar Turma" />
  );
}

function SmartDeleteTurma({ turmas, setTurmas, turma }) {
  function delTurma() {
    deleteTurma(turmas, setTurmas, turma);
  }
  return compactBuild ? (
    <DeleteInfo deleteFunc={delTurma} text={"Remover Turma"} />
  ) : (
    <CustomDeleteButton deleteFunc={delTurma} text="Remover Turma" />
  );
}

function SmartCreateHora({ turma, setTurma }) {
  function addHour() {
    createHorario(turma, setTurma);
  }
  return compactBuild ? (
    <CreateHora createFunc={addHour} text="Adicionar Horário" />
  ) : (
    <CustomCreateButton createFunc={addHour} text="Adicionar Horário" />
  );
}

function SmartDeleteHora({ turma, setTurma, horaIndex }) {
  function removeHour() {
    deleteHorario(turma, setTurma, horaIndex);
  }
  return compactBuild ? (
    <DeleteHora deleteFunc={removeHour} text={"Remover horário"} />
  ) : (
    <CustomDeleteButton deleteFunc={removeHour} text="Remover Horário" />
  );
}

export { SmartCreateTurma, SmartDeleteTurma, SmartCreateHora, SmartDeleteHora };
