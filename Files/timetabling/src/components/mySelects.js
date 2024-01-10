import "./mySelects.css";
import React, { useEffect, useState } from "react";
import options from "../DB/local/options";
import { allLocalJsonData } from "../DB/local/dataFromJSON";
import Select, { components } from "react-select";
import CreatableSelect from "react-select/creatable";
import { updateProfessorFromList } from "../helpers/auxFunctions";
import { LockedProp, UnlockedProp } from "./Buttons/Dumb/Dumb";

let styleWidthFix = options.SelectStyles.fullItem;

/* Internal-use Selects \/ */

function LockableSelect(extProps) {
  const {
    placeholder,
    options,
    value,
    onChange,
    getOptionValue,
    getOptionLabel,
    formatOptionLabel,
    lockStates,
  } = extProps;

  let { isLocked, setIsLocked, title } = lockStates;

  function LockSelect() {
    function toggleLock() {
      setIsLocked(!isLocked);
    }

    return (
      <div
        onClick={toggleLock}
        style={{
          pointerEvents: "auto",
          color: isLocked ? "black" : "#708090",
          cursor: "pointer",
        }}
      >
        {isLocked ? <LockedProp text={title} /> : <UnlockedProp text={title} />}
      </div>
    );
  }

  function ValueWithLock(props) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <LockSelect {...lockStates} />
        <components.ValueContainer {...props} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        className="mySelectList"
        styles={styleWidthFix}
        isDisabled={isLocked}
        isClearable={true}
        components={{ ValueContainer: ValueWithLock }}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
}

function DefaultSelect(defaultProps) {
  const {
    placeHolderText,
    isClearable,
    options,
    setOuterValue,
    value,
    findCorrectObject,
    customProps,
  } = defaultProps;

  const [currentValue, setCurrentValue] = useState(value);

  function updateOuterValue(newValue) {
    setCurrentValue(newValue);
    setOuterValue(newValue);
  }

  useEffect(() => {
    let correnctObject = findCorrectObject(value);
    // console.log(correnctObject);
    setCurrentValue(correnctObject);
  }, [value]);

  return (
    <Select
      placeholder={placeHolderText}
      isClearable={isClearable}
      options={options}
      onChange={updateOuterValue}
      value={currentValue}
      {...customProps}
      className="mySelectList"
      styles={styleWidthFix}
    />
  );
}

function SelectYear({ outerYear, setOuterYear }) {
  let years = options.constantValues.years;

  function findYearObject(year) {
    let yearObject = options.constantValues.years.find(
      (iterYear) => iterYear.value == year
    );
    return yearObject;
  }

  return (
    <DefaultSelect
      placeHolderText="Ano"
      isClearable={false}
      options={years}
      setOuterValue={setOuterYear}
      findCorrectObject={findYearObject}
      value={outerYear}
    />
  );
}

function SelectCourse({ outerCourse, setOuterCourse }) {
  let courses = options.constantValues.courses;

  function findCourseObject(course) {
    let courseObject = options.constantValues.courses.find(
      (iterCourse) => iterCourse.nome == course
    );
    return courseObject;
  }

  let customProps = {
    getOptionLabel: ({ nome, apelido }) => `${nome} - ${apelido}`,
    getOptionValue: ({ nome, apelido }) => `${nome} - ${apelido}`,
    formatOptionLabel: ({ nome, apelido }, { context }) => {
      return context === "value" ? `${apelido}` : `${nome}`;
    },
  };

  return (
    <DefaultSelect
      placeHolderText="Curso"
      isClearable={false}
      options={courses}
      setOuterValue={setOuterCourse}
      findCorrectObject={findCourseObject}
      value={outerCourse}
      customProps={customProps}
    />
  );
}

/* \/ \/ \/ \/ \/ \/ \/ \/ MULTITURMAS \/ \/ \/ \/ \/ \/ \/ \/ */

function SelectAno({ outerAno, setOuterAno }) {
  let anos = options.constantValues.years;

  let anoSelecionado = anos.find(
    (ano) => ano.value === parseInt(outerAno.value)
  );

  const [ano, setAno] = useState(anoSelecionado);

  function updateOuterValue(novoAno) {
    setOuterAno(novoAno);
    setAno(novoAno);
  }

  return (
    <Select
      onChange={updateOuterValue}
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={false}
      placeholder="Ano"
      options={anos}
      value={ano}
    />
  );
}

function SelectSemestre({ outerSemestre, setOuterSemestre }) {
  let semestres = options.constantValues.semesters;

  let semestreSelecionado = semestres.find(
    (semestre) => semestre.value === parseInt(outerSemestre.value)
  );

  const [semestre, setSemestre] = useState(semestreSelecionado);

  function updateOuterValue(novoSemestre) {
    setOuterSemestre(novoSemestre);
    setSemestre(novoSemestre);
  }

  return (
    <Select
      onChange={updateOuterValue}
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={false}
      placeholder="Semestre"
      options={semestres}
      value={semestre}
    />
  );
}

function SelectAnoSemestre({ ano, setAno, semestre, setSemestre }) {
  return (
    <div className="GlobalSelects">
      Ano:
      <SelectAno outerAno={ano} setOuterAno={setAno} />
      Semestre:
      <SelectSemestre outerSemestre={semestre} setOuterSemestre={setSemestre} />
    </div>
  );
}

function SelectDisciplina({ lTurma, setLTurma }) {
  const [disciplina, setDisciplina] = useState(lTurma.disciplina);
  let disciplinas = allLocalJsonData.SQL.disciplinas;

  function updateOuterTurmaDisciplina(novaDisciplina) {
    let disciplinaAtualizada = novaDisciplina ? novaDisciplina : null;
    setDisciplina(disciplinaAtualizada);
    let novaTurma = {
      ...lTurma,
      disciplina: disciplinaAtualizada,
    };
    setLTurma(novaTurma);
  }

  const [isLocked, setIsLocked] = useState(false);

  return (
    <LockableSelect
      onChange={updateOuterTurmaDisciplina}
      isClearable={true}
      placeholder="Disciplina"
      options={disciplinas}
      value={disciplina}
      getOptionValue={(disciplina) => disciplina.codigo}
      formatOptionLabel={({ codigo, apelido, nome }, { context }) => {
        let editedLabel = `${codigo} - `;
        editedLabel += context === "value" ? `${apelido}` : `${nome}`;
        return editedLabel;
      }}
      lockStates={{
        isLocked: isLocked,
        setIsLocked: setIsLocked,
        title: "Fixar disciplina",
      }}
    />
  );
}

function SelectProfessor({ lTurma, setLTurma }) {
  const [professor, setProfessor] = useState(lTurma.professor);
  let professores = allLocalJsonData.SQL.professores;

  function updateOuterTurmaProfessor(novoProfessor) {
    let professorAtualizado = novoProfessor ? novoProfessor : null;
    setProfessor(professorAtualizado);
    let novaTurma = { ...lTurma, professor: professorAtualizado };
    setLTurma(novaTurma);
  }

  const [isLocked, setIsLocked] = useState(false);

  return (
    <LockableSelect
      onChange={updateOuterTurmaProfessor}
      isClearable={true}
      placeholder="Professor"
      options={professores}
      value={professor}
      getOptionValue={(option) => option.nome}
      getOptionLabel={({ nome, apelido, laboratorio, curso }) =>
        `${nome} - ${apelido} - ${laboratorio} - ${curso}`
      }
      formatOptionLabel={({ apelido, nome }, { context }) => {
        return context === "value" ? `${apelido}` : `${nome}`;
      }}
      lockStates={{
        isLocked: isLocked,
        setIsLocked: setIsLocked,
        title: "Fixar professor",
      }}
    />
  );
}

function SelectSala({ lTurma, setLTurma, indexHorario }) {
  const [sala, setSala] = useState(lTurma.horarios[indexHorario].sala);
  let salas = allLocalJsonData.SQL.salas;

  function updateOuterTurmaSala(novaSala) {
    let salaAtualizada = novaSala ? novaSala : null;
    setSala(salaAtualizada);
    let novaTurma = { ...lTurma };
    novaTurma.horarios[indexHorario].sala = salaAtualizada;
    setLTurma(novaTurma);
  }

  const [isLocked, setIsLocked] = useState(false);

  return (
    <LockableSelect
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={true}
      onChange={updateOuterTurmaSala}
      placeholder="Sala"
      options={salas}
      value={sala}
      getOptionValue={({ bloco, codigo }) => `${bloco} - ${codigo}`}
      getOptionLabel={({ capacidade, bloco, codigo }) =>
        `${capacidade} - ${bloco} - ${codigo}`
      }
      formatOptionLabel={({ capacidade, bloco, codigo }, { context }) => {
        let msg = "";
        msg += capacidade ? `(${capacidade})` : "(Cap. indef.)";
        msg += bloco ? ` ${bloco}` : "(Bloco indef.)";
        msg += codigo ? ` - ${codigo}` : " (Cod. indef.)";
        return context === "value" ? msg : msg;
      }}
      lockStates={{
        isLocked: isLocked,
        setIsLocked: setIsLocked,
        title: "Fixar sala",
      }}
    />
  );
}

function SelectDia({ lTurma, setLTurma, indexHorario }) {
  let dias = options.constantValues.days;

  let horarios = lTurma.horarios;
  let horario = horarios[indexHorario];
  let selectedDia = horario.dia;

  let diaSelecionado = dias.find((dia) => dia.value === selectedDia);
  const [dia, setDia] = useState(diaSelecionado);

  function updateOuterTurma(novoDia) {
    let blankDia = { value: null, label: null };
    let diaAtualizado = null;
    if (!novoDia) {
      diaAtualizado = blankDia;
      setDia(null);
    } else {
      diaAtualizado = novoDia;
      setDia(diaAtualizado);
    }
    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].dia = diaAtualizado.value;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };
    setLTurma(novaTurma);
  }

  const [isLocked, setIsLocked] = useState(false);

  return (
    <LockableSelect
      onChange={updateOuterTurma}
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={true}
      placeholder="Dia"
      options={dias}
      value={dia}
      // getOptionValue={(option) => option.value}
      // getOptionLabel={(option) => option.label}
      formatOptionLabel={({ value, label }, { context }) => {
        return context === "value" ? `${value}` : `${label}`;
      }}
      lockStates={{
        isLocked: isLocked,
        setIsLocked: setIsLocked,
        title: "Fixar dia",
      }}
    />
  );
}

function SelectHoraTang({ lTurma, setLTurma, indexHorario }) {
  let horarios = lTurma.horarios;
  let horario = horarios[indexHorario];

  let selectedHora = horario.horaInicio;
  let horasTang = options.constantValues.hoursTang;
  let horaSelecionada = horasTang.find(
    (hora) => parseInt(hora.hora) === parseInt(selectedHora)
  );
  const [hora, setHora] = useState(horaSelecionada);

  function updateOuterTurma(novaHoraTang) {
    let blankHora = { hora: null, turno: null };
    let novaHoraTangAtualizada = null;
    if (!novaHoraTang) {
      novaHoraTangAtualizada = blankHora;
      setHora(null);
    } else {
      novaHoraTangAtualizada = novaHoraTang;
      setHora(novaHoraTangAtualizada);
    }
    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].horaInicio = novaHoraTangAtualizada.hora;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };

    setLTurma(novaTurma);
  }

  const [isLocked, setIsLocked] = useState(false);

  return (
    <LockableSelect
      placeholder="Hora"
      options={horasTang}
      value={hora}
      onChange={updateOuterTurma}
      getOptionValue={(option) => option.hora}
      getOptionLabel={(option) => `${option.hora} (${option.turno})`}
      formatOptionLabel={({ hora, turno }, { context }) => {
        return context === "value" ? `${hora}` : `${hora} (${turno})`;
      }}
      lockStates={{
        isLocked: isLocked,
        setIsLocked: setIsLocked,
        title: "Fixar hora",
      }}
    />
  );
}

function SelectDuracao({ lTurma, setLTurma, indexHorario }) {
  let horarios = lTurma.horarios;
  let horario = horarios[indexHorario];

  let selectedDuracao = horario.duracao;
  let duracoes = options.constantValues.durations;
  let duracaoSelecionada = duracoes.find(
    (duracao) => duracao.value === selectedDuracao
  );

  const [duracao, setDuracao] = useState(duracaoSelecionada);

  function updateOuterTurma(novaDuracao) {
    let blankDuracao = { value: null, label: null };
    let novaDuracaoAtualizada = null;
    if (!novaDuracao) {
      novaDuracaoAtualizada = blankDuracao;
      setDuracao(null);
    } else {
      novaDuracaoAtualizada = novaDuracao;
      setDuracao(novaDuracaoAtualizada);
    }

    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].duracao = novaDuracaoAtualizada.value;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };

    setLTurma(novaTurma);
  }

  const [isLocked, setIsLocked] = useState(true);
  return (
    <LockableSelect
      placeholder="Duração"
      options={duracoes}
      value={duracao}
      onChange={updateOuterTurma}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      formatOptionLabel={(option) => `${option.label}`}
      lockStates={{ isLocked, setIsLocked, title: "Fixar duração" }}
    />
  );
}

function SelectTesting() {
  let dummyOptions = allLocalJsonData.SQL.professores;
  const [dummySelectedValue, setDummySelectedValue] = useState(dummyOptions[0]);
  const [isLocked, setIsLocked] = useState(true);
  let lockStates = {
    isLocked,
    setIsLocked,
    title: "Testando select deletável",
  };

  return (
    <LockableSelect
      placeholder={"Testando"}
      options={dummyOptions}
      value={dummySelectedValue}
      onChange={setDummySelectedValue}
      getOptionValue={({ nome }) => nome}
      getOptionLabel={({ nome }) => nome}
      formatOptionLabel={({ nome }) => nome}
      lockStates={lockStates}
    />
  );
}

/* /\ /\ /\ /\ /\ /\ /\ /\ MULTITURMAS /\ /\ /\ /\ /\ /\ /\ /\ */

/* \/ \/ \/ \/ \/ \/ \/ \/ Item Selections \/ \/ \/ \/ \/ \/ \/ \/ */

function StudentSelection(studentStates) {
  const { students, setStudents, student, setStudent } = studentStates;
  return (
    <div
      className="SelectionBar"
      onWheel={(event) => {
        // let itemStates = [dados_agrupados, setAluno, aluno];
        // scrollThroughAlunos(event, itemStates);
      }}
    >
      <Select
        onChange={setStudent}
        className="itemSelectionBar"
        styles={styleWidthFix}
        isClearable={false}
        value={student}
        placeholder={"Nome do aluno"}
        isSearchable={true}
        options={students}
        getOptionValue={(student) => student.matricula}
        getOptionLabel={(student) => student.nome}
        formatOptionLabel={({ matricula, nome }) => `${matricula}: ${nome}`}
        // formatOptionLabel={(student) => `${student.matricula}: ${student.nome}`}
      />
    </div>
  );
}

function DisciplinasSelection(props) {
  return (
    <div
      className="SelectionBar"
      onWheel={(event) => {
        // let itemStates = [disciplinas, setDisciplina, disciplina];
        // scrollThroughDisciplinas(event, itemStates);
      }}
    >
      <Select
        className="itemSelectionBar"
        styles={styleWidthFix}
        isClearable={false}
        onChange={props.setDisciplina}
        placeholder={"Disciplina"}
        value={props.disciplina}
        options={props.disciplinas}
        getOptionValue={(option) => option.codigo}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={({ periodo, codigo, nome }) =>
          `(${periodo}) ${codigo}: ${nome}`
        }
      />
    </div>
  );
}

function ProfessorItemSelection({ professorStates }) {
  const { professores, /* setProfessores, */ professor, setProfessor } =
    professorStates;
  return (
    <Select
      className="itemSelectionBar"
      styles={styleWidthFix}
      isClearable={false}
      onChange={setProfessor}
      options={professores}
      value={professor}
      getOptionValue={(option) => option.id}
      getOptionLabel={({ laboratorio, curso, apelido }) => {
        let message = "";
        message += `(`;
        message += `${laboratorio || "lab indef."} - `;
        message += `${curso || "cur indef."}) - `;
        message += `${apelido || "Apelido indef."}`;
        return message;
      }}
    />
  );
}

function SalaItemSelection({ mySalasStates }) {
  const { salas, setSalas, sala, setSala } = mySalasStates;
  return (
    <Select
      className="itemSelectionBar"
      styles={styleWidthFix}
      isClearable={false}
      onChange={setSala}
      options={salas}
      value={sala}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => option.capacidade}
      formatOptionLabel={(sala) =>
        `(${sala.capacidade}) ${sala.bloco}-${sala.codigo}`
      }
    />
  );
}

function TurmaItemSelection({ turmas, setTurmas, turma, setTurma }) {
  return (
    <Select
      className="itemSelectionBar"
      styles={styleWidthFix}
      isClearable={false}
      options={turmas}
      value={turma}
      onChange={setTurma}
      getOptionValue={(turma) => turma.idTurma}
      getOptionLabel={(turma) => `${turma.idTurma}`}
      formatOptionLabel={(option) => {
        let { idTurma, ano, semestre, disciplina, professor } = option;
        let message = `(id: ${idTurma}) ${ano}.${semestre}`;
        message += ` - ${
          disciplina ? disciplina.apelido : "disciplina indef."
        }`;
        message += ` - ${professor ? professor.apelido : "prof. indef."}`;
        return message;
      }}
    />
  );
}

/* /\ /\ /\ /\ /\ /\ /\ /\ Item Selections /\ /\ /\ /\ /\ /\ /\ /\ */

function SelectLaboratorio(professorStates) {
  const { professores, setProfessores, professor, setProfessor } =
    professorStates;
  let laboratorios = options.constantValues.laboratorios;
  let selectedLab = professor.laboratorio;
  let labSelecionado = getLab(selectedLab);
  const [laboratorio, setLaboratorio] = useState(labSelecionado);

  useEffect(() => {
    setLaboratorio(labSelecionado);
  }, [professor.laboratorio]);

  function getLab(apelidoLab) {
    let foundLab = laboratorios.find(
      (labOption) => labOption.apelido === apelidoLab
    );
    let returnedLab = foundLab ?? null;
    return returnedLab;
  }

  function updateOuterProfessorLab(selectedLab) {
    let newLabValue = null;
    if (selectedLab) {
      newLabValue = selectedLab.apelido;
    }
    let newProfessor = {
      ...professor,
      laboratorio: newLabValue,
    };
    setLaboratorio(selectedLab);
    setProfessor(newProfessor);
    let newProfessores = updateProfessorFromList(professores, newProfessor);
    setProfessores(newProfessores);
  }

  return (
    <Select
      value={laboratorio}
      options={laboratorios}
      onChange={updateOuterProfessorLab}
      className="mySelectList"
      placeholder="Laboratório"
      styles={styleWidthFix}
      isClearable={true}
      getOptionValue={(lab) => lab.apelido}
      getOptionLabel={(lab) => `${lab.centro} -${lab.apelido} - ${lab.nome}`}
      formatOptionLabel={({ centro, apelido, nome }, { context }) => {
        let isOpened = context === "value";
        let message = isOpened ? `${apelido}` : `${apelido} - ${nome}`;
        return message;
      }}
    />
  );
}

function SelectCurso(professorStates) {
  const { professores, setProfessores, professor, setProfessor } =
    professorStates;
  let cursos = options.constantValues.courses;

  let selectedCurso = professor.curso;
  let cursoSelecionado = getCurso(selectedCurso);
  const [curso, setCurso] = useState(cursoSelecionado);

  useEffect(() => {
    setCurso(cursoSelecionado);
  }, [professor.curso]);

  function getCurso(apelidoCurso) {
    let foundCurso = cursos.find((curso) => curso.apelido === apelidoCurso);
    let returnedCurso = foundCurso ?? null;
    return returnedCurso;
  }

  function updateCurso(selectedCurso) {
    let newCursoValue = null;
    if (selectedCurso) {
      newCursoValue = selectedCurso.apelido;
    }
    let newProfessor = {
      ...professor,
      curso: newCursoValue,
    };
    setCurso(selectedCurso);
    setProfessor(newProfessor);
    let newProfessores = updateProfessorFromList(professores, newProfessor);
    setProfessores(newProfessores);
  }

  return (
    <Select
      value={curso}
      options={cursos}
      onChange={updateCurso}
      className="mySelectList"
      placeholder="Curso"
      styles={styleWidthFix}
      isClearable={true}
      getOptionValue={(curso) => curso.apelido}
      getOptionLabel={(curso) => `${curso.apelido} - ${curso.nome}`}
      formatOptionLabel={({ apelido, nome }, { context }) => {
        let isOpened = context === "value";
        let message = isOpened ? `${apelido}` : `${nome}`;
        return message;
      }}
    />
  );
}

/* /\ /\ /\ /\ /\ /\ /\ /\ Página Professores /\ /\ /\ /\ /\ /\ /\ /\ */

function SelectFilterAno(outerAnoStates) {
  let years = options.constantValues.years;
  const { ano, setAno } = outerAnoStates;

  return (
    <Select
      placeholder="Filtro Ano"
      className="mySelectList"
      styles={styleWidthFix}
      // isClearable
      options={years}
      value={ano}
      onChange={setAno}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      // formatOptionLabel={(option) => `${option.value}`}
    />
  );
}

function SelectFilterSemester(outerSemesterStates) {
  let semesters = options.constantValues.semesters;
  const { semestre, setSemestre } = outerSemesterStates;

  return (
    <Select
      placeholder="Filtro Semestre"
      className="mySelectList"
      styles={styleWidthFix}
      // isClearable
      options={semesters}
      value={semestre}
      onChange={setSemestre}
      getOptionValue={(option) => option.value}
      getOptionLabel={(option) => option.label}
      // formatOptionLabel={(option) => `${option.label}`}
    />
  );
}

function SelectFilterProfessor(outerProfessorStates) {
  const { professor, setProfessor } = outerProfessorStates;
  let professors = allLocalJsonData.SQL.professores;

  return (
    <Select
      placeholder="Filtro Professor"
      className="mySelectList"
      styles={styleWidthFix}
      isClearable
      options={professors}
      value={professor}
      onChange={setProfessor}
      getOptionValue={(option) => option.nome}
      getOptionLabel={({ nome, apelido, laboratorio, curso }) =>
        `${nome} - ${apelido} - ${laboratorio} - ${curso}`
      }
      formatOptionLabel={({ apelido, nome }, { context }) => {
        return context === "value" ? `${apelido}` : `${nome}`;
      }}
    />
  );
}

function SelectFilterRoom(outerRoomStates) {
  const { room, setRoom } = outerRoomStates;
  let rooms = allLocalJsonData.SQL.salas;

  return (
    <Select
      placeholder="Filtro Sala"
      className="mySelectList"
      styles={styleWidthFix}
      isClearable
      options={rooms}
      value={room}
      onChange={setRoom}
      getOptionValue={({ bloco, codigo }) => `${bloco} - ${codigo}`}
      getOptionLabel={({ capacidade, bloco, codigo }) =>
        `${capacidade} - ${bloco} - ${codigo}`
      }
      formatOptionLabel={({ capacidade, bloco, codigo }, { context }) => {
        let msg = "";
        msg += capacidade ? `(${capacidade})` : "(Cap. indef.)";
        msg += bloco ? ` ${bloco}` : "(Bloco indef.)";
        msg += codigo ? ` - ${codigo}` : " (Cod. indef.)";
        return context === "value" ? msg : msg;
      }}
    />
  );
}

function SelectFilterExpectedSemester(outerExpectedSemesterStates) {
  const { expectedSemester, setExpectedSemester } = outerExpectedSemesterStates;
  let expectedSemesters = options.constantValues.expectedSemester;

  return (
    <Select
      placeholder="Filtro Período"
      className="mySelectList"
      styles={styleWidthFix}
      isClearable
      options={expectedSemesters}
      value={expectedSemester}
      onChange={setExpectedSemester}
      formatOptionLabel={({ value, label }, { context }) => {
        let message = "";
        message += value;
        message += "º Período";
        return context === "value" ? `${message}` : `${message}`;
      }}
    />
  );
}

/* /\ /\ /\ /\ /\ /\ /\ /\ CCTurma filtering Selects /\ /\ /\ /\ /\ /\ /\ /\ */

/* \ CRUD STUDENTS / */

function SelectStudentYear(myStudentStates) {
  const { student, setStudent } = myStudentStates;

  function updateStudentYear(newYear) {
    // console.log(newYear);
    let newStudent = { ...student, anoEntrada: newYear.value };
    setStudent(newStudent);
  }

  let yearStates = {
    outerYear: student.anoEntrada,
    setOuterYear: updateStudentYear,
  };

  return <SelectYear {...yearStates} />;
}

function SelectStudentCourse(myStudentStates) {
  const { student, setStudent } = myStudentStates;

  function updateStudentCourse(newCourse) {
    let newStudent = { ...student, curso: newCourse.value };
    setStudent(newStudent);
  }

  let courseStates = {
    outerCourse: student.curso,
    setOuterCourse: updateStudentCourse,
  };

  return <SelectCourse {...courseStates} />;
}

/* \ Others: I'm not even sure if are still used / */
function SelectAnoTurma({ lTurma, setLTurma }) {
  let anos = options.constantValues.years;
  let anoSelecionado = anos.find((ano) => ano.value === parseInt(lTurma.ano));
  const [ano, setAno] = useState(anoSelecionado);
  function updateOuterValue(novoAno) {
    if (novoAno === null) {
      novoAno = { value: "", label: "" };
    }
    setAno(novoAno);
    let novaTurma = {
      ...lTurma,
      ano: novoAno.value,
    };
    setLTurma(novaTurma);
  }
  return (
    <Select
      onChange={updateOuterValue}
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={false}
      placeholder="Ano"
      options={anos}
      value={ano}
    />
  );
}

function SelectSemestreTurma({ lTurma, setLTurma }) {
  let semestres = options.constantValues.semesters;

  let semestreSelecionado = semestres.find(
    (semestre) => semestre.value === parseInt(lTurma.semestre)
  );

  const [semestre, setSemestre] = useState(semestreSelecionado);

  function updateOuterValue(novoSemestre) {
    if (novoSemestre === null) {
      novoSemestre = { value: "", label: "" };
    }
    setSemestre(novoSemestre);
    let novaTurma = {
      ...lTurma,
      semestre: novoSemestre.value,
    };
    setLTurma(novaTurma);
  }

  return (
    <Select
      onChange={updateOuterValue}
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={false}
      placeholder="Semestre"
      options={semestres}
      value={semestre}
    />
  );
}

function SelectProfessorC(props) {
  const {
    professorAtual,
    setNewProfessor,
    professoresAtuais,
    setNewProfessores,
  } = props;

  const [professores, setProfessores] = useState(professoresAtuais);
  let professorSelecionado = professorAtual;
  // let professorSelecionado = professores.find(
  //   (professor) => professor.nome === lTurma.professor
  // );
  const [professor, setProfessor] = useState(professorSelecionado);
  const [isLoading, setIsLoading] = useState(false);

  function updateOuterTurma(novoProfessor) {
    if (novoProfessor === null) {
      novoProfessor = { nome: "" };
    }
    setProfessor(novoProfessor);
    setNewProfessor(novoProfessor);
  }

  function createOption(newValue) {
    let newOption = {
      laboratorio: null,
      curso: null,
      nome: newValue,
      disciplinas: [],
    };
    return newOption;
  }
  function handleCreate(newValue) {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = createOption(newValue);
      setIsLoading(false);
      setNewProfessores((prev) => [...prev, newOption]);
      setProfessores((prev) => [...prev, newOption]);
      setProfessor(newOption);
      setNewProfessor(newOption);
    }, 1000);
  }

  return (
    <CreatableSelect
      onChange={updateOuterTurma}
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={true}
      onCreateOption={handleCreate}
      isDisabled={isLoading}
      isLoading={isLoading}
      isSearchable
      options={professores}
      value={professor}
      getOptionValue={(option) => option.nome}
      getOptionLabel={(option) => option.nome}
      placeholder="Professor"
    />
  );
}

function SelectPeriodoEsperado(myDisciplinasStates) {
  const { /* disciplinas, setDisciplinas, */ disciplina, setDisciplina } =
    myDisciplinasStates;
  let periodos = options.constantValues.expectedSemester;
  function findPeriodo(periodoValue) {
    let periodoSelecionado = periodos.find(
      (periodo) => periodo.value === periodoValue
    );
    return periodoSelecionado;
  }
  const [periodo, setPeriodo] = useState(findPeriodo(disciplina.periodo));

  useEffect(() => {
    setPeriodo(findPeriodo(disciplina.periodo));
  }, [disciplina.periodo]);

  function outerUpdate(newPeriodo) {
    setPeriodo(newPeriodo);
    let novaDisciplina = { ...disciplina };
    novaDisciplina.periodo = newPeriodo.value;
    setDisciplina(novaDisciplina);
  }

  return (
    <Select
      placeholder="Período Esperado"
      className="mySelectList"
      styles={styleWidthFix}
      isClearable={false}
      options={periodos}
      value={periodo}
      onChange={outerUpdate}
    />
  );
}

export {
  /* Multiturmas (MTT) */
  SelectAno,
  SelectSemestre,
  SelectProfessor,
  SelectDisciplina,
  SelectTesting,
  /* MTT: Horario */
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  /* Item Selection */
  StudentSelection,
  DisciplinasSelection,
  ProfessorItemSelection,
  SalaItemSelection,
  TurmaItemSelection,
  /* CCTurma */
  SelectFilterAno,
  SelectFilterSemester,
  SelectFilterProfessor,
  SelectFilterRoom,
  SelectFilterExpectedSemester,
  /* CRUD */
  /* student */
  SelectStudentYear,
  SelectStudentCourse,
  /* Outros */
  SelectPeriodoEsperado,
  SelectCurso,
  SelectAnoTurma,
  SelectProfessorC,
  SelectAnoSemestre,
  SelectLaboratorio,
  SelectSemestreTurma,
};
