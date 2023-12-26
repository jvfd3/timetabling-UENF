import React, { useState, useEffect } from "react";
import Select from "react-select";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { allLocalJsonData } from "../../../DB/local/dataFromJSON";
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
import "./turmas.css";
import {
  getFullHorarios,
  splittedToUnified2,
} from "../../../helpers/auxFunctions";
import {
  adicionarHorario,
  removerHorario,
} from "../../../helpers/hourclassMagic";
import {
  DumbAddHora,
  DumbRemoveHora,
} from "../../../components/Buttons/CRUDTurmas/CRUDTurmas";
// import { scrollThroughTurmas } from "../functions/firulas/minhasFirulas";
// import AsyncSelect from "react-select/async";
// import { readData } from "../functions/CRUD_JSONBIN";

function Turmas2() {
  let allTurmas = getFullHorarios();
  const [turmas, setTurmas] = useState(allTurmas);
  const [turma, setTurma] = useState(turmas[0]);

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

  function TurmaSelection() {
    return (
      <div
        className="SelectionBar"
        onWheel={(event) => {
          // let itemStates = [turmas, setTurma, turma];
          // scrollThroughTurmas(event, itemStates);
        }}
      >
        <Select
          className="itemSelectionBar"
          options={turmas}
          value={turma}
          onChange={setTurma}
          getOptionLabel={(turma) => turma.codigoDisciplina}
          getOptionValue={(turma) => turma.professor}
          formatOptionLabel={(turma) =>
            `(id${turma.id}) ${turma.ano}.${turma.semestre} - ${turma.codigoDisciplina} - ${turma.professor}`
          }
        />
      </div>
    );
  }

  function TurmaCard(props) {
    const { turma, setTurma } = props;

    function DadosTurma(props) {
      const { turma2, setTurma2 } = props;

      return (
        <div className="showBasicDataCard">
          <h3>INFORMAÇÕES DA TURMA</h3>
          <table className="showBasicDataTable">
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <strong>Ano/Semestre</strong>
                </td>
                <td>
                  <div className="SelectAnoSemestre">
                    <SelectAnoTurma lTurma={turma2} setLTurma={setTurma2} />
                    <SelectSemestreTurma
                      lTurma={turma2}
                      setLTurma={setTurma2}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Disciplina</strong>
                </td>
                <td>
                  <SelectDisciplina lTurma={turma2} setLTurma={setTurma2} />
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Professor</strong>
                </td>
                <td>
                  <SelectProfessor lTurma={turma2} setLTurma={setTurma2} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    function HorariosTurma(props) {
      const { turma1, setTurma1 } = props;

      function removerHorario(id) {
        let newTurma = { ...turma1 };
        let newHorarios = [...newTurma.horarios];
        newHorarios.splice(id, 1);
        newTurma.horarios = newHorarios;
        setTurma1(newTurma);
      }

      function adicionarHorario() {
        let newTurma = { ...turma1 };
        let newHorarios = [...newTurma.horarios];
        newHorarios.push({
          sala: null,
          dia: null,
          horaInicio: null,
          duracao: 2,
        });

        newTurma.horarios = newHorarios;
        setTurma1(newTurma);
      }

      return (
        <div className="showBasicDataCard">
          <h3>Horários</h3>
          <table className="showBasicDataTable">
            <thead>
              <tr>
                <th>
                  <button
                    className="AdicionarHorario"
                    onClick={() => adicionarHorario()}
                  >
                    Adicionar
                  </button>
                </th>
                <th>Dia</th>
                <th>Hora de início</th>
                <th>Duração</th>
                <th>Sala</th>
              </tr>
            </thead>
            <tbody>
              {turma1.horarios.map((horario, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <button
                        className="TurmaHorarioRemove"
                        key={index}
                        onClick={() => removerHorario(index)}
                      >
                        Remover
                      </button>
                    </td>
                    <td>
                      <SelectDia
                        lTurma={turma1}
                        setLTurma={setTurma1}
                        indexHorario={index}
                      />
                    </td>
                    <td>
                      <SelectHoraTang
                        lTurma={turma1}
                        setLTurma={setTurma1}
                        indexHorario={index}
                      />
                    </td>
                    <td>
                      <SelectDuracao
                        lTurma={turma1}
                        setLTurma={setTurma1}
                        indexHorario={index}
                      />
                    </td>
                    <td className="">
                      <SelectSala
                        lTurma={turma1}
                        setLTurma={setTurma1}
                        indexHorario={index}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    }

    function Participants(props) {
      const { turma3 } = props;

      // const [participants, setParticipants] = useState([]);

      let andamentoAlunos = allLocalJsonData.dynamic.andamentoAlunos;
      const [numero, setNumero] = useState(0);

      const handleInputChange = (event) => {
        setNumero(Number(event.target.value));
      };

      function getCurrentSubjectsPerStudent(alunos) {
        /*  Explicação dessa função
    Essa função é muito confusa, o copilot que fez então vou explicar
    Essa vai ser a variável final retornada. Primeiro ele pega todas as chaves/matrículas dos alunos e faz um reduce
    O reduce vai iterar por todas as matrículas usando um acumulados (acc)
    primeiro ele pega a lista de disciplinas que o aluno está cursando
    depois ele itera por todas essas disciplinas
    se a disciplina não for uma chave no acc, significa que ela ainda não foi processada, então ele cria uma chave para ela
    depois ele adiciona a matrícula do aluno na lista da disciplina da iteração atual
    Ele faz isso para todas as disciplinas do aluno atual (forEach) depois ele vai volta pra iteração anterior (reduce)
    e faz isso para todos os alunos
    no final ele retorna o acc que é um objeto com as disciplinas como chave e uma lista de matrículas como valor
    O "{}" no final é o valor inicial do acc, que é um objeto vazio. Ele faz parte do reduce.
    */
        let currentSubjectsPerStudent = Object.keys(alunos).reduce(
          (acc, studentId) => {
            let currentSubjects = alunos[studentId].cursando;
            currentSubjects.forEach((subject) => {
              if (!acc[subject]) {
                acc[subject] = [];
              }
              acc[subject].push(studentId);
            });
            return acc;
          },
          {}
        );
        return currentSubjectsPerStudent;
      }

      function getStudentsFromSubject(
        subjectCode,
        disciplinasCursadasPorAlunos
      ) {
        let isUndefined =
          disciplinasCursadasPorAlunos[subjectCode] === undefined;
        if (isUndefined) {
          disciplinasCursadasPorAlunos[subjectCode] = [];
        }
        let alunosDessaDisciplina = disciplinasCursadasPorAlunos[subjectCode];
        return alunosDessaDisciplina;
      }

      function getInfoAlunos() {
        // let infoAlunos = allLocalJsonData.static.infoAlunos;
        let infoAlunos = allLocalJsonData.SQL.alunos;
        return infoAlunos;
      }

      function mixStudentsAndInfo(students, info) {
        let mixed = students.map((student) => {
          let studentInfo = info.find((info) => info.matricula === student);
          return studentInfo;
        });
        return mixed;
      }

      let alunosDessaDisciplina = getStudentsFromSubject(
        turma3.codigoDisciplina,
        getCurrentSubjectsPerStudent(andamentoAlunos)
      );

      let infoAlunos = getInfoAlunos();

      let fullStudentsList = mixStudentsAndInfo(
        alunosDessaDisciplina,
        infoAlunos
      );
      //Confirmando que a lista está ordenada por matrícula (veteranos primeiro)
      fullStudentsList.sort((a, b) => a.matricula - b.matricula);

      return (
        <div className="showBasicDataCard">
          <h2>Número de participantes</h2>
          <table className="showBasicDataTable">
            <thead></thead>
            <tbody>
              <tr>
                <th>Demanda de aprovados</th>
                <td>123</td>
              </tr>
              <tr>
                <th>Demanda de reprovados</th>
                <td>321</td>
              </tr>
              <tr>
                <th>Demanda estimada</th>
                <td>
                  <input
                    className="inputNumeroParticipantes"
                    type="number"
                    value={numero}
                    onChange={handleInputChange}
                    maxLength="3"
                  />
                </td>
              </tr>
              <tr>
                <th>Inscritos</th>
                <td>{alunosDessaDisciplina.length}</td>
              </tr>
            </tbody>
          </table>
          <h3>Lista de participantes</h3>
          <table className="showBasicDataTable">
            <thead>
              <tr>
                <th>Curso</th>
                {/* <th>Ano</th> */}
                <th>Matrícula</th>
                <th>Nome</th>
              </tr>
            </thead>
            <tbody>
              {fullStudentsList.map((student) => (
                <tr key={student.matricula}>
                  <td>
                    {student.curso === "Ciência da Computação"
                      ? "CC"
                      : student.curso}
                  </td>
                  {/* <td>{student.anoEntrada}</td> */}
                  <td>{student.matricula}</td>
                  <td>{student.nome}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="infoCard">
        <DadosTurma turma2={turma} setTurma2={setTurma} />
        <HorariosTurma turma1={turma} setTurma1={setTurma} />
        <Participants turma3={turma} />
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection />
      <TurmaCard turma={turma} setTurma={setTurma} />
    </div>
  );
}

function Turmas() {
  let allTurmas = getFullHorarios();
  let unifiedHorarios = splittedToUnified2(allTurmas);
  const [turmas, setTurmas] = useState(unifiedHorarios);
  const [turma, setTurma] = useState(turmas[0]);

  let myTurmaStates = { turmas, setTurmas, turma, setTurma };

  function TurmaSelection(myTurmaStates) {
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

  function DadosTurma({ turma, setTurma }) {
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

  function HorariosTurma({ turma, setTurma }) {
    let quantidadeHorarios = turma.horarios.length;

    function HorariosTable({ turma, setTurma }) {
      return (
        <table className="showBasicDataTable">
          <thead>
            <tr>
              <th>
                <DumbAddHora
                  addHourFunction={adicionarHorario}
                  turma={turma}
                  setTurma={setTurma}
                />
              </th>
              <th>Dia</th>
              <th>Hora de início</th>
              <th>Duração</th>
              <th>Sala</th>
            </tr>
          </thead>
          <tbody>
            {turma.horarios.map((horario, index) => {
              return (
                <tr key={`Linha Horário: ${horario.idHorario}-${index}`}>
                  <td>
                    <DumbRemoveHora
                      removeHourFunction={removerHorario}
                      turma={turma}
                      setTurma={setTurma}
                      horaIndex={index}
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
                  <td>
                    <SelectSala
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

    return (
      <div className="showBasicDataCard">
        <h3>
          {quantidadeHorarios > 0 ? "" : "Sem "}
          Horários
        </h3>
        {quantidadeHorarios > 0 ? (
          <HorariosTable turma={turma} setTurma={setTurma} />
        ) : (
          <DumbAddHora
            addHourFunction={adicionarHorario}
            turma={turma}
            setTurma={setTurma}
          />
        )}
      </div>
    );
  }

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...myTurmaStates} />
      <div className="infoCard">
        <DadosTurma {...myTurmaStates} />
        <HorariosTurma {...myTurmaStates} />
        {/* <Participants {...myTurmaStates} /> */}
      </div>
    </div>
  );
}

function CRUDclass() {
  let defaultPageValue = options.constantValues.pageSelection.turmas;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Turmas />
    </div>
  );
}

export default CRUDclass;
