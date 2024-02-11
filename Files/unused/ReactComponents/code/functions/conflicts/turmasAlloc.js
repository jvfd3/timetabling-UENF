import React, { useState, useEffect } from "react";
import options from "../temp/options";
import "../CSS/defaultStyle.css";
import sqlDataFromJson from "../../DB/dataFromJSON";
import Tabela from "./Timetable";

/*
1. Aquisição dos dados
   1. Lista de salas
   2. Lista de aulas
2. Seleção dos valores base
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Selecionar uma sala
      1. Criar uma lista com os nomes de todas as salas
         1. Obs.: os nomes delas são a propriedade `blocoNome` do objeto
      2. Selecionar o nome da primeira sala
3. Filtragem dos dados
   1. Filtrar as aulas do ano e semestre selecionados
   2. Filtrar as aulas da sala selecionada
4. Checar o conflito
   1. Para cada turma, que terá aula nessa sala
      1. Obter dia, início e duração
      2. Preencher tabela de ocupação
         1. Para cada dia
            1. ir na hora de início e marcar como ocupado
            2. Fazer o mesmo para os {duração - 1} próximos horários
         2. Se o horário já estiver ocupado, marcar ambos como conflito
            1. Adiciona a uma lista o conjunto de horários que estão em conflito
5. Mostrar os conflitos
   1. console.log(lista de conflitos)
*/

function TabelaDeConflitos() {
  let anos = options.constantValues.years;
  let semestres = options.constantValues.semesters;
  let salas = allLocalJsonData.static.infoSalas;
  let nomesDeSalas = getNomesDeSalas(salas);
  let turmas = allLocalJsonData.tests.turmasTesteConflitosSala;

  let ano = anos[8].value;
  let semestre = semestres[0].value;
  let sala = nomesDeSalas[2];

  let turmasDesseSemestre = getTurmasDesseSemestre(turmas, ano, semestre);
  let turmasDaSala = getTurmasDaSala(turmasDesseSemestre, sala);
  let tabelaDeOcupacao = getTabelaDeOcupacao(turmasDaSala);
  let conflitosEncontrados = getConflitos(tabelaDeOcupacao);
  let numeroDeConflitos = getNumeroDeConflitos(conflitosEncontrados);
  // console.log("Procurando conflitos de:", ano, semestre, sala);
  // console.log("turmas do sala: ", turmasDaSala);
  // console.log("tabela de ocupação: ", tabelaDeOcupacao);
  // console.log("conflitos encontrados: ", conflitosEncontrados);
  console.log("numero de conflitos: ", numeroDeConflitos);

  function getNomesDeSalas(listaDeSalas) {
    let listaDeNomesDeSalas = [];
    listaDeSalas.forEach((sala) => {
      listaDeNomesDeSalas.push(sala.blocoSala);
    });
    return listaDeNomesDeSalas;
  }

  function getTurmasDesseSemestre(turmas, ano, semestre) {
    let turmasDesseSemestre = [];
    turmas.forEach((turma) => {
      if (turma.ano === ano && turma.semestre === semestre) {
        turmasDesseSemestre.push(turma);
      }
    });
    return turmasDesseSemestre;
  }

  function getTurmasDaSala(turmas, sala) {
    let turmasDaSala = [];
    turmas.forEach((turma) => {
      turma.horarios.forEach((horario) => {
        if (horario.sala === sala) {
          turmasDaSala.push({
            ...turma,
            horarios: horario,
          });
        }
      });
    });
    return turmasDaSala;
  }

  function getTabelaDeOcupacao(turmas) {
    let tabelaDeOcupacao = {};
    turmas.forEach((turma) => {
      /* Mudei aqui porque na função de cima, eu repeti as informações da sala para que cada horário fosse separado, porque não são todos os horários que estarão na mesma turma */
      let horario = turma.horarios;
      let horaInicio = parseInt(horario.horaInicio);
      let duracao = parseInt(horario.duracao);
      for (let i = 0; i < duracao; i++) {
        let horarioAtual = horaInicio + i;
        if (
          tabelaDeOcupacao[horario.dia] &&
          tabelaDeOcupacao[horario.dia][horarioAtual]
        ) {
          tabelaDeOcupacao[horario.dia][horarioAtual].push(turma.id);
        } else {
          if (!tabelaDeOcupacao[horario.dia]) {
            tabelaDeOcupacao[horario.dia] = {};
          }
          tabelaDeOcupacao[horario.dia][horarioAtual] = [turma.id];
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

  function getNumeroDeConflitos(conflitos) {
    let numeroDeConflitos = conflitos.length;
    /* let numeroDeConflitos = 0;
    conflitos.forEach((conflito) => {
      numeroDeConflitos += 1;
    }); */
    return numeroDeConflitos;
  }

  return (
    <div>
      <div>TABELONA</div>
    </div>
  );
}

export default TabelaDeConflitos;
