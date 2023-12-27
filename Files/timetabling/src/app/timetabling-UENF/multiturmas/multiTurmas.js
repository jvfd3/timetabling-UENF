import React, { useState, useEffect } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  SelectDisciplina,
  SelectProfessor,
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  SelectAnoSemestre,
} from "../../../components/mySelects";
// import {
//   centralConflicts,
//   coloredConflicts,
//   conflictsDisciplinaPeriodo,
// } from "../../../helpers/conflicts/centralConflicts";
import "./multiTurmas.css";
// import { readTurmas } from "../../../DB/AWS/axiosConnection";
import {
  getFullHorarios,
  // filterTurmasByAnoSemestre,
  // getTurmasDoAnoSemestre,
  // splittedToUnified,
  splittedToUnified2,
} from "../../../helpers/auxFunctions";
import { NumberInputDemandaEstimada } from "../../../components/MyTextFields";
import {
  SmartCreateTurma,
  SmartDeleteTurma,
  SmartCreateHora,
  SmartDeleteHora,
} from "../../../components/Buttons/Smart/Smart";
import { insertNewTurmaInTurmas } from "../../../helpers/hourclassMagic";

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateTurma />
        </th>
        <th>Código - Nome</th>
        <th>Professor</th>
        <th>Demanda Estimada</th>
        <th colSpan={2}>Horarios</th>
      </tr>
    </thead>
  );
}

function HorariosTableRow({
  horario,
  indexHorario,
  lTurma,
  lTurmas,
  setLTurma,
}) {
  return (
    <tr key={`RowHorario-${horario.idHorario}-${horario.ordemHorario}`}>
      <td>
        <SmartDeleteHora
          turma={lTurma}
          setTurma={setLTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectSala
          lTurma={lTurma}
          setLTurma={setLTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectDia
          lTurma={lTurma}
          setLTurma={setLTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectHoraTang
          lTurma={lTurma}
          setLTurma={setLTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectDuracao
          lTurma={lTurma}
          setLTurma={setLTurma}
          indexHorario={indexHorario}
        />
      </td>
    </tr>
  );
}

function HorariosTable({ lTurmas, setLTurma, lTurma }) {
  return (
    <table>
      <thead>
        <tr key={`LinhaHorarios-${lTurma.idTurma}`}>
          <th>
            <SmartCreateHora turma={lTurma} setTurma={setLTurma} />
          </th>
          <th>Sala</th>
          <th>Dia</th>
          <th>Hora Início</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {lTurma.horarios.map((horario, index) => (
          <HorariosTableRow
            key={`RowHorario-${horario.idHorario}-${horario.ordemHorario}`}
            horario={horario}
            indexHorario={index}
            lTurma={lTurma}
            lTurmas={lTurmas}
            setLTurma={setLTurma}
          />
        ))}
      </tbody>
    </table>
  );
}

function TableRow({ turmas, setTurmas, lTurma, setTurma }) {
  return (
    <tr key={lTurma.idTurma}>
      <td>
        <SmartDeleteTurma
          turmas={turmas}
          setTurmas={setTurmas}
          turma={lTurma}
        />
      </td>
      <td>
        <SelectDisciplina lTurma={lTurma} setLTurma={setTurma} />
      </td>
      <td>
        <SelectProfessor lTurma={lTurma} setLTurma={setTurma} />
      </td>
      <td>
        <NumberInputDemandaEstimada lTurma={lTurma} setLTurma={setTurma} />
      </td>
      <td>
        {lTurma.horarios.length === 0 ? null : (
          <HorariosTable
            setLTurma={setTurma}
            lTurmas={turmas}
            lTurma={lTurma}
          />
        )}
      </td>
    </tr>
  );
}

function TurmasTable(myTurmasProps) {
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;
  return (
    <table className="showBasicDataTable">
      <TableHeader />
      <tbody>
        {turmas.map((lTurma) => (
          <TableRow
            turmas={turmas}
            setTurmas={setTurmas}
            lTurma={lTurma}
            setTurma={setTurma}
            key={lTurma.idTurma}
          />
        ))}
      </tbody>
    </table>
  );
}

function SemTurmas() {
  return (
    <div className="infoCard">
      <p>Ainda não há turmas cadastradas</p>
    </div>
  );
}

function TurmasCard({ myTurmasProps, myCurrentSemestreProps }) {
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;
  return (
    <div className="infoCard">
      <div className="MultiTurmasTitle">
        <h2>MultiTurmas</h2>
        <SelectAnoSemestre {...myCurrentSemestreProps} />
      </div>
      {turmas.length === 0 ? <SemTurmas /> : <TurmasTable {...myTurmasProps} />}
    </div>
  );
}

function Turmas() {
  const [ano, setAno] = useState(options.constantValues.years[10]);
  const [semestre, setSemestre] = useState(options.constantValues.semesters[0]);
  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState({});

  useEffect(() => {
    let allTurmas = getFullHorarios();
    let unifiedHorarios = splittedToUnified2(allTurmas);
    setTurmas(unifiedHorarios);
    setTurma(unifiedHorarios[0]);
    // readTurmas().then((turmas) => {
    //   let allTurmas = turmas;
    //   let unifiedTurmas = splittedToUnified(allTurmas);
    //   let turmasFiltradas = getTurmasDoAnoSemestre(
    //     unifiedTurmas,
    //     ano,
    //     semestre
    //   );
    //   setTurmas(turmasFiltradas);
    // });
  }, []);

  useEffect(() => {
    insertNewTurmaInTurmas(turmas, setTurmas, turma);
  }, [turma]);

  let myCurrentSemestreProps = { ano, setAno, semestre, setSemestre };
  let myTurmasProps = { turmas, setTurmas, turma, setTurma };
  let myProps = { myTurmasProps, myCurrentSemestreProps };

  return (
    <div className="CRUDContainComponents">
      <TurmasCard {...myProps} />
    </div>
  );
}

function CRUDclass() {
  return (
    <div className="background">
      <CRUDPageSelection
        defaultValue={options.constantValues.pageSelection.multiTurmas}
      />
      <Turmas />
    </div>
  );
}

export default CRUDclass;
