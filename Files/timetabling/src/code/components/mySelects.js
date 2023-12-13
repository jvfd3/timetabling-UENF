import "../CSS/defaultStyle.css";
import React, { useState } from "react";
import options from "../temp/options";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

function SelectAnoSemestre(props) {
  let { ano, setAno, semestre, setSemestre } = props;
  return (
    <div className="GlobalSelects">
      Ano:
      <SelectAno outerAno={ano} setOuterAno={setAno} />
      Semestre:
      <SelectSemestre outerSemestre={semestre} setOuterSemestre={setSemestre} />
    </div>
  );
}

function SelectAno(props) {
  const { outerAno, setOuterAno } = props;
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
      className="SelectList"
      placeholder="Ano"
      options={anos}
      value={ano}
      onChange={updateOuterValue}
    />
  );
}

function SelectAnoTurma(props) {
  const { lTurma, setLTurma } = props;
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
      className="SelectList"
      placeholder="Ano"
      options={anos}
      value={ano}
      onChange={updateOuterValue}
    />
  );
}

function SelectSemestreTurma(props) {
  const { lTurma, setLTurma } = props;
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
      className="SelectList"
      placeholder="Semestre"
      options={semestres}
      value={semestre}
      onChange={updateOuterValue}
    />
  );
}

function SelectSemestre(props) {
  const { outerSemestre, setOuterSemestre } = props;
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
      className="SelectList"
      placeholder="Semestre"
      options={semestres}
      value={semestre}
      onChange={updateOuterValue}
    />
  );
}

function SelectDisciplina(props) {
  const { lTurma, setLTurma } = props;

  let disciplinas = allLocalJsonData.static.infoDisciplinasCC;
  let disciplinaSelecionada = disciplinas.find(
    (disciplina) => disciplina.codigo === lTurma.disciplina.codigo
  );

  const [disciplina, setDisciplina] = useState(disciplinaSelecionada);

  function updateOuterTurma(novaDisciplina) {
    if (novaDisciplina === null) {
      novaDisciplina = { codigo: "", nome: "" };
    }
    setDisciplina(novaDisciplina);
    let novaTurma = {
      ...lTurma,
      disciplina: {
        codigo: novaDisciplina.codigo,
        nome: novaDisciplina.nome,
      },
    };
    setLTurma(novaTurma);
  }

  return (
    <Select
      className="SelectList"
      placeholder="Disciplina"
      options={disciplinas}
      value={disciplina}
      isClearable={true}
      getOptionValue={(option) => option.codigo}
      getOptionLabel={(option) => `${option.codigo} - ${option.nome}`}
      onChange={updateOuterTurma}
    />
  );
}

function SelectProfessor(props) {
  const { lTurma, setLTurma } = props;

  let professores = allLocalJsonData.static.infoProfessores;
  let professorSelecionado = professores.find(
    (professor) => professor.nome === lTurma.professor
  );
  const [professor, setProfessor] = useState(professorSelecionado);

  function updateOuterTurma(novoProfessor) {
    if (novoProfessor === null) {
      novoProfessor = { nome: "" };
    }
    setProfessor(novoProfessor);
    let novaTurma = {
      ...lTurma,
      professor: novoProfessor.nome,
    };
    setLTurma(novaTurma);
  }

  return (
    <Select
      className="SelectList"
      placeholder="Professor"
      options={professores}
      value={professor}
      isClearable={true}
      getOptionValue={(option) => option.nome}
      getOptionLabel={(option) => option.nome}
      onChange={updateOuterTurma}
      formatOptionLabel={(option) => {
        let completeName = false;
        let nomeSeparado = option.nome.split(" ");
        let nomeDenso =
          nomeSeparado[0] + " " + nomeSeparado[nomeSeparado.length - 1];
        let name = completeName ? option.nome : nomeDenso;
        return `(${option.laboratorio}) ${name}`;
      }}
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
      onCreateOption={handleCreate}
      isDisabled={isLoading}
      isLoading={isLoading}
      isSearchable
      isClearable={false}
      options={professores}
      value={professor}
      onChange={updateOuterTurma}
      getOptionValue={(option) => option.nome}
      getOptionLabel={(option) => option.nome}
      className="SelectList"
      placeholder="Professor"
    />
  );
}

function SelectSala(props) {
  const { lTurma, setLTurma, indexHorario } = props;

  let salas = allLocalJsonData.static.infoSalas;
  let horarios = lTurma.horarios;
  let selectedSala = horarios[indexHorario].sala;
  let salaSelecionada = salas.find((sala) => sala.blocoSala === selectedSala);

  const [sala, setSala] = useState(salaSelecionada);

  function updateOuterTurma(novaSala) {
    if (novaSala === null) {
      novaSala = { blocoSala: "" };
    }
    setSala(novaSala);

    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].sala = novaSala.blocoSala;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };
    setLTurma(novaTurma);
  }

  return (
    <Select
      className="SelectList"
      isClearable={true}
      placeholder="Sala"
      options={salas}
      value={sala}
      getOptionValue={(option) => option.blocoSala}
      getOptionLabel={(option) =>
        `(${option.capacidade}) ${option.bloco} - ${option.codigo}`
      }
      onChange={updateOuterTurma}
    />
  );
}

function SelectDia(props) {
  const { lTurma, setLTurma, indexHorario } = props;

  let dias = options.constantValues.days;

  let horarios = lTurma.horarios;
  let horario = horarios[indexHorario];
  let selectedDia = horario.dia;

  let diaSelecionado = dias.find((dia) => dia.value === selectedDia);
  const [dia, setDia] = useState(diaSelecionado);

  function updateOuterTurma(novoDia) {
    if (novoDia === null) {
      novoDia = { value: "" };
    }
    setDia(novoDia);
    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].dia = novoDia.value;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };
    setLTurma(novaTurma);
  }

  /*
    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].dia = novoDia.value;

    let novaTurma = {
        ...lTurma,
        horarios: novosHorarios,
    };
  */

  return (
    <Select
      className="SelectList"
      placeholder="Dia"
      isClearable={true}
      options={dias}
      value={dia}
      // getOptionLabel={(option) => option.value}
      // getOptionValue={(option) => option.label}
      formatOptionLabel={({ value, label }, { context }) => {
        return context === "value" ? `${value}` : `${label}`;
      }}
      onChange={updateOuterTurma}
    />
  );
}

function SelectHoraTang(props) {
  const { lTurma, setLTurma, indexHorario } = props;
  let horarios = lTurma.horarios;
  let horario = horarios[indexHorario];

  let selectedHora = horario.horaInicio;
  let horasTang = options.constantValues.hoursTang;
  let horaSelecionada = horasTang.find(
    (hora) => parseInt(hora.hora) === parseInt(selectedHora)
  );
  const [hora, setHora] = useState(horaSelecionada);

  function updateOuterTurma(novaHoraTang) {
    if (novaHoraTang === null) {
      novaHoraTang = { hora: "" };
    }
    setHora(novaHoraTang);

    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].horaInicio = novaHoraTang.hora;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };

    setLTurma(novaTurma);
  }

  return (
    <Select
      className="SelectList"
      placeholder="Hora"
      options={horasTang}
      value={hora}
      isClearable={true}
      getOptionValue={(option) => option.hora}
      getOptionLabel={(option) => `${option.hora} (${option.turno})`}
      formatOptionLabel={({ hora, turno }, { context }) => {
        return context === "value" ? `${hora}` : `${hora} (${turno})`;
      }}
      onChange={updateOuterTurma}
    />
  );
}

function SelectDuracao(props) {
  const { lTurma, setLTurma, indexHorario } = props;
  let horarios = lTurma.horarios;
  let horario = horarios[indexHorario];

  let selectedDuracao = horario.duracao;
  let duracoes = options.constantValues.durations;
  let duracaoSelecionada = duracoes.find(
    (duracao) => duracao.value === selectedDuracao
  );
  const [duracao, setDuracao] = useState(duracaoSelecionada);

  function updateOuterTurma(novaDuracao) {
    if (novaDuracao === null) {
      novaDuracao = { value: "" };
    }
    setDuracao(novaDuracao);

    let novosHorarios = [...horarios];
    novosHorarios[indexHorario].duracao = novaDuracao.value;

    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };

    setLTurma(novaTurma);
  }

  return (
    <Select
      className="SelectList"
      placeholder="Duração"
      isClearable={true}
      options={duracoes}
      value={duracao}
      getOptionValue={(option) => option.value}
      onChange={updateOuterTurma}
    />
  );
}

function SelectCurso(props) {
  const { professorAtual, setNewProfessor } = props;
  let cursos = options.constantValues.courses;
  let foundCurso = cursos.find((curso) => curso.value === professorAtual.curso);

  const [curso, setCurso] = useState(foundCurso);

  function updateOuterProfessor(newCurso) {
    newCurso = newCurso || { value: "" };
    setCurso(newCurso);

    let novoProfessor = {
      ...professorAtual,
      curso: newCurso.value,
    };

    setNewProfessor(novoProfessor);
  }

  return (
    <Select
      className="SelectList"
      placeholder="Curso"
      isClearable
      options={cursos}
      onChange={updateOuterProfessor}
      value={curso}
      formatOptionLabel={({ value, label }, { context }) => {
        return context === "value"
          ? `(${value}) ${label}`
          : `(${value}) ${label}`;
      }}
    />
  );
}

function SelectLaboratorio(props) {
  const { professorAtual, setNewProfessor } = props;
  let laboratorios = options.constantValues.laboratorios;

  let foundLab = laboratorios.find(
    (lab) => lab.value === professorAtual.laboratorio
  );
  const [laboratorio, setLaboratorio] = useState(foundLab);

  function updateOuterProfessor(newLab) {
    newLab = newLab || { value: "" };
    setLaboratorio(newLab);

    let novoProfessor = {
      ...professorAtual,
      laboratorio: newLab.value,
    };

    setNewProfessor(novoProfessor);
  }

  return (
    <Select
      className="SelectList"
      placeholder="Laboratório"
      isClearable
      options={laboratorios}
      onChange={updateOuterProfessor}
      value={laboratorio}
      formatOptionLabel={({ value, label }, { context }) => {
        return context === "value"
          ? `(${value}) ${label}`
          : `(${value}) ${label}`;
      }}
    />
  );
}

export {
  SelectDia,
  SelectAno,
  SelectSala,
  SelectCurso,
  SelectDuracao,
  SelectSemestre,
  SelectHoraTang,
  SelectAnoTurma,
  SelectProfessor,
  SelectProfessorC,
  SelectDisciplina,
  SelectAnoSemestre,
  SelectLaboratorio,
  SelectSemestreTurma,
};
