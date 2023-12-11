import "../CSS/defaultStyle.css";
import React, { useState } from "react";
import options from "../temp/options";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import Select from "react-select";

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
        let denseName = false;
        let nomeSeparado = option.nome.split(" ");
        let nomeDenso =
          nomeSeparado[0] + " " + nomeSeparado[nomeSeparado.length - 1];
        let name = denseName ? option.nome : nomeDenso;
        return name;
      }}
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
      novaSala = {blocoSala: ""};
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

export {
  SelectAno,
  SelectSemestre,
  SelectProfessor,
  SelectDisciplina,
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
};
