import { sqlDataFromJson } from "../DB/local/dataFromJSON";
import { getId, replaceNewItemInListById } from "./auxCRUD";

function debugFunc(debugClasses, message) {
  let debug = [];
  debugClasses.forEach((classe) => {
    debug.push(classe.idTurma);
  });
  let debugSet = new Set(debug.sort((a, b) => a - b));
  let debugArray = Array.from(debugSet);
  console.log(message, debugArray.length);
}

function getByIDturma(idTurma) {
  let turmas = sqlDataFromJson.classes;
  return turmas.find((turma) => turma.id === idTurma);
}

function getByIDhorario(idHorario) {
  let horarios = sqlDataFromJson.classtimes;
  return horarios.find((horario) => horario.id === idHorario);
}

function splittedToUnified(splittedTurmas) {
  let arr = splittedTurmas;
  // console.log(arr);
  let result = arr.reduce(
    (
      acc,
      {
        ano,
        idTurma,
        semestre,
        nomeProfessor,
        cursoProfessor,
        nomeDisciplina,
        demandaEstimada,
        apelidoProfessor,
        codigoDisciplina,
        periodoDisciplina,
        apelidoDisciplina,
        laboratorioProfessor,
        ...rest
      }
    ) => {
      let key = idTurma;
      if (!acc[key]) {
        acc[key] = {
          ano: ano,
          idTurma: idTurma,
          semestre: semestre,
          nomeProfessor: nomeProfessor,
          cursoProfessor: cursoProfessor,
          nomeDisciplina: nomeDisciplina,
          demandaEstimada: demandaEstimada,
          apelidoProfessor: apelidoProfessor,
          codigoDisciplina: codigoDisciplina,
          periodoDisciplina: periodoDisciplina,
          apelidoDisciplina: apelidoDisciplina,
          laboratorioProfessor: laboratorioProfessor,
          horarios: [],
        };
      }
      acc[key].horarios.push(rest);
      return acc;
    },
    {}
  );
  return Object.values(result);
}

function splittedToUnified2(splittedTurmas) {
  // console.log(splittedTurmas);
  let result = splittedTurmas.reduce(
    (
      acc,
      {
        ano,
        idTurma,
        semestre,
        professor,
        disciplina,
        demandaEstimada,
        ...rest
      }
    ) => {
      let key = idTurma;
      if (!acc[key]) {
        acc[key] = {
          ano: ano,
          idTurma: idTurma,
          semestre: semestre,
          professor: professor,
          disciplina: disciplina,
          demandaEstimada,
          horarios: [],
        };
      }
      acc[key].horarios.push(rest);
      return acc;
    },
    {}
  );
  return Object.values(result);
}

function splittedToUnified3(splittedTurmas) {
  let result = {};

  splittedTurmas.forEach(
    ({
      ano,
      idTurma,
      semestre,
      professor,
      disciplina,
      demandaEstimada,
      ...rest
    }) => {
      let key = idTurma;
      if (!result[key]) {
        result[key] = {
          ano: ano,
          idTurma: idTurma,
          semestre: semestre,
          professor: professor,
          disciplina: disciplina,
          demandaEstimada,
          horarios: [],
        };
      }
      result[key].horarios.push(rest);
    }
  );

  return Object.values(result);
}

function max(array) {
  return Math.max.apply(null, array);
}

function getPeriodoEsperado(codigoDisciplina) {
  let disciplina = sqlDataFromJson.subjects.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.periodo;
}

function getNomeDisciplina(codigoDisciplina) {
  let disciplina = sqlDataFromJson.subjects.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.nome;
}

function getApelidoDisciplina(codigoDisciplina) {
  let disciplina = sqlDataFromJson.subjects.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.apelido;
}

function getApelidoProfessor(nomeProfessor) {
  let professor = sqlDataFromJson.professors.find(
    (professor) => professor.nome === nomeProfessor
  );
  return professor.apelido;
}

function getTurmasDoAnoSemestre(turmas, ano, semestre) {
  let turmasDoAnoSemestre = turmas.filter((turma) => {
    let mesmoAno = turma.ano === ano;
    let mesmoSemestre = turma.semestre === semestre;
    return mesmoAno && mesmoSemestre;
  });
  return turmasDoAnoSemestre;
}

function getTurmasDaHora(turmas, hora) {
  // console.log("turmas", turmas);
  let turmasDaHora = turmas.filter((turma) => {
    return turma.horaInicio === hora;
  });
  return turmasDaHora;
}

function getTurmasDoDia(turmas, dia) {
  /* Turmas splitted */
  let turmasDoDia = turmas.filter((turma) => {
    return turma.dia === dia;
  });
  return turmasDoDia;
}

function getNomesDasDisciplinas(listaDeCodigos) {
  let listaDeCodigosNomes = [];
  for (let i = 0; i < listaDeCodigos.length; i++) {
    let codigoDisciplina = listaDeCodigos[i];
    let nomeDisciplina = getNomeDisciplina(codigoDisciplina);
    listaDeCodigosNomes.push({
      codigo: codigoDisciplina,
      nome: nomeDisciplina,
    });
  }
  return listaDeCodigosNomes;
}

function updateProfessorFromList(oldArray, newProfessor) {
  const newArray = replaceNewItemInListById(newProfessor, oldArray);
  return newArray;
}

/* Post refactor */

function getByIDdisciplina(idDisciplina) {
  let disciplinas = sqlDataFromJson.subjects;
  return disciplinas.find((disciplina) => disciplina.id === idDisciplina);
}

function getByIDprofessor(idProfessor) {
  let professores = sqlDataFromJson.professors;
  return professores.find((professor) => professor.id === idProfessor);
}

function getByIDsala(idSala) {
  let salas = sqlDataFromJson.rooms;
  return salas.find((sala) => sala.id === idSala);
}

function getTurmas() {
  let turmas = sqlDataFromJson.classes;
  let filledTurmas = turmas.map((turma) => {
    let newTurma = {
      ...turma,
      idTurma: turma.id,
      disciplina: getByIDdisciplina(turma.idDisciplina),
      professor: getByIDprofessor(turma.idProfessor),
    };
    delete newTurma.id;
    delete newTurma.idDisciplina;
    delete newTurma.idProfessor;
    return newTurma;
  });
  return filledTurmas;
}

function getHorarios() {
  let horarios = sqlDataFromJson.classtimes;
  let filledHorarios = horarios.map((horario) => {
    let newHorario = {
      ...horario,
      idHorario: horario.id,
      sala: getByIDsala(horario.idSala),
    };
    delete newHorario.id;
    delete newHorario.idSala;
    return newHorario;
  });
  return filledHorarios;
}

function joinTurmasAndHorarios(turmas, classTimes) {
  let filledClassTimesAndTurmas = turmas.map((turma) => {
    let currentClassTimes = classTimes.filter(
      (iterTimes) => iterTimes.idTurma === turma.idTurma
    );
    let newTurma = {
      ...turma,
    };
    newTurma.horarios = currentClassTimes.length > 0 ? currentClassTimes : [];
    if (newTurma.ano === 2025) {
      // console.log("newTurma", newTurma);
    }
    return newTurma;
  });
  // console.log(
  //   "filledClassTimesAndTurmas",
  //   filledClassTimesAndTurmas[filledClassTimesAndTurmas.length - 1]
  // );
  return filledClassTimesAndTurmas;
}

function getFullHorarios() {
  let filledTurmas = getTurmas();
  // console.log("filledTurmas", filledTurmas);
  let filledClassTimes = getHorarios();
  let classTimes = joinTurmasAndHorarios(filledTurmas, filledClassTimes);
  // console.log("classTimes", classTimes[classTimes.length - 1]);
  return classTimes;
}

export {
  debugFunc,
  max,
  getFullHorarios,
  splittedToUnified,
  splittedToUnified2,
  splittedToUnified3,
  getPeriodoEsperado,
  getNomeDisciplina,
  getApelidoDisciplina,
  getNomesDasDisciplinas,
  getApelidoProfessor,
  getTurmasDoAnoSemestre,
  getTurmasDaHora,
  getTurmasDoDia,
  updateProfessorFromList,
};
