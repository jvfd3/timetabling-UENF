import React, { useState } from "react";
import options from "../temp/options";
import "../CSS/defaultStyle.css";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import Select from "react-select";

function SelectAno() {
  let anos = options.constantValues.years;
  const [ano, setAno] = useState(anos[0]);
  return (
    <Select
      className="SelectList"
      placeholder="Ano"
      options={anos}
      value={ano}
      onChange={setAno}
    />
  );
}

function SelectSemestre() {
  let semestres = options.constantValues.semesters;
  const [semestre, setSemestre] = useState(semestres[0]);
  return (
    <Select
      className="SelectList"
      placeholder="Semestre"
      options={semestres}
      value={semestre}
      onChange={setSemestre}
    />
  );
}

function SelectDisciplina(props) {
  const { dTurma, setDTurma } = props;

  let disciplinas = allLocalJsonData.static.infoDisciplinasCC;
  let disciplinaSelecionada = disciplinas.find(
    (disciplina) => disciplina.codigo === dTurma.disciplina.codigo
  );

  const [disciplina, setDisciplina] = useState(disciplinaSelecionada);

  function updateOuterTurma(novaDisciplina) {
    if (novaDisciplina === null) {
      novaDisciplina = { codigo: "", nome: "" };
    }
    setDisciplina(novaDisciplina);
    let novaTurma = {
      ...dTurma,
      disciplina: {
        codigo: novaDisciplina.codigo,
        nome: novaDisciplina.nome,
      },
    };
    setDTurma(novaTurma);
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
  const { pTurma, setPTurma } = props;

  let professores = allLocalJsonData.static.infoProfessores;
  let professorSelecionado = professores.find(
    (professor) => professor.nome === pTurma.professor
  );
  const [professor, setProfessor] = useState(professorSelecionado);

  function updateOuterTurma(novoProfessor) {
    if (novoProfessor === null) {
      novoProfessor = { nome: "" };
    }
    setProfessor(novoProfessor);
    let novaTurma = {
      ...pTurma,
      professor: novoProfessor.nome,
    };
    setPTurma(novaTurma);
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
  const { sTurma, setSTurma, indexHorario } = props;

  let salas = allLocalJsonData.static.infoSalas;
  let horarios = sTurma.horarios;
  let selectedSala = horarios[indexHorario - 1].sala;
  let salaSelecionada = salas.find((sala) => sala.blocoSala === selectedSala);

  const [sala, setSala] = useState(salaSelecionada);

  function updateOuterTurma(novaSala) {
    if (novaSala === null) {
      novaSala = { blocoSala: "" };
    }
    setSala(novaSala);
    let novaTurma = {
      ...sTurma,
      horarios: [
        ...horarios,
        (horarios[indexHorario - 1].sala = novaSala.blocoSala),
      ],
    };
    setSTurma(novaTurma);
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
  let horario = horarios[indexHorario - 1];
  let selectedDia = horario.dia;

  let diaSelecionado = dias.find((dia) => dia.value === selectedDia);
  const [dia, setDia] = useState(diaSelecionado);

  function updateOuterTurma(novoDia) {
    if (novoDia === null) {
      novoDia = { value: "" };
    }
    setDia(novoDia);
    let novaTurma = {
      ...lTurma,
      horarios: [...horarios, (horarios[indexHorario - 1].dia = novoDia.value)],
    };
    setLTurma(novaTurma);
  }

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
  let horario = horarios[indexHorario - 1];

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
    let novaTurma = {
      ...lTurma,
      horarios: [
        ...horarios,
        (horarios[indexHorario - 1].horaInicio = novaHoraTang.hora),
      ],
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
  let horario = horarios[indexHorario - 1];

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
    let novaTurma = {
      ...lTurma,
      horarios: [
        ...horarios,
        (horarios[indexHorario - 1].duracao = novaDuracao.value),
      ],
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
