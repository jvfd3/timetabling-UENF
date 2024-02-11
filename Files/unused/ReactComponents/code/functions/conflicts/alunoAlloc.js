import React, { useState, useEffect } from "react";
import options from "../temp/options";
import "../CSS/defaultStyle.css";
import sqlDataFromJson from "../../DB/dataFromJSON";
import Tabela from "./Timetable";
import {
  getTurmasPorAnoESemestre,
  getNumeroDeConflitos,
} from "../functions/conflicts/auxiliarConflictsFunctions";

/*  3. Um aluno com duas aulas ao mesmo tempo
1. Padrão
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Lista de turmas
   4. Filtrar as turmas do ano e semestre selecionados
2. Aquisição dos dados
   1. Lista de alunos
   2. Selecionar um aluno
      1. Criar uma lista com as matrículas de todos alunos
      2. Selecionar uma das matrículas
3. Filtrar as turmas referentes à matrícula
   1. Atualmente tem duas formas:
      1. tem a lista de disciplinas que o aluno tá cursando
      2. E também tem a lista de alunos que estão na turma
   2. Usarei a primeira
   3. Retorna a lista de códigos de disciplinas que o aluno deseja cursar
4. Preencher tabela de ocupação
   1. Para cada disciplina que o aluno deseja cursar
      1. Procurar se há turma disponível para essa disciplina
      2. Se não houver, adicionar à lista `Demandado mas não ofertado`
      3. Se houver, obter dia, início e duração
         1. Adicionar à matriz de ocupação
5. Checar o conflito
   1. Para cada um dos dias da matriz de ocupação
      1. para cada um dos horários
         1. Se a lista for maior de 1,
            1. Adiciona a uma lista o conjunto de horários que estão em conflito
6. Mostrar os conflitos
   1. console.log(lista de conflitos)

*/

function TabelaDeConflitos() {
  let anos = options.constantValues.years;
  let ano = anos[8].value;

  let semestres = options.constantValues.semesters;
  let semestre = semestres[0].value;

  let turmas = allLocalJsonData.tests.turmasTesteAlunos;
  let turmasDesseSemestre = getTurmasPorAnoESemestre(turmas, ano, semestre);

  let alunos = allLocalJsonData.dynamic.andamentoAlunos;
  let matriculasDeAlunos = getMatriculasAlunos(alunos);
  let matricula = matriculasDeAlunos[93];

  let disciplinasDoAluno = alunos[matricula].cursando;
  let turmasDoAluno = getTurmasDoAluno(turmasDesseSemestre, disciplinasDoAluno);
  let tabelaDeOcupacao = getTabelaDeOcupacao(turmasDoAluno);
  let conflitosEncontrados = getConflitos(tabelaDeOcupacao);
  let numeroDeConflitos = getNumeroDeConflitos(conflitosEncontrados);

  console.log("Checando conflitos de:", ano, semestre, matricula);
  // console.log("Turmas desse semestre: ", turmasDesseSemestre);
  // console.log("disciplinas do aluno: ", disciplinasDoAluno)
  // console.log("turmas do aluno", turmasDoAluno)
  // console.log("Procurando conflitos de:", ano, semestre, sala);
  // console.log("turmas do sala: ", turmasDoAluno);
  console.log("tabela de ocupação: ", tabelaDeOcupacao);
  console.log("conflitos encontrados: ", conflitosEncontrados);
  console.log("numero de conflitos: ", numeroDeConflitos);

  function getMatriculasAlunos(listaDeAlunos) {
    return Object.keys(listaDeAlunos);
  }

  function getTurmasDoAluno(turmasDesseSemestre, disciplinasDoAluno) {
    let turmasDoAluno = [];
    turmasDesseSemestre.forEach((turma) => {
      if (disciplinasDoAluno.includes(turma.disciplina.codigo)) {
        turmasDoAluno.push(turma);
      }
    });
    return turmasDoAluno;
  }

  function getTabelaDeOcupacao(turmas) {
    let tabelaDeOcupacao = {};
    turmas.forEach((turma) => {
      /* Mudei aqui porque na função de cima, eu repeti as informações da sala para que cada horário fosse separado, porque não são todos os horários que estarão na mesma turma */
      let horaInicio = parseInt(turma.horaInicio);
      let duracao = parseInt(turma.duracao);
      for (let i = 0; i < duracao; i++) {
        let horarioAtual = horaInicio + i;
        if (
          tabelaDeOcupacao[turma.dia] &&
          tabelaDeOcupacao[turma.dia][horarioAtual]
        ) {
          tabelaDeOcupacao[turma.dia][horarioAtual].push(turma.id);
        } else {
          if (!tabelaDeOcupacao[turma.dia]) {
            tabelaDeOcupacao[turma.dia] = {};
          }
          tabelaDeOcupacao[turma.dia][horarioAtual] = [turma.id];
        }
      }
    });
    return tabelaDeOcupacao;
  }

  function getConflitos(tabelaDeOcupacao) {
    let conflitos = [];
    for (let dia in tabelaDeOcupacao) {
      for (let horario in tabelaDeOcupacao[dia]) {
        if (tabelaDeOcupacao[dia][horario].length > 1) {
          conflitos.push({
            dia: dia,
            horario: horario,
            turmas: tabelaDeOcupacao[dia][horario],
          });
        }
      }
    }
    return conflitos;
  }

  return (
    <div>
      <div>TABELONA</div>
    </div>
  );
}

export default TabelaDeConflitos;
