import "../CSS/CRUD_class.css";
import "../CSS/defaultStyle.css";
import "../CSS/participantList.css";
import options from "../temp/options";
import assets from "../../assets/imagesImport";
import CRUDPageSelection from "../components/PageSelect";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import AsyncSelect from "react-select/async";
import { readData } from "../functions/CRUD_JSONBIN";

const CRUDParticipants = (props) => {
  const { turma3 } = props;

  // const [participants, setParticipants] = useState([]);

  let andamentoAlunos = allLocalJsonData.dynamic.andamentoAlunos;
  console.log(andamentoAlunos);

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
    console.log(currentSubjectsPerStudent);
    return currentSubjectsPerStudent;
  }

  let converted = getCurrentSubjectsPerStudent(andamentoAlunos);
  console.log(converted);

  return (
    <div className="participants-container">
      <div className="participants-title">
        <div className="participants-number"></div>
        <div className="participants-icon">
          {/* Something went wrong here */}
          {/* <img
            className="participants-icon"
            src={assets.icons.students}
            alt=""
          /> */}
        </div>
      </div>
      <div className="participants-list">
        <ul>
          {/* {options.students.map((student) => (
            <li key={student.value}>
              <p className="participants-participant">
                {student.value}: {student.label}
              </p>
            </li>
          ))} */}
        </ul>
      </div>
    </div>
  );
};

function DadosTurma(props) {
  const { turma2, setTurma2 } = props;
  let infoProfessores = allLocalJsonData.static.infoProfessores;
  // let DBdisciplinas = await readData(options.JBVars.bins.infoDisciplinasCC);
  let DBdisciplinas = allLocalJsonData.static.infoDisciplinasCC;
  return (
    <div>
      <h2>Dados</h2>
      <table>
        <thead></thead>
        <tbody>
          <tr>
            <td>
              <strong>Ano/Semestre</strong>
            </td>
            <td>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <Select
                  placeholder="Ano"
                  options={options.years}
                  value={{ value: turma2.ano, label: turma2.ano }}
                  onChange={(newValue) => {
                    setTurma2({ ...turma2, ano: newValue.value });
                  }}
                />
                <Select
                  placeholder="Semestre"
                  options={options.semesters}
                  value={{ value: turma2.semestre, label: turma2.semestre }}
                  onChange={(newValue) => {
                    setTurma2({ ...turma2, semestre: newValue.value });
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <strong>Disciplina</strong>
            </td>
            <td>
              <Select
                placeholder="Disciplinas"
                options={DBdisciplinas}
                value={turma2.disciplina}
                onChange={(newValue) => {
                  setTurma2({ ...turma2, disciplina: newValue });
                }}
                getOptionLabel={(optionDiscip) => optionDiscip.nome}
                getOptionValue={(optionDiscip) => optionDiscip.codigo}
                formatOptionLabel={({ codigo, nome }) => `${codigo}: ${nome}`}
              />
            </td>
          </tr>
          <tr>
            <td>
              <strong>Professor</strong>
            </td>
            <td>
              <Select
                placeholder="Professor"
                options={infoProfessores}
                value={infoProfessores.find(
                  (professor) => professor.nome === turma2.professor
                )}
                getOptionValue={(optionProf) => optionProf.nome}
                getOptionLabel={(optionProf) => optionProf.laboratorio}
                onChange={(newValue) => {
                  setTurma2({ ...turma2, professor: newValue.nome });
                }}
                formatOptionLabel={({ nome, laboratorio }) =>
                  `(${laboratorio}) ${nome}`
                }
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function HorariosTurma(props) {
  const { turma1, setTurma1 } = props;
  let infoSalas = allLocalJsonData.static.infoSalas;

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
      duracao: null,
    });

    newTurma.horarios = newHorarios;
    setTurma1(newTurma);
    // Denser: (that is actually less dense) Faster? Well, I don't care for it now.
    /* setTurma1({
      ...turma1,
      horarios: [
        ...turma1.horarios,
        {
          sala: "XXX",
          dia: "XXX",
          horaInicio: 123,
          duracao: 123,
        },
      ],
    }); */
  }

  function changeThisHorario(id, newHorarioInicio) {
    let newTurma = { ...turma1 };
    let newHorarios = [...newTurma.horarios];
    newHorarios[id] = {
      ...newHorarios[id],
      horaInicio: newHorarioInicio.value,
    };
    newTurma.horarios = newHorarios;
    setTurma1(newTurma);
  }

  return (
    <div>
      <h2>
        Horários
        <button onClick={() => adicionarHorario()}>Adicionar</button>
      </h2>
      <table>
        <thead>
          <tr>
            <th>Hora de início</th>
            <th>Duração</th>
            <th>Dia</th>
            <th>Sala</th>
          </tr>
        </thead>
        <tbody>
          {turma1.horarios.map((horario, id) => {
            return (
              <tr key={id}>
                <td>
                  <Select
                    placeholder="Hora início"
                    options={options.hours}
                    value={options.hours.find(
                      (hour) => hour.value === horario.horaInicio
                    )}
                    onChange={(newValue) => {
                      changeThisHorario(id, newValue);
                    }}
                    formatOptionLabel={({ value, label }, { context }) => {
                      return context === "value"
                        ? `${value}`
                        : `(${label}) ${value}`;
                    }}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Duração"
                    options={options.durations}
                    value={options.durations.find(
                      (duration) => duration.value === horario.duracao
                    )}
                    onChange={(newDuracao) => {
                      let newTurma = { ...turma1 };
                      let newHorarios = [...newTurma.horarios];
                      newHorarios[id] = {
                        ...newHorarios[id],
                        duracao: newDuracao.value,
                      };
                      newTurma.horarios = newHorarios;
                      setTurma1(newTurma);
                    }}
                    formatOptionLabel={({ value, label }, { context }) => {
                      return context === "value"
                        ? `${value}`
                        : `(${label}) ${value}`;
                    }}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Dia"
                    options={options.days}
                    value={options.days.find(
                      (day) => day.value === horario.dia
                    )}
                    onChange={(newDia) => {
                      let newTurma = { ...turma1 };
                      let newHorarios = [...newTurma.horarios];
                      newHorarios[id] = {
                        ...newHorarios[id],
                        dia: newDia.value,
                      };
                      newTurma.horarios = newHorarios;
                      setTurma1(newTurma);
                    }}
                    formatOptionLabel={({ value, label }, { context }) => {
                      return context === "value" ? `${value}` : `${label}`;
                    }}
                  />
                </td>
                <td>
                  <Select
                    placeholder="Sala"
                    options={infoSalas}
                    value={infoSalas.find(
                      (sala) => sala.blocoSala === horario.sala
                    )}
                    onChange={(newSala) => {
                      let newTurma = { ...turma1 };
                      let newHorarios = [...newTurma.horarios];
                      newHorarios[id] = {
                        ...newHorarios[id],
                        sala: newSala.blocoSala,
                      };
                      newTurma.horarios = newHorarios;
                      setTurma1(newTurma);
                    }}
                    getOptionValue={(optionSala) => optionSala.blocoSala}
                    getOptionLabel={(optionSala) => optionSala.capacidade}
                    formatOptionLabel={({ blocoSala, capacidade }) =>
                      `(${capacidade}) ${blocoSala}`
                    }
                  />
                </td>
                <td>
                  <button key={id} onClick={() => removerHorario(id)}>
                    Remover
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Turmas() {
  let allTurmas = allLocalJsonData.dynamic.turmasTeste;
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

  return (
    <div className="CRUD-Class-TurmaPeriodo">
      <div className="CRUD-Class-properties" style={{ color: "black" }}>
        <Select
          placeholder="Turma"
          options={turmas}
          value={turma}
          onChange={setTurma}
          getOptionLabel={(turma) => turma.disciplina.codigo}
          getOptionValue={(turma) => turma.professor}
          formatOptionLabel={(turma) =>
            `(id${turma.id}) ${turma.ano}.${turma.semestre} - ${turma.disciplina.codigo} - ${turma.professor}`
          }
        />
        <DadosTurma turma2={turma} setTurma2={setTurma} />
        <HorariosTurma turma1={turma} setTurma1={setTurma} />
      </div>
      <CRUDParticipants turma3={turma} />
    </div>
  );
}

function CRUDclass() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.crud_turmas} />
      <div className="CRUD-lateral">
        <Turmas />
      </div>
    </div>
  );
}

export default CRUDclass;
