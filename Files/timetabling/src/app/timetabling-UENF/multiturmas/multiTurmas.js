import React, { useState, useEffect } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
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
import { flattenTurma } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import "./multiTurmas.css";
import { readTurmas } from "../../../DB/AWS/axiosConnection";
import {
  filterTurmasByAnoSemestre,
  getFullHorarios,
  getTurmasDoAnoSemestre,
  splittedToUnified,
  splittedToUnified2,
} from "../../../helpers/auxFunctions";
import { NumberInputDemandaEstimada } from "../../../components/MyTextFields";
import {
  RemoveTurmaButton,
  RemoveHorarioButton,
  AdicionarTurma,
  AdicionarHorario,
} from "../../../components/Buttons/CRUDTurmas/CRUDTurmas";

function Turmas3() {
  const [ano, setAno] = useState(options.constantValues.years[10]);
  const [semestre, setSemestre] = useState(options.constantValues.semesters[0]);

  // async function getTurmas() {
  //   let turmas = await readTurmas();
  //   console.log(turmas);
  // }

  function filterTurmas(turmas) {
    let turmasFiltradas = turmas.filter(
      (turma) => turma.ano === ano.value && turma.semestre === semestre.value
    );
    return turmasFiltradas;
  }

  let allTurmas = [];
  // let turmasFiltradas = [];

  const [turmas, setTurmas] = useState([]);
  const [turma, setTurma] = useState(turmas.length > 0 ? turmas[0] : null);
  const [currentId, setCurrentId] = useState(allTurmas.length + 1);

  useEffect(() => {
    readTurmas().then((turmas) => {
      let allTurmas = turmas;
      let unifiedTurmas = splittedToUnified(allTurmas);
      let turmasFiltradas = filterTurmas(unifiedTurmas);
      setTurmas(turmasFiltradas);
    });
  }, []);

  useEffect(() => {
    let turmasFiltradas = allTurmas.filter(
      (turma) => turma.ano === ano.value && turma.semestre === semestre.value
    );
    setTurmas(turmasFiltradas);
  }, [ano, semestre]);

  function updateTurmas(newTurmaValue) {
    // ERROR
    // Cannot read properties of undefined (reading 'id')
    // TypeError: Cannot read properties of undefined (reading 'id')
    // at Array.map
    if (newTurmaValue && turma) {
      let newTurmas = turmas.map((turma, i) =>
        turma &&
        newTurmaValue &&
        parseInt(turma.id) === parseInt(newTurmaValue.id)
          ? newTurmaValue
          : turmas[i]
      );
      setTurmas(newTurmas);
    }
  }

  useEffect(() => {
    // let message = "It seems that 'turma' have changed, so I will update everything for ya 🫡"
    // console.log(message);
    updateTurmas(turma);
  }, [turma]);

  function addTurma() {
    let newId = currentId.toString();
    let newTurma = {
      id: newId,
      ano: ano.value,
      semestre: semestre.value,
      disciplina: {
        codigo: null,
        nome: null,
      },
      professor: null,
      demandaEstimada: 0,
      horarios: [
        {
          id: newId + "_1",
          sala: null,
          dia: null,
          horaInicio: null,
          duracao: 2,
        },
        {
          id: newId + "_2",
          sala: null,
          dia: null,
          horaInicio: null,
          duracao: 2,
        },
      ],
    };
    setCurrentId(currentId + 1);
    setTurmas([...turmas, newTurma]);
  }

  function DisciplinasNaoOferecidas(props) {
    const { lTurmas } = props;

    // Percorra cada turma em lTurmas e preencha uma lista dos códigos das disciplinas oferecidas pelas turmas
    let disciplinasOferecidas = lTurmas.map((turma) => turma.codigoDisciplina);
    // console.log(disciplinasOferecidas);

    // let TodasDisciplinas = allLocalJsonData.static.infoDisciplinasCC;
    let TodasDisciplinas = allLocalJsonData.SQL.disciplinas;

    // Listar todas os código-nomes de disciplinas que são de semestre ímpar
    // Filtrar todas que são de periodoEsperado%2 == 1
    let DisciplinasDoSemestre = TodasDisciplinas;
    if (semestre.value !== 3) {
      DisciplinasDoSemestre = TodasDisciplinas.filter(
        (disciplina) => disciplina.periodo % 2 === semestre.value % 2
      );
    }

    // Percorrer cada disciplina em DisciplinasDoSemestre e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
    let DisciplinasAindaNaoOferecidas = DisciplinasDoSemestre.filter(
      (disciplina) => {
        return !disciplinasOferecidas.includes(disciplina.codigo);
      }
    );

    // | Período esperado | Código - Nome |
    // Se o período da disciplina for 1, aplicar o className EnfasePrimeiroPeriodo
    let visualizacaoDisciplinas = DisciplinasAindaNaoOferecidas.map(
      (disciplina) => (
        <tr key={disciplina.codigo}>
          <td
            className={disciplina.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""}
          >
            {disciplina.periodo}
          </td>
          <td
            className={disciplina.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""}
          >
            {disciplina.codigo} - {disciplina.nome}
          </td>
        </tr>
      )
    );

    function TabelaDeDisciplinasASereOferecidas() {
      return (
        <div>
          <h1>
            Disciplinas ainda não oferecidas do
            {
              // Disciplinas do período{" "}
              // {semestre.value === 1 ? "ím" : ""}par ainda não oferecidas
              semestre.value === 1
                ? " período ímpar "
                : semestre.value === 2
                ? " período par "
                : "s períodos "
            }
          </h1>
          <table className="showBasicDataTable">
            <thead>
              <tr>
                <th>Período esperado</th>
                <th>Código - Nome</th>
              </tr>
            </thead>
            <tbody>{visualizacaoDisciplinas}</tbody>
          </table>
        </div>
      );
    }

    function DisciplinasMínimasForamOferecidas() {
      return (
        <div>
          <h1>Todas as disciplinas do período ímpar foram oferecidas</h1>
        </div>
      );
    }

    return (
      <div>
        {DisciplinasAindaNaoOferecidas.length === 0 ? (
          <DisciplinasMínimasForamOferecidas />
        ) : (
          <TabelaDeDisciplinasASereOferecidas />
        )}
      </div>
    );
  }

  function TurmasCard(props) {
    const { lTurmas, setLTurma } = props;
    function TurmasTable() {
      function max(array) {
        return Math.max.apply(null, array);
      }
      return (
        <table className="showBasicDataTable">
          <thead>
            <tr>
              <th>
                <button className="AdicionarHorario" onClick={addTurma}>
                  Nova Turma
                </button>
              </th>
              <th>Código - Nome</th>
              <th>Professor</th>
              <th>Demanda Estimada</th>
              <th colSpan={2}>Horarios</th>
            </tr>
          </thead>
          <tbody>
            {lTurmas.map((currentTurma) => {
              // let conflitosDisciplina = conflictsDisciplinaPeriodo(
              //   lTurmas,
              //   currentTurma
              // );
              let id = currentTurma.id;
              let horarios = currentTurma.horarios;
              return (
                <tr
                  key={`${id}-${currentTurma.codigoDisciplina}-${currentTurma.professor}`}
                >
                  <td>
                    <RemoveTurmaButton
                      turmas={lTurmas}
                      setTurmas={setTurmas}
                      currentTurma={currentTurma}
                    />
                  </td>
                  <td
                    style={
                      {
                        // backgroundColor: coloredConflicts(
                        //   conflitosDisciplina.maxConflito
                        // ),
                      }
                    }
                  >
                    <SelectDisciplina
                      lTurma={currentTurma}
                      setLTurma={setLTurma}
                    />
                  </td>
                  <td>
                    <SelectProfessor
                      lTurma={currentTurma}
                      setLTurma={setLTurma}
                    />
                  </td>
                  <td>
                    <input
                      id={`${id}-${currentTurma.codigoDisciplina}-${currentTurma.professor}`}
                      name="quantity"
                      type="number"
                      min="0"
                      defaultValue={currentTurma.demandaEstimada}
                      // value={currentTurma.demandaEstimada}
                      max="999"
                      style={{ width: "50px" }}
                    ></input>
                  </td>
                  <td>
                    <AdicionarHorario
                      setLTurmas={setTurmas}
                      lTurmas={lTurmas}
                      lTurma={currentTurma}
                    />
                  </td>
                  <td>
                    {horarios.length === 0 ? null : (
                      <table>
                        <thead>
                          <tr key={id * 100}>
                            <th>Remover</th>
                            <th>Sala</th>
                            <th>Dia</th>
                            <th>Hora Início</th>
                            <th>Duração</th>
                          </tr>
                        </thead>
                        <tbody>
                          {horarios.map((horario, index) => {
                            let tempLineTurma = flattenTurma(
                              currentTurma,
                              index
                            );
                            // let conflicts = centralConflicts(
                            //   lTurmas,
                            //   tempLineTurma
                            // );

                            // console.log(
                            //   "Turma",
                            //   currentId,
                            //   "Horario",
                            //   index,
                            //   "Dia:",
                            //   conflicts.professor.dia,
                            //   "Hora:",
                            //   conflicts.professor.hora
                            // );
                            return (
                              <tr
                                key={`${id}-${horario.sala}-${horario.dia}-${horario.horaInicio}-${index}`}
                              >
                                <td>
                                  <RemoveHorarioButton
                                    lTurma={currentTurma}
                                    setLTurma={setLTurma}
                                    indexHorario={index}
                                  />
                                </td>
                                <td>
                                  <SelectSala
                                    lTurma={currentTurma}
                                    setLTurma={setLTurma}
                                    indexHorario={index}
                                  />
                                </td>
                                <td
                                  style={
                                    {
                                      // backgroundColor: coloredConflicts(
                                      //   max([
                                      //     conflicts.professor.dia,
                                      //     conflitosDisciplina.disciplinaPeriodo[
                                      //       index
                                      //     ].nivelConflitoDia,
                                      //   ])
                                      // ),
                                    }
                                  }
                                >
                                  <SelectDia
                                    lTurma={currentTurma}
                                    setLTurma={setLTurma}
                                    indexHorario={index}
                                  />
                                </td>
                                <td
                                  style={
                                    {
                                      // backgroundColor: coloredConflicts(
                                      //   max([
                                      //     conflicts.professor.hora,
                                      //     conflitosDisciplina.disciplinaPeriodo[
                                      //       index
                                      //     ].nivelConflitoHora,
                                      //   ])
                                      // ),
                                    }
                                  }
                                >
                                  <SelectHoraTang
                                    lTurma={currentTurma}
                                    setLTurma={setLTurma}
                                    indexHorario={index}
                                  />
                                </td>
                                <td>
                                  <SelectDuracao
                                    lTurma={currentTurma}
                                    setLTurma={setLTurma}
                                    indexHorario={index}
                                  />
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    )}
                  </td>
                </tr>
              );
            })}
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

    return (
      <div className="infoCard">
        <div className="MultiTurmasTitle">
          <h2>MultiTurmas</h2>
          <SelectAnoSemestre
            ano={ano}
            setAno={setAno}
            semestre={semestre}
            setSemestre={setSemestre}
          />
        </div>
        {turmas.length === 0 ? <SemTurmas /> : <TurmasTable turmas={turmas} />}
        <button className="AdicionarHorario" onClick={addTurma}>
          Nova Turma
        </button>
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <TurmasCard lTurmas={turmas} setLTurma={setTurma} />
      <DisciplinasNaoOferecidas lTurmas={turmas} />
    </div>
  );
}

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */

function TableHeader() {
  return (
    <thead>
      <tr>
        <th>
          <AdicionarTurma addTurma={() => {}} />
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
        <RemoveHorarioButton
          lTurma={lTurma}
          setLTurma={setLTurma}
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
            <AdicionarHorario
              setLTurmas={setLTurma}
              lTurmas={lTurmas}
              lTurma={lTurma}
            />
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
        <RemoveTurmaButton
          turmas={turmas}
          setTurmas={setTurmas}
          currentTurma={lTurma}
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
