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
import { getTurmasDoAnoSemestre } from "../../../helpers/auxFunctions";
import { NumberInputDemandaEstimada } from "../../../components/MyTextFields";
import {
  SmartCreateTurma,
  SmartDeleteTurma,
  SmartCreateHora,
  SmartDeleteHora,
} from "../../../components/Buttons/Smart/Smart";
import { getTurmasData } from "../../../DB/retrieveData";
import { baseTurmaConflicts } from "../../../helpers/conflicts/centralConflicts";

/* ESTRUTURA DOS COMPONENTES
- CRUDclass
  - CRUDPageSelection
  - Turmas
    - SemTurmas
    - TurmasCard
      - MultiTurmasTitle
        - h2
        - SelectAnoSemestre
      - TurmasTable
        - TableHeader
        - tbody
          - TableRow
            - SmartDeleteTurma
            - SelectDisciplina
            - SelectProfessor
            - NumberInputDemandaEstimada
            - HorariosTable
              - SmartCreateHora
              - HorariosTableRow
                - SmartDeleteHora
                - SelectSala
                - SelectDia
                - SelectHoraTang
                - SelectDuracao
*/

function TableHeader(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas } = myTurmasProps;
  const { semestre, ano } = myCurrentSemestreProps;
  const createStates = { turmas, setTurmas, semestre, ano };
  return (
    <thead>
      <tr>
        <th>
          <SmartCreateTurma {...createStates} />
        </th>
        <th>Código - Nome</th>
        <th>Professor</th>
        <th>Demanda Estimada</th>
        <th colSpan={2}>Horarios</th>
      </tr>
    </thead>
  );
}

function HorariosTableRow(myProps) {
  const { turmas, turma, setTurma, horario, indexHorario } = myProps;

  return (
    <tr
      key={`HorariosTableRow>tr: ${horario.idHorario}-${horario.ordem}-${indexHorario}`}
    >
      <td>
        <SmartDeleteHora
          turma={turma}
          setTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectSala
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectDia
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectHoraTang
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
      <td>
        <SelectDuracao
          lTurma={turma}
          setLTurma={setTurma}
          indexHorario={indexHorario}
        />
      </td>
    </tr>
  );
}

function HorariosTable(myProps) {
  const { rowStates, myTurmasProps } = myProps;
  const { rowTurma, setRowTurma } = rowStates;
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;
  return (
    <table>
      <thead>
        <tr key={`LinhaHorarios-${rowTurma.idTurma}`}>
          <th>
            <SmartCreateHora
              turmas={turmas}
              setTurmas={setTurmas}
              turma={rowTurma}
              setTurma={setRowTurma}
            />
          </th>
          <th>Sala</th>
          <th>Dia</th>
          <th>Hora Início</th>
          <th>Duração</th>
        </tr>
      </thead>
      <tbody>
        {rowTurma.horarios.map((horario, index) => (
          <HorariosTableRow
            key={`HorariosTable>HorariosTableRow: ${horario.idHorario}-${horario.ordem}-${index}`}
            turmas={turmas}
            turma={rowTurma}
            setTurma={setRowTurma}
            horario={horario}
            indexHorario={index}
          />
        ))}
      </tbody>
    </table>
  );
}

function TableRow(myProps) {
  const { lTurma, myTurmasProps } = myProps;
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;

  const [rowTurma, setRowTurma] = useState(lTurma);
  const rowStates = { rowTurma, setRowTurma };

  /*
  Pretendo percorrer todas as turmas e verificar se há conflitos entre elas.
  Para isso, preciso de uma função que receba a lista de turmas e a turma em questão.
  Essa função deve retornar um objeto com os conflitos encontrados.
  Esse objeto deve ser usado para colorir a linha da tabela.
  Esse objeto deve ter a seguinte estrutura:
  {
    conflitosDisciplinaPeriodo: {
      title: "Conflitos Disciplina Período",
      style: { backgroundColor: "#6560f0" },
    },
    conflitosProfessor: {
      title: "Conflitos Professor",
      style: { backgroundColor: "#84d47d" },
    },
    conflitosDemanda: {
      title: "Conflitos Demanda",
      style: { backgroundColor: "#d9b57c" },
    },
  }
  */
  let myStyle = baseTurmaConflicts(turmas, rowTurma);

  return (
    <tr
      key={`TableRow>tr: ${lTurma.idTurma}-${lTurma.disciplina?.codigoDisciplina}-${lTurma?.professor?.nome}`}
    >
      <td>
        <SmartDeleteTurma
          turmas={turmas}
          setTurmas={setTurmas}
          turma={rowTurma}
        />
      </td>
      <td {...myStyle.disciplina}>
        <SelectDisciplina lTurma={rowTurma} setLTurma={setRowTurma} />
      </td>
      <td {...myStyle.professor}>
        <SelectProfessor lTurma={rowTurma} setLTurma={setRowTurma} />
      </td>
      <td {...myStyle.demanda}>
        <NumberInputDemandaEstimada lTurma={rowTurma} setLTurma={setRowTurma} />
      </td>
      <td>
        {rowTurma.horarios.length === 0 ? (
          <SmartCreateHora
            turmas={turmas}
            setTurmas={setTurmas}
            turma={rowTurma}
            setTurma={setRowTurma}
          />
        ) : (
          <HorariosTable rowStates={rowStates} myTurmasProps={myTurmasProps} />
        )}
      </td>
    </tr>
  );
}

function TurmasTable(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;
  return (
    <table className="showBasicDataTable">
      <TableHeader {...myProps} />
      <tbody>
        {turmas.map((lTurma, index) => (
          <TableRow
            lTurma={lTurma}
            myTurmasProps={myTurmasProps}
            key={`TableRow: ${lTurma.idTurma}-${lTurma.disciplina?.codigoDisciplina}-${lTurma?.professor?.nome}-${index}`}
          />
        ))}
      </tbody>
    </table>
  );
}

function SemTurmas(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas } = myTurmasProps;
  const { semestre, ano } = myCurrentSemestreProps;
  const createStates = { turmas, setTurmas, semestre, ano };
  return (
    <div
      className="infoCard"
      style={{ display: "flex", flexDirection: "row", textAlignLast: "center" }}
    >
      <p>Ainda não há turmas cadastradas. Clique Aqui</p>
      <SmartCreateTurma {...createStates} />
      <p>para criar uma turma</p>
    </div>
  );
}

function TurmasCard(myProps) {
  const { myTurmasProps, myCurrentSemestreProps } = myProps;
  const { turmas, setTurmas, turma, setTurma } = myTurmasProps;
  return (
    <div className="infoCard">
      <div className="MultiTurmasTitle">
        <h2>MultiTurmas</h2>
        <SelectAnoSemestre {...myCurrentSemestreProps} />
      </div>
      {turmas.length === 0 ? (
        <SemTurmas {...myProps} />
      ) : (
        <TurmasTable {...myProps} />
      )}
    </div>
  );
}

function Turmas() {
  const [ano, setAno] = useState(options.constantValues.years[10]);
  const [semestre, setSemestre] = useState(options.constantValues.semesters[0]);

  let unifiedHorarios = getTurmasData();

  let filteredTurmas = getTurmasDoAnoSemestre(
    unifiedHorarios,
    ano.value,
    semestre.value
  );

  const [turmas, setTurmas] = useState(filteredTurmas);
  const [turma, setTurma] = useState(filteredTurmas[0]);
  /* useEffect(() => {
    setTurmas();
    setTurma();
  }, []); */

  useEffect(() => {
    let newFilteredTurmas = getTurmasDoAnoSemestre(
      unifiedHorarios,
      ano.value,
      semestre.value
    );
    setTurmas(newFilteredTurmas);
    setTurma(newFilteredTurmas[0]);
  }, [ano, semestre]);

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
