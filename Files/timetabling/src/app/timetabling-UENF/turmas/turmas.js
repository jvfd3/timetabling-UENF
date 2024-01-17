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
import {
  TextInputClassExpectedDemand,
  TextInputClassId,
} from "../../../components/MyTextFields";

function TurmaSelection(classStates) {
  /* It just contains the selection an maybe allows scrolling selection */
  const turmaCRUDFunctions = {
    createFunc: () => createClass(classStates),
    readFunc: () => readClass(classStates),
    updateFunc: () => updateClass(classStates),
    deleteFunc: () => deleteClass(classStates),
  };
  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...turmaCRUDFunctions} />
      <SelectClassItem {...classStates} />
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
          <tr>
            <th>Demanda Estimada</th>
            <td>
              <TextInputClassExpectedDemand {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Id</th>
            <td>
              <TextInputClassId {...classesStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function HorariosTurma(myStates) {
  const { classesStates, indexes } = myStates;
  const { classes, setClasses, classItem, setClassItem } = classesStates;
  const { /* classIndex, */ classTimeIndex } = indexes;
  console.log("classItem", classItem);
  if (classItem.horarios == null) {
    classItem.horarios = [];
  }
  let quantidadeHorarios = classItem.horarios.length;
  // console.log("quantidadeHorarios", quantidadeHorarios);
  let createClassTimeProps = {
    classes,
    setClasses,
    currentClass: classItem,
    setCurrentClass: setClassItem,
    classTimeIndex,
  };
  const hourTableProps = { createClassTimeProps, classesStates };
  return (
    <div className="showBasicDataCard">
      <h3>
        {quantidadeHorarios > 0 ? "" : "Sem "}
        Horários
      </h3>
      {quantidadeHorarios > 0 ? (
        <HorariosTable {...hourTableProps} />
      ) : (
        <SmartCreateHora {...createClassTimeProps} />
      )}
    </div>
  );
}

function HorariosTable({ createClassTimeProps, classesStates }) {
  const { classItem, setClassItem } = classesStates;
  return (
    <table className="showBasicDataTable">
      <thead>
        <tr>
          <th>
            <SmartCreateHora {...createClassTimeProps} />
          </th>
          <th>Sala</th>
          <th>Dia</th>
          <th>Hora de início</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {classItem.horarios.map((horario, index) => {
          return (
            <tr key={`Linha Horário: ${horario.id}-${index}`}>
              <td>
                <SmartDeleteHora
                  turma={classItem}
                  setTurma={setClassItem}
                  idHorario={horario.id}
                  // {...smartDeleteProps}
                />
              </td>
              <td>
                <SelectSala
                  lTurma={classItem}
                  setLTurma={setClassItem}
                  indexHorario={index}
                />
              </td>
              <td>
                <SelectDia
                  lTurma={classItem}
                  setLTurma={setClassItem}
                  indexHorario={index}
                />
              </td>
              <td>
                <SelectHoraTang
                  lTurma={classItem}
                  setLTurma={setClassItem}
                  indexHorario={index}
                />
              </td>
              <td>
                <SelectDuracao
                  lTurma={classItem}
                  setLTurma={setClassItem}
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

  // let defaultClasses = getFullHorarios();
  const defaultClasses = [options.emptyObjects.turma];

  const [classes, setClasses] = useState(defaultClasses);
  const [classItem, setClassItem] = useState(classes[0]);

  const classesStates = { classes, setClasses, classItem, setClassItem };
  const indexes = { classIndex, classTimeIndex };
  const myStates = { classesStates, indexes };

  /* useEffect(() => {
    updateClass(classesStates);
  }, [
    classItem?.ano,
    classItem?.semestre,
    classItem?.disciplina?.id,
    classItem?.professor?.id,
  ]); */

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...classesStates} />
      <div className="infoCard">
        <button
          style={{ cursor: "pointer", backgroundColor: "#226699" }}
          onClick={() => {
            console.log("turma", classItem);
            console.log("turmas", classes);
          }}
        >
          Como tá agora?
          {JSON.stringify(classItem)}
        </button>
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
