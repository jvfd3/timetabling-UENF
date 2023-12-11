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
} from "../components/mySelects";
// import AsyncSelect from "react-select/async";
// import { readData } from "../functions/CRUD_JSONBIN";

function Turmas() {
  let allTurmas = allLocalJsonData.dynamic.turmas;

  const [ano, setAno] = useState(options.constantValues.years[10]);
  const [semestre, setSemestre] = useState(options.constantValues.semesters[1]);

  let turmasFiltradas = allTurmas.filter(
    (turma) => turma.ano === ano.value && turma.semestre === semestre.value
  );

  const [turmas, setTurmas] = useState(turmasFiltradas);
  const [turma, setTurma] = useState(turmas[0]);
  const [currentId, setCurrentId] = useState(turmas.length + 1);

  useEffect(() => {
    let turmasFiltradas = allTurmas.filter(
      (turma) => turma.ano === ano.value && turma.semestre === semestre.value
    );
    setTurmas(turmasFiltradas);
  }, [ano, semestre]);

  function updateTurmas(newTurmaValue) {
    let newTurmas = turmas.map((turma, i) =>
      turma.id === newTurmaValue.id ? newTurmaValue : turmas[i]
    );
    setTurmas(newTurmas);
  }

  useEffect(() => {
    // let message = "It seems that 'turma' have changed, so I will update everything for ya 🫡"
    // console.log(message);
    updateTurmas(turma);
  }, [turma]);

  function addTurma() {
    let newTurma = {
      id: currentId,
      disciplina: {
        codigo: null,
        nome: null,
      },
      professor: null,
      demandaEstimada: 0,
      horarios: [
        {
          sala: null,
          dia: null,
          horaInicio: null,
          duracao: 2,
        },
        {
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
            Disciplinas do período {semestre.value === 1 ? "ím" : ""}par ainda
            não oferecidas
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
              <th>Horarios</th>
            </tr>
          </thead>
          <tbody>
            {lTurmas.map((turma) => {
              let id = turma.id;
              let horarios = turma.horarios;
              return (
                <tr key={`${id}-${turma.disciplina.codigo}-${turma.professor}`}>
                  <td>
                    <button
                      className="TurmaHorarioRemove"
                      key={`${id}-${turma.disciplina.codigo}-${turma.professor}`}
                      onClick={() => removerTurma(id)}
                    >
                      Remover
                    </button>
                  </td>
                  <td>
                    <SelectDisciplina lTurma={turma} setLTurma={setLTurma} />
                  </td>
                  <td>
                    <SelectProfessor lTurma={turma} setLTurma={setLTurma} />
                  </td>
                  <td>
                    <input
                      id={`${id}-${turma.disciplina.codigo}-${turma.professor}`}
                      name="quantity"
                      type="number"
                      min="0"
                      defaultValue={turma.demandaEstimada}
                      // value={turma.demandaEstimada}
                      max="999"
                      style={{ width: "50px" }}
                    ></input>
                  </td>
                  <td>
                    <table>
                      <thead>
                        <tr key={id * 100}>
                          <th>Sala</th>
                          <th>Dia</th>
                          <th>Hora Início</th>
                          <th>Duração</th>
                        </tr>
                      </thead>
                      <tbody>
                        {horarios.map((horario, index) => (
                          <tr
                            key={`${id}-${horario.sala}-${horario.dia}-${horario.horaInicio}-${index}`}
                          >
                            <td>
                              <SelectSala
                                lTurma={turma}
                                setLTurma={setLTurma}
                                indexHorario={index}
                              />
                            </td>
                            <td>
                              <SelectDia
                                lTurma={turma}
                                setLTurma={setLTurma}
                                indexHorario={index}
                              />
                            </td>
                            <td>
                              <SelectHoraTang
                                lTurma={turma}
                                setLTurma={setLTurma}
                                indexHorario={index}
                              />
                            </td>
                            <td>
                              <SelectDuracao
                                lTurma={turma}
                                setLTurma={setLTurma}
                                indexHorario={index}
                              />
                            </td>
                          </tr>
                        ))}
                        {/* <tr
                          key={`${id}-${horario1.sala}-${horario1.dia}-${horario1.horaInicio}-1`}
                        >
                          <td>
                            <SelectSala
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={1}
                            />
                          </td>
                          <td>
                            <SelectDia
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={1}
                            />
                          </td>
                          <td>
                            <SelectHoraTang
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={1}
                            />
                          </td>
                          <td>
                            <SelectDuracao
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={1}
                            />
                          </td>
                        </tr>
                        <tr
                          key={`${id}-${horario2.sala}-${horario2.dia}-${horario2.horaInicio}-2`}
                        >
                          <td>
                            <SelectSala
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={2}
                            />
                          </td>
                          <td>
                            <SelectDia
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={2}
                            />
                          </td>
                          <td>
                            <SelectHoraTang
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={2}
                            />
                          </td>
                          <td>
                            <SelectDuracao
                              lTurma={turma}
                              setLTurma={setLTurma}
                              indexHorario={2}
                            />
                          </td>
                        </tr> */}
                      </tbody>
                    </table>
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
          <div className="GlobalSelects">
            Ano:
            <SelectAno outerAno={ano} setOuterAno={setAno} />
            Semestre:
            <SelectSemestre
              outerSemestre={semestre}
              setOuterSemestre={setSemestre}
            />
          </div>
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
