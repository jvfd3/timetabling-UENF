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
  function addTurma() {
    createTurma(myProps);
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
