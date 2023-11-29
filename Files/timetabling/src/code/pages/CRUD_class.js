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

const CRUDParticipants = () => {
  return (
    <div className="participants-container">
      <div className="participants-title">
        <div className="participants-number">{options.students}</div>
        <div className="participants-icon">
          {/* Something went wrong here */}
          <img
            className="participants-icon"
            src={assets.icons.students}
            alt=""
          />
        </div>
      </div>
      <div className="participants-list">
        <ul>
          {options.students.map((student) => (
            <li key={student.value}>
              <p className="participants-participant">
                {student.value}: {student.label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Timeperiod = (props) => {
  const { horarioTP, sethorariosTP } = props;
  // console.log("Timeperiod>horarioTP", horarioTP);
  const [horario, setHorario] = useState({ ...horarioTP });

  const [horaInicio, setHoraInicio] = useState(
    options.hours.find((hour) => hour.value === horario.horaInicio)
  );
  // const [duracao, setDuracao] = useState(convertToValueLabel(horario.duracao));
  // const [dia, setDia] = useState(convertToValueLabel(horario.dia));
  // const [sala, setSala] = useState(convertToValueLabel(horario.dia));
  // console.log(horaInicio);
  return (
    <div className="CRUD-timeperiod-properties">
      <div className="CRUD-timeperiod-property">
        Hora de início
        <Select
          placeholder="Hora início"
          options={options.hours}
          value={horaInicio}
          onChange={setHoraInicio}
          formatOptionLabel={({ value, label }) => `${value} (${label})`}
        />
      </div>
      {/*       <div className="CRUD-timeperiod-property">
        Tempo de duração
        <Select placeholder="Duração" options={options.durations} />
      </div>
      <div className="CRUD-timeperiod-property">
        Dia
        <Select placeholder="Dia" options={options.days} />
      </div>
      <div className="CRUD-timeperiod-property">
        Sala
        <Select placeholder="Sala" options={options.rooms} />
      </div> */}
    </div>
  );
};

function TimePeriods(props) {
  const { horariosTPs, setHorariosTPs } = props;
  console.log("TimePeriods>horariosTPs", horariosTPs[0]);
  return (
    <div className="CRUD-Class-properties-timeperiods">
      <p className="CRUD-Class-properties-timeperiods-title">
        Períodos de horários
      </p>
      <Timeperiod horarioTP={horariosTPs[0]} sethorariosTP={setHorariosTPs} />
      <Timeperiod horarioTP={horariosTPs[1]} sethorariosTP={setHorariosTPs} />
      <img
        className="CRUD-Class-properties-NewTimePeriod-icon"
        src={assets.icons.add}
        alt=""
      />
    </div>
  );
}

function convertToValueLabel(newValue) {
  return { value: newValue, label: newValue };
}

// let DBdisciplinas = await readData(options.JBVars.bins.infoDisciplinasCC);
let DBdisciplinas = allLocalJsonData.static.infoDisciplinasCC;

function SelectDisciplina(props) {
  const { disciplinaSD, setDisciplinaSD } = props;
  // const [disciplina, setDisciplina] = useState(DBdisciplinas);
  return (
    <div>
      <Select
        isMulti={false}
        isClearable={false}
        isSearchable={true}
        options={disciplinaSD}
        value={disciplinaSD}
        onChange={setDisciplinaSD}
        placeholder="Disciplinas"
        className="SelectDisciplinas"
        getOptionLabel={(option) => option.nome}
        getOptionValue={(option) => option.codigo}
        formatOptionLabel={({ codigo, nome }) => `${codigo}: ${nome}`}
      />
    </div>
  );
}

function SelecaoDeTurma() {
  /* 2. Select de Ano
   1. State de ano
   2. Filtra todas as turmas para apenas mostrar as turmas daquele ano */

  const [turmas, setTurmas] = useState(allLocalJsonData.dynamic.turmasTeste);
  const [turma, setTurma] = useState(turmas[0]);
  const [ano, setAno] = useState(convertToValueLabel(turma.ano));
  const [semestre, setSemestre] = useState(convertToValueLabel(turma.semestre));
  const [professor, setProfessor] = useState(
    convertToValueLabel(turma.professor)
  );
  const [disciplina, setDisciplina] = useState(turma.disciplina);

  const [horarios, setHorarios] = useState(turma.horarios);

  function updateTurma(newTurmaValue) {
    setTurma(newTurmaValue);
    setAno(convertToValueLabel(newTurmaValue.ano));
    setSemestre(convertToValueLabel(newTurmaValue.semestre));
    setDisciplina({
      codigo: newTurmaValue.disciplina.codigo,
      nome: newTurmaValue.disciplina.nome,
    });
    setProfessor(convertToValueLabel(newTurmaValue.professor));
    setHorarios(newTurmaValue.horarios);
    console.log("SelecaoTurma>updateTurma>turma.horarios", turma.horarios[0]);
    console.log("SelecaoTurma>updateTurma>horarios", horarios[0]);
    console.log(
      "SelecaoTurma>updateTurma>newTurmaValue.horarios",
      newTurmaValue.horarios[0]
    );
  }

  // console.log(turma);
  return (
    <div style={{ color: "#000000" }}>
      <div>
        <Select
          placeholder="Turma"
          options={turmas}
          value={turma}
          onChange={(newTurma) => {
            updateTurma(newTurma);
          }}
          getOptionLabel={(turma) => turma.disciplina.codigo}
          getOptionValue={(turma) => turma.professor}
          formatOptionLabel={(turma) =>
            `${turma.ano}.${turma.semestre} - ${turma.disciplina.codigo} - ${turma.professor}`
          }
        />
        <div style={{ display: "flex", color: "#000000" }}>
          <Select
            placeholder="Ano"
            options={options.years}
            value={ano}
            onChange={(newValue) => setAno(newValue)}
          />
          <Select
            placeholder="Semestre"
            options={options.semesters}
            value={semestre}
            onChange={(newValue) => setSemestre(newValue)}
          />
        </div>
        <SelectDisciplina
          disciplinaSD={disciplina}
          setDisciplinaSd={setDisciplina}
        />
        {/* <Select placeholder="Disciplinas" /> */}
        <Select
          placeholder="Professor"
          value={professor}
          onChange={(newValue) => setProfessor(newValue)}
          options={options.professors}
        />
      </div>
      <div className="CRUD-Class-properties-timeperiods">
        <p className="CRUD-Class-properties-timeperiods-title">
          Períodos de horários
        </p>
        <Timeperiod horarioTP={horarios[0]} sethorariosTP={setHorarios} />
        <Timeperiod horarioTP={horarios[1]} sethorariosTP={setHorarios} />
        <img
          className="CRUD-Class-properties-NewTimePeriod-icon"
          src={assets.icons.add}
          alt=""
        />
      </div>
    </div>
  );
}

function DadosTurma(props) {
  const { turma2, setTurma2 } = props;
  let infoProfessores = allLocalJsonData.static.infoProfessores;
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
                getOptionLabel={(option) => option.nome}
                getOptionValue={(option) => option.codigo}
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
                getOptionValue={(option) => option.nome}
                getOptionLabel={(option) => option.laboratorio}
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
      sala: "XXX",
      dia: "XXX",
      horaInicio: 123,
      duracao: 123,
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
          {turma1.horarios.map((horario, i) => {
            return (
              <tr key={i}>
                <td>{horario.horaInicio}</td>
                <td>{horario.duracao}</td>
                <td>{horario.dia}</td>
                <td>{horario.sala}</td>
                <td>
                  <button key={i} onClick={() => removerHorario(i)}>
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
  );
}

function CRUDclass() {
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.crud_turmas} />
      <div className="CRUD-lateral">
        <div className="CRUD-contain-components">
          <Turmas />
        </div>
      </div>
    </div>
  );
}

export default CRUDclass;
