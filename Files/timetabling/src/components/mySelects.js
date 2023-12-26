// import "../CSS/defaultStyle.css";
import React, { useState } from "react";
import options from "../DB/local/options";
import { allLocalJsonData } from "../DB/local/dataFromJSON";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { updateProfessorFromList } from "../helpers/auxFunctions";

let styleWidthFix = options.SelectStyles.fullItem;

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
      className="SelectList"
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
      className="SelectList"
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
  let localDisciplina = {
    apelido: lTurma.disciplina.apelido,
    codigo: lTurma.disciplina.codigo,
    nome: lTurma.disciplina.nome,
    periodo: lTurma.disciplina.periodo,
  };
  let disciplinas = allLocalJsonData.SQL.disciplinas;

  const [disciplina, setDisciplina] = useState(localDisciplina);

  function updateOuterTurma(novaDisciplina) {
    let blankDisciplina = {
      apelido: null,
      periodo: null,
      codigo: null,
      nome: null,
    };
    let disciplinaAtualizada = null;
    if (!novaDisciplina) {
      setDisciplina(disciplinaAtualizada);
      disciplinaAtualizada = blankDisciplina;
    } else {
      disciplinaAtualizada = novaDisciplina;
      setDisciplina(disciplinaAtualizada);
    }
    let novaTurma = {
      ...lTurma,
      apelidoDisciplina: disciplinaAtualizada.apelido,
      periodoDisciplina: disciplinaAtualizada.periodo,
      codigoDisciplina: disciplinaAtualizada.codigo,
      nomeDisciplina: disciplinaAtualizada.nome,
    };
    setLTurma(novaTurma);
  }

  return (
    <Select
      onChange={updateOuterTurma}
      className="SelectList"
      styles={styleWidthFix}
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
    />
  );
}

function SelectProfessor({ lTurma, setLTurma }) {
  let professorSelecionado = {
    laboratorio: lTurma.professor.laboratorio,
    apelido: lTurma.professor.apelido,
    curso: lTurma.professor.curso,
    nome: lTurma.professor.nome,
  };

  const [professor, setProfessor] = useState(professorSelecionado);
  let professores = allLocalJsonData.SQL.professores;

  function updateOuterTurma(novoProfessor) {
    let blankProfessor = {
      laboratorio: null,
      apelido: null,
      curso: null,
      nome: null,
    };
    let professorAtualizado = null;
    if (!novoProfessor) {
      professorAtualizado = blankProfessor;
      setProfessor(null);
    } else {
      professorAtualizado = novoProfessor;
      setProfessor(professorAtualizado);
    }
    let novaTurma = { ...lTurma, professor: professorAtualizado };
    setLTurma(novaTurma);
  }

  return (
    <Select
      onChange={updateOuterTurma}
      className="SelectList"
      styles={styleWidthFix}
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
    />
  );
}

function SelectSala({ lTurma, setLTurma, indexHorario }) {
  let salas = allLocalJsonData.SQL.salas;
  let horarios = [...lTurma.horarios];
  // console.log("horarios", horarios[indexHorario].sala);
  // console.log("horarios", salas[0]);
  const [sala, setSala] = useState(horarios[indexHorario].sala);

  function updateOuterTurmaSala(novaSala) {
    let salaAtualizada = null;
    if (!novaSala) {
      setSala(null);
    } else {
      salaAtualizada = novaSala;
      setSala(salaAtualizada);
    }
    horarios[indexHorario].sala = salaAtualizada;
    let novaTurma = {
      ...lTurma,
      horarios: horarios,
    };
    setLTurma(novaTurma);
  }

  return (
    <Select
      className="SelectList"
      styles={styleWidthFix}
      isClearable={true}
      onChange={updateOuterTurmaSala}
      placeholder="Sala"
      options={salas}
      value={sala}
      getOptionValue={(option) => `${option.bloco} - ${option.codigo}`}
      getOptionLabel={({ capacidade, bloco, codigo }) =>
        `${capacidade} - ${bloco} - ${codigo}`
      }
      formatOptionLabel={({ capacidade, bloco, codigo }, { context }) => {
        return context === "value"
          ? `(${capacidade}) ${bloco} - ${codigo}`
          : `(${capacidade}) ${bloco} - ${codigo}`;
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

  return (
    <Select
      onChange={updateOuterTurma}
      className="SelectList"
      styles={styleWidthFix}
      isClearable={true}
      placeholder="Dia"
      options={dias}
      value={dia}
      // getOptionLabel={(option) => option.value}
      // getOptionValue={(option) => option.label}
      formatOptionLabel={({ value, label }, { context }) => {
        return context === "value" ? `${value}` : `${label}`;
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

  return (
    <Select
      onChange={updateOuterTurma}
      className="SelectList"
      styles={styleWidthFix}
      isClearable={true}
      placeholder="Hora"
      options={horasTang}
      value={hora}
      getOptionValue={(option) => option.hora}
      getOptionLabel={(option) => `${option.hora} (${option.turno})`}
      formatOptionLabel={({ hora, turno }, { context }) => {
        return context === "value" ? `${hora}` : `${hora} (${turno})`;
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

  return (
    <Select
      onChange={updateOuterTurma}
      className="SelectList"
      styles={styleWidthFix}
      isClearable={true}
      placeholder="Duração"
      options={duracoes}
      value={duracao}
      getOptionValue={(option) => option.value}
    />
  );
}

/* /\ /\ /\ /\ /\ /\ /\ /\ MULTITURMAS /\ /\ /\ /\ /\ /\ /\ /\ */

/* \/ \/ \/ \/ \/ \/ \/ \/ Item Selections \/ \/ \/ \/ \/ \/ \/ \/ */

function StudentSelection(props) {
  return (
    <div
      className="SelectionBar"
      onWheel={(event) => {
        // let itemStates = [dados_agrupados, setAluno, aluno];
        // scrollThroughAlunos(event, itemStates);
      }}
    >
      <Select
        onChange={props.change_student}
        className="itemSelectionBar"
        styles={styleWidthFix}
        isClearable={false}
        value={props.student}
        placeholder={"Nome do aluno"}
        isSearchable={true}
        options={props.options}
        getOptionValue={(option) => option.matricula}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={(option) => `${option.matricula}: ${option.nome}`}
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
        // formatOptionLabel={props.formatOptionLabel}
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
      getOptionLabel={({ laboratorio, curso, apelido }) =>
        `(${laboratorio} - ${curso}) ${apelido}`
      }
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
      formatOptionLabel={({ idTurma, ano, semestre, disciplina, professor }) =>
        `(id: ${idTurma}) ${ano}.${semestre} - ${disciplina.apelido} - ${professor.apelido}`
      }
    />
  );
}

/* /\ /\ /\ /\ /\ /\ /\ /\ Item Selections /\ /\ /\ /\ /\ /\ /\ /\ */

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
      className="SelectList"
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
      className="SelectList"
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
      className="SelectList"
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

function SelectCurso({ professorStates }) {
  let cursos = options.constantValues.courses;
  const { professores, setProfessores, professor, setProfessor } =
    professorStates;

  function getEmptyCurso(cursoValue) {
    let emptyCurso = {
      value: cursoValue,
      label: cursoValue,
    };
    return emptyCurso;
  }

  function getCurso(cursoValue) {
    let foundCurso = cursos.find((curso) => curso.value === cursoValue);
    let returnedCurso = foundCurso ?? getEmptyCurso(cursoValue);
    return returnedCurso;
  }

  function updateCurso(selectedCurso) {
    let newProfessor = { ...professor };
    if (selectedCurso) {
      newProfessor.curso = selectedCurso.value;
    } else {
      newProfessor.curso = "";
    }
    setProfessor(newProfessor);
    setProfessores(updateProfessorFromList(professores, newProfessor));
  }

  return (
    <Select
      onChange={updateCurso}
      className="SelectList"
      styles={styleWidthFix}
      isClearable={true}
      value={getCurso(professor.curso)}
      options={cursos}
      placeholder="Curso"
      getOptionLabel={(option) => `${option.value} - ${option.label}`}
      formatOptionLabel={(option) => `${option.value} - ${option.label}`}
    />
  );
}

function SelectLaboratorio({ professorStates }) {
  let laboratorios = options.constantValues.laboratorios;
  const { professores, setProfessores, professor, setProfessor } =
    professorStates;

  function getEmptyLaboratorio(labValue) {
    let emptyLab = {
      centro: labValue,
      value: labValue,
      label: labValue,
    };
    return emptyLab;
  }

  function getCorrectLaboratorio(labValue) {
    let foundLab = laboratorios.find(
      (labOption) => labOption.value === labValue
    );
    let returnedLab = foundLab ?? getEmptyLaboratorio(labValue);
    return returnedLab;
  }

  function updateLaboratorio(selectedLab) {
    let newProfessor = { ...professor };
    if (selectedLab) {
      newProfessor.laboratorio = selectedLab.value;
    } else {
      newProfessor.laboratorio = "";
    }
    setProfessor(newProfessor);
    setProfessores(updateProfessorFromList(professores, newProfessor));
  }

  return (
    <Select
      onChange={updateLaboratorio}
      className="SelectList"
      styles={styleWidthFix}
      isClearable={true}
      value={getCorrectLaboratorio(professor.laboratorio)}
      options={laboratorios}
      placeholder="Laboratório"
      getOptionLabel={(option) => `${option.value} - ${option.label}`}
      formatOptionLabel={(option) => `${option.value} - ${option.label}`}
    />
  );
}

function SelectPeriodoEsperado({ myDisciplinasStates }) {
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

  function outerUpdate(newPeriodo) {
    setPeriodo(newPeriodo);
    let novaDisciplina = { ...disciplina };
    novaDisciplina.periodo = newPeriodo.value;
    setDisciplina(novaDisciplina);
  }

  return (
    <Select
      placeholder="Período Esperado"
      className="SelectList"
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
  /* Outros */
  SelectPeriodoEsperado,
  SelectCurso,
  SelectAnoTurma,
  SelectProfessorC,
  SelectAnoSemestre,
  SelectLaboratorio,
  SelectSemestreTurma,
};
