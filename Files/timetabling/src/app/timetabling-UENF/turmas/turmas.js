import "./turmas.css";
import React, { useEffect, useRef, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import {
  SelectDia,
  SelectDuracao,
  SelectHoraTang,
  SelectSala,
  SelectClassItem,
  SelectClassYear,
  SelectClassSemester,
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import {
  getFullHorarios,
  splittedToUnified2,
} from "../../../helpers/auxFunctions";
import {
  SmartCreateHora,
  SmartDeleteHora,
} from "../../../components/Buttons/Smart/Smart";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
import {
  createClass,
  readClass,
  updateClass,
  deleteClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import {
  createClassTime,
  readClassTime,
  updateClassTime,
  deleteClassTime,
} from "../../../helpers/CRUDFunctions/classTimeCRUD";

function TurmaSelection(myTurmaStates) {
  const newClassesStates = {
    classes: myTurmaStates.turmas,
    setClasses: myTurmaStates.setTurmas,
    classItem: myTurmaStates.turma,
    setClassItem: myTurmaStates.setTurma,
  };
  /* It just contains the selection an maybe allows scrolling selection */
  const turmaCRUDFunctions = {
    createFunc: () => createClass(myTurmaStates),
    readFunc: () => readClass(myTurmaStates),
    updateFunc: () => updateClass(myTurmaStates),
    deleteFunc: () => deleteClass(newClassesStates),
  };
  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...turmaCRUDFunctions} />
      <SelectClassItem {...newClassesStates} />
    </div>
  );
}

function DadosTurma(classesStates) {
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
                <SelectClassYear {...classesStates} />
                <SelectClassSemester {...classesStates} />
              </div>
            </td>
          </tr>
          <tr>
            <th>Disciplina</th>
            <td>
              <SelectClassSubject {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Professor</th>
            <td>
              <SelectClassProfessor {...classesStates} />
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

function Classes() {
  const classIndex = useRef(sqlDataFromJson.classes.length);
  const classTimeIndex = useRef(sqlDataFromJson.classtimes.length);

  let unifiedHorarios = getFullHorarios();

  const [turmas, setTurmas] = useState(unifiedHorarios);
  const [turma, setTurma] = useState(turmas[0]);

  let indexes = { classIndex, classTimeIndex };
  let myTurmaStates = { turmas, setTurmas, turma, setTurma };
  let myStates = { indexes, myTurmaStates };

  const classesStates = {
    classes: turmas,
    setClasses: setTurmas,
    classItem: turma,
    setClassItem: setTurma,
  };

  useEffect(() => {
    console.log("useEffect, turmas updated");
  }, [turmas]);

  useEffect(() => {
    console.log("Updated Disciplina");
  }, [turma?.disciplina?.id]);

  useEffect(() => {
    // updateClass(myTurmaStates);
  }, [
    turma?.ano,
    turma?.semestre,
    turma?.disciplina?.id,
    turma?.professor?.id,
  ]);

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...myTurmaStates} />
      <div className="infoCard">
        <DadosTurma {...classesStates} />
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
      <Classes />
    </div>
  );
}

export default CRUDclass;
