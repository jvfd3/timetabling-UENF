import React from "react";
// import options from "../temp/options";
import "../CSS/defaultStyle.css";
import { allLocalJsonData, sqlDataFromJson } from "../../DB/dataFromJSON";
// import Tabela from "./Timetable";
import {
  testingTurmas2022_1,
  andamentoToDemanda,
  getTurmasDaSalaPorValorDoHorario,
  getAtendimentoDeDemandas,
} from "../functions/conflicts/auxiliarConflictsFunctions";

/* #### Capacidade da sala

1. Padrão
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Lista de turmas
   4. Filtrar as turmas do ano e semestre selecionados
2. Aquisição dos dados
   1. Lista de informações das salas
      1. Selecionar uma sala
   2. Selecionar todas as turmas que têm aula nessa sala (splitted)
   3. Para cada turma
      1. Agrupar as turmas por disciplina
         1. Calcular as demandas dos alunos para essas disciplinas
   4. Com isso finalizamos com a seguinte estrutura
      1. `SalaEscolhida`
      2. `turmasDaSala`
      3. `codigoDisciplina`
         1. `listaDeAlunos`
         2. `listaDeTurmas`
         3. `numeroDeAlunos`
         4. `numeroDeTurmas`
3. Checar o conflito
   1. Para cada turma da sala
      1. Se `codigoDisciplina.numeroDeTurmas` == 1:
         1. Se `codigoDisciplina.numeroDeAlunos` > `SalaEscolhida.capacidade`:
            1. Adiciona em uma lista o conjunto de horários que estão em conflito
      2. Se `codigoDisciplina.numeroDeTurmas` != 1:
         1. Se `codigoDisciplina.numeroDeTurmas` > 1:
            1. Para cada turma em `codigoDisciplina.listaDeTurmas`
               1. obter a sala com menor capacidade dentre os horários
               2. somar as menores capacidades
            2. Se a soma for menor que `codigoDisciplina.numeroDeAlunos`:
               1. Adiciona em uma lista o conjunto de horários que estão em conflito
4. Mostrar os conflitos
*/

function ConflitosDeCapacidadesDeSala() {
  let infoSalas = allLocalJsonData.tests.capacidadeSalas;
  let salaEscolhida = infoSalas[2]; /* 0: A, 1: B, 2: C */

  let andamentos = allLocalJsonData.tests.demandaAndamentoAlunos;
  let demandaPorDisciplina = andamentoToDemanda(andamentos);

  let turmas = allLocalJsonData.tests.demandaTurmas;
  let turmasAtuais = testingTurmas2022_1(turmas);

  let turmasDaSala = getTurmasDaSalaPorValorDoHorario(
    turmasAtuais,
    ["horarios", "sala"],
    salaEscolhida.blocoSala
  );

  // let disciplinasNessaSala = getDisciplinasNessaSala(turmasDaSala);
  // console.log("disciplinasNessaSala", disciplinasNessaSala);
  // console.log("turmasDaSata", turmasDaSala);
  // let splittedTurmas = splitTurmas(turmasDaSala);

  // let conflitosDeCapacidadesIndividuais = getConflitoCapacidadeIndividual(
  //   splittedTurmas,
  //   salaEscolhida,
  //   demandaPorDisciplina
  // );

  let conflitosMultiturmas = getConflitosMultiturmas(
    turmasAtuais,
    salaEscolhida,
    demandaPorDisciplina
  );

  function getDisciplinasNessaSala(turmasDaSala) {
    let disciplinasNessaSala = [];
    turmasDaSala.forEach((turma) => {
      let codigoDisciplina = turma.disciplina.codigo;
      if (!disciplinasNessaSala.includes(codigoDisciplina)) {
        disciplinasNessaSala.push(codigoDisciplina);
      }
    });
    return disciplinasNessaSala;
  }

  function getConflitosMultiturmas(
    turmasAtuais,
    salaEscolhida,
    demandaPorDisciplina
  ) {
    function getDisciplinasComMaisDeUmaTurma(atendimentoDeDemandas) {
      let disciplinasComMaisDeUmaTurma = {};
      for (let codigoDisciplina in atendimentoDeDemandas) {
        let numeroDeTurmas =
          atendimentoDeDemandas[codigoDisciplina].numeroDeTurmas;
        if (numeroDeTurmas > 1) {
          disciplinasComMaisDeUmaTurma[codigoDisciplina] =
            atendimentoDeDemandas[codigoDisciplina];
        }
      }
      return disciplinasComMaisDeUmaTurma;
    }

    function getDisciplinasMinistradasNaSala(turmasAtuais, salaEscolhida) {
      let codigoSala = salaEscolhida.blocoSala;
      // console.log("codigoSala", codigoSala);
      let disciplinasMinistradasNaSala = getTurmasDaSalaPorValorDoHorario(
        turmasAtuais,
        ["horarios", "sala"],
        codigoSala
      );

      // console.log("disciplinasMinistradasNaSala", disciplinasMinistradasNaSala);
    }

    let conflitosMultiturmas = [];
    let atendimentoDeDemandas = getAtendimentoDeDemandas(
      turmasAtuais,
      demandaPorDisciplina,
      true
    );
    // console.log("atendimentoDeDemandas", atendimentoDeDemandas)
    let salaPorHorarioPorDisciplina = getSalaPorHorarioPorDisciplina(
      atendimentoDeDemandas
    );
    console.log("salaPorHorarioPorDisciplina", salaPorHorarioPorDisciplina);
    let capacidades = convertToCapacidades(salaPorHorarioPorDisciplina);
    checarConflitos(capacidades, atendimentoDeDemandas);

    function checarConflitos(
      capacidades,
      atendimentoDeDemandas,
      salaPorHorarioPorDisciplina
    ) {
      function plural(numero) {
        return numero > 1 ? "s" : "";
      }
      let conflitos = [];
      // console.log("capacidades", capacidades);
      // console.log("atendimentoDeDemandas", atendimentoDeDemandas);
      for (let codigoDisciplina in capacidades) {
        let demandaDaDisciplina = atendimentoDeDemandas[codigoDisciplina];
        let numeroDeAlunosDemandando =
          demandaDaDisciplina.alunosDemandando.length;
        // console.log("numeroDeAlunosDemandando", numeroDeAlunosDemandando)
        // console.log("capacidades[codigoDisciplina]", capacidades[codigoDisciplina])
        for (let periodo in capacidades[codigoDisciplina]) {
          let capacidade = capacidades[codigoDisciplina][periodo];
          // console.log("capacidade", capacidade)
          if (numeroDeAlunosDemandando > capacidade) {
            let msg = "";
            msg += `A disciplina ${codigoDisciplina} `;
            msg +=
              `tem demanda de ${numeroDeAlunosDemandando} aluno` +
              plural(numeroDeAlunosDemandando);
            msg +=
              ` mas apenas está comportando ${capacidade} aluno` +
              plural(capacidade);
            msg += ` na sala ${salaEscolhida.blocoSala}`;
            conflitos.push(msg);
          }
        }
      }
      console.log(conflitos);
    }

    function convertToCapacidades(salaPorHorarioPorDisciplina) {
      /* Começa com a seguinte estrutura:
      {
        "INF12345": {
          1: ["A", "B", ...],
          2: ["A", "B", ...],
          ...
        },
        "INF12345": {
          1: ["A", "B", ...],
          2: ["A", "B", ...],
          ...
        },
      }
      */
      let capacidades = {};
      for (let disciplina in salaPorHorarioPorDisciplina) {
        /* Agora percorre cada um dos códigos das disciplinas */
        capacidades[disciplina] = {};
        let periodos = salaPorHorarioPorDisciplina[disciplina];
        /* Esse aqui são todos os períodos de horários dessa disciplina */
        // console.log("PeriodoDaDisciplina", periodos)
        for (let periodo in periodos) {
          capacidades[disciplina][periodo] = 0;
          // console.log("periodo", periodo)
          /* Para cada período contido nos períodos */
          let salas = periodos[periodo];
          /* Obtém quai são as salas de todas as turmas desse período */
          // console.log("periodo", periodo)
          // console.log("salas", salas)
          salas.forEach((blocoSala) => {
            // console.log("BS", blocoSala)
            let sala = infoSalas.find((sala) => sala.blocoSala === blocoSala);
            /* Agora descobre quais são as informações completas dessa sala */
            let capacidadeAtual = sala.capacidade;
            capacidades[disciplina][periodo] += capacidadeAtual;
          });
        }
      }
      // console.log("capacidades", capacidades)
      return capacidades;
    }

    function getSalaPorHorarioPorDisciplina(atendimentoDeDemandas) {
      let capacidadesPorHorario = {};
      for (let codigoDisciplina in atendimentoDeDemandas) {
        /* para cada codigo de disciplina oferecida */
        let turmasDessaDisciplina =
          atendimentoDeDemandas[codigoDisciplina].turmas;
        /* eu pego a lista de turmas dessa disciplina */
        let salasPorPeriodo = {};
        /* Eu quero armazenar:
          {
            periodo1: [sala1, sala2, ...],
            periodo2: [sala1, sala2, ...]
          }
        */

        turmasDessaDisciplina.forEach((turma) => {
          /* para cada turma dessa disciplina */
          turma.horarios.forEach((horario, index) => {
            if (!salasPorPeriodo[index + 1]) {
              salasPorPeriodo[index + 1] = [horario.sala];
            } else {
              salasPorPeriodo[index + 1].push(horario.sala);
            }
          });
          // console.log("turmas da disciplina", turma.disciplina)
        });
        // console.log("salasPorPeriodo", salasPorPeriodo)
        capacidadesPorHorario[codigoDisciplina] = salasPorPeriodo;
      }
      // console.log("capacidadesPorHorario", capacidadesPorHorario)
      return capacidadesPorHorario;
    }

    return conflitosMultiturmas;
  }

  function getConflitoCapacidadeIndividual(
    turmasDaSala,
    salaEscolhida,
    demandaPorDisciplina
  ) {
    let capacidade = salaEscolhida.capacidade;
    let conflitosDeCapacidadesIndividuais = [];
    turmasDaSala.forEach((turma) => {
      let codigoDisciplina = turma.disciplina.codigo;
      // console.log("codigoDisciplina", codigoDisciplina);
      let teste = demandaPorDisciplina[codigoDisciplina];
      // console.log("teste", teste);
      let alunos = teste.alunosDemandando;
      let numeroDeAlunos = alunos.length;
      // console.log("numeroDeAlunos", numeroDeAlunos, ">?>", capacidade);
      if (numeroDeAlunos > capacidade) {
        conflitosDeCapacidadesIndividuais.push({
          disciplina: codigoDisciplina,
          sala: salaEscolhida,
          capacidade: capacidade,
          numDemanda: numeroDeAlunos,
          alunos: alunos,
        });
      }
    });
    return conflitosDeCapacidadesIndividuais;
  }

  function TabelaDemandasAtendidas() {
    return <div></div>;
  }

  return (
    <div>
      <TabelaDemandasAtendidas />
    </div>
  );
}

export default ConflitosDeCapacidadesDeSala;
