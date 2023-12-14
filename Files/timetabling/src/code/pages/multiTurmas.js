import "../CSS/multiturmas.css";
import "../CSS/defaultStyle.css";
import options from "../temp/options";
import CRUDPageSelection from "../components/PageSelect";
import React, { useState, useEffect } from "react";

import { allLocalJsonData } from "../../DB/dataFromJSON";
import {
  SelectDisciplina,
  SelectProfessor,
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  SelectSemestre,
  SelectAno,
  SelectAnoSemestre,
} from "../components/mySelects";
import {
  centralConflicts,
  coloredConflicts,
  conflictsDisciplinaPeriodo,
} from "../functions/conflicts/centralConflicts";
import { flattenTurma } from "../functions/conflicts/auxiliarConflictsFunctions";
// import AsyncSelect from "react-select/async";
// import { readData } from "../functions/CRUD_JSONBIN";

function Turmas() {
  let allTurmas = allLocalJsonData.dynamic.turmas;

  // const [ano, setAno] = useState(options.constantValues.years[10]);
  const [ano, setAno] = useState(options.constantValues.years[15]);
  const [semestre, setSemestre] = useState(options.constantValues.semesters[2]);

  let turmasFiltradas = allTurmas.filter(
    (turma) => turma.ano === ano.value && turma.semestre === semestre.value
  );

  const [turmas, setTurmas] = useState(turmasFiltradas);
  const [turma, setTurma] = useState(turmas.length > 0 ? turmas[0] : null);
  const [currentId, setCurrentId] = useState(allTurmas.length + 1);

  useEffect(() => {
    let turmasFiltradas = allTurmas.filter(
      (turma) => turma.ano === ano.value && turma.semestre === semestre.value
    );
    setTurmas(turmasFiltradas);
  }, [ano, semestre]);

  function updateTurmas(newTurmaValue) {
    /* 
      // ERROR
        // Cannot read properties of undefined (reading 'id')
        // TypeError: Cannot read properties of undefined (reading 'id')
        // at Array.map
    */
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

    /* Percorra cada turma em lTurmas e preencha uma lista dos códigos das disciplinas oferecidas pelas turmas */
    let disciplinasOferecidas = lTurmas.map((turma) => turma.disciplina.codigo);
    // console.log(disciplinasOferecidas);

    let TodasDisciplinas = allLocalJsonData.static.infoDisciplinasCC;

    /*
      Listar todas os código-nomes de disciplinas que são de semestre ímpar
        Filtrar todas que são de periodoEsperado%2 == 1
    */
    let DisciplinasDoSemestre = TodasDisciplinas;
    if (semestre.value !== 3) {
      DisciplinasDoSemestre = TodasDisciplinas.filter(
        (disciplina) => disciplina.periodo % 2 === semestre.value % 2
      );
    }

    /*
      Percorrer cada disciplina em DisciplinasDoSemestre e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
    */
    let DisciplinasAindaNaoOferecidas = DisciplinasDoSemestre.filter(
      (disciplina) => {
        return !disciplinasOferecidas.includes(disciplina.codigo);
      }
    );

    let EssasDisciplinas = DisciplinasAindaNaoOferecidas;

    /* Percorra cada disciplina em EssasDisciplinas e as disponha em uma Tabela no formato
      | Período esperado | Código - Nome |
    */
    let visualizacaoDisciplinas = EssasDisciplinas.map((disciplina) => (
      <tr key={disciplina.codigo}>
        {/* Se o período da disciplina for 1, aplicar o className EnfasePrimeiroPeriodo */}
        <td className={disciplina.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""}>
          {disciplina.periodo}
        </td>
        <td className={disciplina.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""}>
          {disciplina.codigo} - {disciplina.nome}
        </td>
      </tr>
    ));

    function TabelaDeDisciplinasASereOferecidas() {
      return (
        <div>
          <h1>
            Disciplinas ainda não oferecidas do
            {semestre.value === 1
              ? " período ímpar "
              : semestre.value === 2
              ? " período par "
              : "s períodos "}
            {/* Disciplinas do período{" "}
            {semestre.value === 1 ? "ím" : ""}par ainda não oferecidas */}
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
        {EssasDisciplinas.length === 0 ? (
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
      function removerTurma(id) {
        let newTurmas = turmas.filter((turma) => turma.id !== id);
        setTurmas(newTurmas);
      }

      function AdicionarHorario(props) {
        const { setLTurmas, lTurma } = props;
        // console.log(lTurma);
        return (
          <button
            className="AdicionarHorario"
            onClick={() => {
              let novosHorarios = [...lTurma.horarios];
              let newId = lTurma.id + "_";
              if (novosHorarios.length === 0) {
                newId += "1";
              } else {
                let ultimoHorario = novosHorarios[novosHorarios.length - 1];
                let lastId = ultimoHorario.id;
                let partes = lastId.split("_");
                let ultimaParte = parseInt(partes[partes.length - 1]);
                let resultado = ultimaParte + 1;
                // console.log("novosHorarios", novosHorarios[novosHorarios.length-1])
                newId += resultado;
              }
              // console.log("newId", newId)
              let newHorario = {
                id: newId,
                sala: null,
                dia: null,
                horaInicio: null,
                duracao: 2,
              };
              novosHorarios.push(newHorario);
              let novaTurma = {
                ...lTurma,
                horarios: novosHorarios,
              };

              // Encontre o índice da turma que você deseja atualizar
              const index = lTurmas.findIndex(
                (turma) => turma.id === lTurma.id
              );

              // Crie uma cópia da lista de turmas
              let novasTurmas = [...lTurmas];

              // Remova a turma antiga e insira a nova turma na mesma posição
              novasTurmas.splice(index, 1, novaTurma);

              // Atualize o estado da lista de turmas
              setLTurmas(novasTurmas);
            }}
          >
            Novo Horário
          </button>
        );
      }

      function RemoveHorario(props) {
        const { lTurma, setLTurma, indexHorario } = props;
        let horarios = lTurma.horarios;
        return (
          <button
            className="currentTurmaHorarioRemove"
            onClick={() => {
              let novosHorarios = [...horarios];
              novosHorarios.splice(indexHorario, 1);
              let novaTurma = {
                ...lTurma,
                horarios: novosHorarios,
              };
              setLTurma(novaTurma);
            }}
          >
            Remover Horário
          </button>
        );
      }
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
              let conflitosDisciplina = conflictsDisciplinaPeriodo(
                lTurmas,
                currentTurma
              );
              let id = currentTurma.id;
              let horarios = currentTurma.horarios;
              return (
                <tr
                  key={`${id}-${currentTurma.disciplina.codigo}-${currentTurma.professor}`}
                >
                  <td>
                    <button
                      className="TurmaHorarioRemove"
                      key={`${id}-${currentTurma.disciplina.codigo}-${currentTurma.professor}`}
                      onClick={() => removerTurma(id)}
                    >
                      Remover Turma
                    </button>
                  </td>
                  <td
                    style={{
                      backgroundColor: coloredConflicts(
                        conflitosDisciplina.maxConflito
                      ),
                    }}
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
                      id={`${id}-${currentTurma.disciplina.codigo}-${currentTurma.professor}`}
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
                            let conflicts = centralConflicts(
                              lTurmas,
                              tempLineTurma
                            );

                            /* console.log(
                              "Turma",
                              currentId,
                              "Horario",
                              index,
                              "Dia:",
                              conflicts.professor.dia,
                              "Hora:",
                              conflicts.professor.hora
                            ); */
                            return (
                              <tr
                                key={`${id}-${horario.sala}-${horario.dia}-${horario.horaInicio}-${index}`}
                              >
                                <td>
                                  <RemoveHorario
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
                                  style={{
                                    backgroundColor: coloredConflicts(
                                      max([
                                        conflicts.professor.dia,
                                        conflitosDisciplina.disciplinaPeriodo[
                                          index
                                        ].nivelConflitoDia,
                                      ])
                                    ),
                                  }}
                                >
                                  <SelectDia
                                    lTurma={currentTurma}
                                    setLTurma={setLTurma}
                                    indexHorario={index}
                                  />
                                </td>
                                <td
                                  style={{
                                    backgroundColor: coloredConflicts(
                                      max([
                                        conflicts.professor.hora,
                                        conflitosDisciplina.disciplinaPeriodo[
                                          index
                                        ].nivelConflitoHora,
                                      ])
                                    ),
                                  }}
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
