import React, { useState, useEffect } from "react";
import options from "../temp/options";
import "../CSS/defaultStyle.css";
import { allLocalJsonData } from "../../DB/dataFromJSON";
import Tabela from "./Timetable";

function TabelaDeConflitos() {
  let anos = options.constantValues.years;
  let semestres = options.constantValues.semesters;
  let professores = allLocalJsonData.static.infoProfessores;
  let nomesDeProfessores = getNomesDeProfessores(professores);
  let turmas = allLocalJsonData.tests.turmasTesteConflitos;

  let ano = anos[8].value;
  let semestre = semestres[0].value;
  let professor = nomesDeProfessores[2];

  let turmasDesseSemestre = getTurmasDesseSemestre(turmas, ano, semestre);
  let turmasDoProfessor = getTurmasDoProfessor(turmasDesseSemestre, professor);
  let tabelaDeOcupacao = getTabelaDeOcupacao(turmasDoProfessor);
  let conflitosEncontrados = getConflitos(tabelaDeOcupacao);
  let numeroDeConflitos = getNumeroDeConflitos(conflitosEncontrados);
  // console.log("Procurando conflitos de:", ano, semestre, professor);
  // console.log("turmas do professor: ", turmasDoProfessor);
  // console.log("tabela de ocupação: ", tabelaDeOcupacao);
  // console.log("conflitos encontrados: ", conflitosEncontrados);
  console.log("numero de conflitos: ", numeroDeConflitos);

  function getNomesDeProfessores(listaDeProfessores) {
    let listaDeNomesDeProfessores = [];
    listaDeProfessores.forEach((professor) => {
      listaDeNomesDeProfessores.push(professor.nome);
    });
    return listaDeNomesDeProfessores;
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

  function getTurmasDoProfessor(turmas, professor) {
    let turmasDoProfessor = [];
    turmas.forEach((turma) => {
      if (turma.professor === professor) {
        turmasDoProfessor.push(turma);
      }
    });
    return turmasDoProfessor;
  }

  function getTabelaDeOcupacao(turmas) {
    let tabelaDeOcupacao = {};
    turmas.forEach((turma) => {
      turma.horarios.forEach((horario) => {
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
