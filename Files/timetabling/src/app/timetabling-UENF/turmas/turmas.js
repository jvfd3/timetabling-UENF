import "./turmas.css";
import React, { useRef, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import {
  SelectDia,
  SelectDisciplina,
  SelectDuracao,
  SelectHoraTang,
  SelectProfessor,
  SelectSala,
  SelectAnoTurma,
  SelectSemestreTurma,
  TurmaItemSelection,
} from "../../../components/mySelects";
import {
  getFullHorarios,
  splittedToUnified2,
} from "../../../helpers/auxFunctions";
import {
  SmartCreateHora,
  SmartDeleteHora,
} from "../../../components/Buttons/Smart/Smart";

function TurmaSelection(myTurmaStates) {
  /* It just contains the selection an maybe allows scrolling selection */
  return (
    <div
      className="SelectionBar"
      onWheel={(event) => {
        // let itemStates = [turmas, setTurma, turma];
        // scrollThroughTurmas(event, itemStates);
      }}
    >
      <TurmaItemSelection {...myTurmaStates} />
    </div>
  );
}

function DadosTurma(myTurmaStates) {
  const { turma, setTurma /* turmas, setTurmas  */ } = myTurmaStates;
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA TURMA</h3>
      <table className="showBasicDataTable">
        <thead></thead>
        <tbody>
          <tr>
            <th>Ano/Semestre</th>
            <td>
              <div className="SelectAnoSemestre">
                <SelectAnoTurma lTurma={turma} setLTurma={setTurma} />
                <SelectSemestreTurma lTurma={turma} setLTurma={setTurma} />
              </div>
            </td>
          </tr>
          <tr>
            <th>Disciplina</th>
            <td>
              <SelectDisciplina lTurma={turma} setLTurma={setTurma} />
            </td>
          </tr>
          <tr>
            <th>Professor</th>
            <td>
              <SelectProfessor lTurma={turma} setLTurma={setTurma} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function HorariosTurma(myStates) {
  const { myTurmaStates, indexes } = myStates;
  const { turma, setTurma, turmas, setTurmas } = myTurmaStates;
  const { /* classIndex, */ classTimeIndex } = indexes;
  let quantidadeHorarios = turma.horarios.length;
  // console.log("quantidadeHorarios", quantidadeHorarios);
  let createClassTimeStates = {
    turmas,
    setTurmas,
    rowTurma: turma,
    setRowTurma: setTurma,
    classTimeIndex,
  };

  return (
    <div className="showBasicDataCard">
      <h3>
        {quantidadeHorarios > 0 ? "" : "Sem "}
        Horários
      </h3>
      {quantidadeHorarios > 0 ? (
        <HorariosTable
          {...myStates}
          createClassTimeStates={createClassTimeStates}
        />
      ) : (
        <SmartCreateHora {...createClassTimeStates} />
      )}
    </div>
  );
}

function HorariosTable(myStates) {
  const { myTurmaStates, createClassTimeStates } = myStates;
  const { turma, setTurma } = myTurmaStates;
  return (
    <table className="showBasicDataTable">
      <thead>
        <tr>
          <th>
            <SmartCreateHora {...createClassTimeStates} />
          </th>
          <th>Dia</th>
          <th>Hora de início</th>
          <th>Sala</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {turma.horarios.map((horario, index) => {
          return (
            <tr key={`Linha Horário: ${horario.idHorario}-${index}`}>
              <td>
                <SmartDeleteHora
                  turma={turma}
                  setTurma={setTurma}
                  idHorario={horario.idHorario}
                  // {...smartDeleteProps}
                />
              </td>
              <td>
                <SelectDia
                  lTurma={turma}
                  setLTurma={setTurma}
                  indexHorario={index}
                />
              </td>
              <td>
                <SelectSala
                  lTurma={turma}
                  setLTurma={setTurma}
                  indexHorario={index}
                />
              </td>
              <td>
                <SelectHoraTang
                  lTurma={turma}
                  setLTurma={setTurma}
                  indexHorario={index}
                />
              </td>
              <td>
                <SelectDuracao
                  lTurma={turma}
                  setLTurma={setTurma}
                  indexHorario={index}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function Turmas() {
  const classIndex = useRef(sqlDataFromJson.classes.length);
  const classTimeIndex = useRef(sqlDataFromJson.classtimes.length);

  let unifiedHorarios = getFullHorarios();

  const [turmas, setTurmas] = useState(unifiedHorarios);
  const [turma, setTurma] = useState(turmas[0]);

  let indexes = { classIndex, classTimeIndex };
  let myTurmaStates = { turmas, setTurmas, turma, setTurma };
  let myStates = { indexes, myTurmaStates };

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...myTurmaStates} />
      <div className="infoCard">
        <DadosTurma {...myTurmaStates} />
        <HorariosTurma {...myStates} />
        {/* <Participants {...myTurmaStates} /> */}
      </div>
    </div>
  );
}

function CRUDclass() {
  let defaultPageValue = options.constantValues.pageSelection.classes;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Turmas />
    </div>
  );
}

export default CRUDclass;
