import "./multiTurmas.css";
import React, { useState, useEffect, useRef } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import {
  SelectSala,
  SelectDia,
  SelectHoraTang,
  SelectDuracao,
  SelectAnoSemestre,
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import { getTurmasDoAnoSemestre } from "../../../helpers/auxFunctions";
import { NumberInputMultiClassesExpectedDemand } from "../../../components/MyTextFields";
import {
  SmartCreateClassItem,
  SmartDeleteClassItem,
  SmartCreateClassTime,
  SmartDeleteClassTime,
} from "../../../components/Buttons/Smart/Smart";
import { getClassesData } from "../../../DB/retrieveData";
import { baseClassItemConflicts } from "../../../helpers/conflicts/centralConflicts";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import { InputDisciplina } from "../../../components/Buttons/Dumb/Dumb";
import { splitTurmas } from "../../../helpers/conflicts/auxiliarConflictsFunctions";
import { MultiClassesRefactor } from "./multiClasses";

function NotOfferedSubjects({ classesStates, currentSemesterProps }) {
  const { classes, setClasses, classIndex } = classesStates;
  const { year, semester } = currentSemesterProps;
  const yearValue = year?.value;
  const semesterValue = semester?.value;
  // console.log(semesterValue);
  // console.log("classes", classes);
  // Percorra cada turma em classes e preencha uma lista dos códigos das disciplinas oferecidas pelas classes
  const disciplinasOferecidas = classes
    .map((iterClassItem) => iterClassItem?.disciplina?.codigo)
    .filter(Boolean);
  // Neste código, filter(Boolean) remove todos os valores falsy do array, incluindo null e undefined.
  // console.log("disciplinasOferecidas", disciplinasOferecidas);

  const allSubjects = sqlDataFromJson.subjects;

  // Listar todas os código-nomes de disciplinas que são de semestre ímpar
  // Filtrar todas que são de periodoEsperado%2 == 1

  function checkParity(subject, semester) {
    const subjectParity = subject?.periodo % 2;
    const semesterParity = semester % 2;
    const sameParity = subjectParity === semesterParity;
    return sameParity;
  }
  const isSummerSemester = semesterValue === 3;
  const semesterSubject = !isSummerSemester
    ? allSubjects.filter((subject) => checkParity(subject, semesterValue))
    : allSubjects;

  // Percorrer cada disciplina em semesterSubject e, caso o código da disciplina esteja na lista de disciplinas oferecidas, remover da lista.
  const nonOfferedSubjects = semesterSubject.filter((disciplina) => {
    return !disciplinasOferecidas.includes(disciplina.codigo);
  });

  // console.log("nonOfferedSubjects", nonOfferedSubjects);

  function addSubjectsToClasses(subjects) {
    // console.log("subjects", subjects);
    const classesToAdd = subjects.map((subject) => {
      classIndex.current += 1;
      const blankClass = options.emptyObjects.classItem;
      const newClassItem = {
        ...blankClass,
        idTurma: `${yearValue}0${semesterValue}-${classIndex.current}`,
        disciplina: subject,
        ano: yearValue,
        semestre: semesterValue,
      };
      return newClassItem;
    });
    // console.log("classesToAdd", classesToAdd);
    setClasses([...classes, ...classesToAdd]);
  }

  // Se o período da disciplina for 1, aplicar o className EnfasePrimeiroPeriodo
  function SubjectsTableBody() {
    return (
      <tbody>
        {nonOfferedSubjects.map((iterSubject) => (
          <tr key={iterSubject.codigo}>
            <td
              className={
                iterSubject.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""
              }
            >
              <InputDisciplina
                text={`Criar uma turma para a disciplina ${iterSubject.codigo}`}
                insertDiscFunc={() => {
                  addSubjectsToClasses([iterSubject]);
                }}
              />
            </td>
            <td
              className={
                iterSubject.periodo === 1 ? "EnfasePrimeiroPeriodo" : ""
              }
            >
              {`${iterSubject.periodo} - (${iterSubject.codigo}) ${iterSubject.nome}`}
            </td>
          </tr>
        ))}
      </tbody>
    );
  }

  function TabelaDeDisciplinasASereOferecidas() {
    return (
      <div>
        <h1>
          Disciplinas ainda não oferecidas do
          {
            // Disciplinas do período{" "}
            // {semesterValue === 1 ? "ím" : ""}par ainda não oferecidas
            semesterValue === 1
              ? " período ímpar "
              : semesterValue === 2
              ? " período par "
              : "s períodos "
          }
        </h1>
        <table className="showBasicDataTable">
          <thead>
            <tr>
              <th>
                <InputDisciplina
                  size="4em"
                  text="Adicionar todas as turmas pendentes"
                  insertDiscFunc={() =>
                    addSubjectsToClasses(nonOfferedSubjects)
                  }
                />
              </th>
              <th>Período - (Código) Nome</th>
            </tr>
          </thead>
          <SubjectsTableBody />
        </table>
      </div>
    );
  }

  function DisciplinasMínimasForamOferecidas() {
    return (
      <div>
        <h1>Todas as disciplinas do período ímpar foram oferecidas 👍</h1>
      </div>
    );
  }

  return (
    <div>
      {nonOfferedSubjects.length === 0 ? (
        <DisciplinasMínimasForamOferecidas />
      ) : (
        <TabelaDeDisciplinasASereOferecidas />
      )}
    </div>
  );
}

function CRUDMultiClasses() {
  const defaultPageValue = options.constantValues.pageSelection.multiClasses;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <MultiClassesRefactor />
      {/* <MultiClasses /> */}
    </div>
  );
}

export default CRUDMultiClasses;
