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
        <div className="participants-number">{options.students.length}</div>
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
  console.log("Timeperiod>horarioTP", horarioTP);
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
  const [disciplinas, setDisciplinas] = useState(DBdisciplinas);
  return (
    <div>
      <Select
        isMulti={false}
        value={disciplinaSD}
        isClearable={false}
        isSearchable={true}
        options={disciplinas}
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
  const [disciplina, setDisciplina] = useState({
    codigo: turma.disciplina.codigo,
    nome: turma.disciplina.nome,
  });

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
          formatOptionLabel={(turma, { context }) =>
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
      <TimePeriods horariosTPs={horarios} setHorariosTPs={setHorarios} />
    </div>
  );
}

function CRUDclass() {
  return (
    <div className="background">
      {/* <CRUDPageSelection defaultValue={options.CRUD.crud_turmas} /> */}
      <div className="CRUD-lateral">
        <div className="CRUD-contain-components">
          <div className="CRUD-Class-properties">
            <SelecaoDeTurma />
          </div>
          {/* <img className="placeholder-image" src={assets.class} alt="Logo" /> */}
        </div>
        {/* <CRUDParticipants /> */}
      </div>
    </div>
  );
}

// export default CRUDclass;
