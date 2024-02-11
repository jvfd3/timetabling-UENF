import sqlDataFromJson from "../../DB/dataFromJSON";

function getPeriodoEsperado(codigoDisciplina) {
  let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.periodo;
}

function getNomeDisciplina(codigoDisciplina) {
  let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.nome;
}

function getApelidoDisciplina(codigoDisciplina) {
  let disciplina = allLocalJsonData.static.infoDisciplinasCC.find(
    (disciplina) => disciplina.codigo === codigoDisciplina
  );
  return disciplina.apelido;
}

function getApelidoProfessor(nomeProfessor) {
  let professor = allLocalJsonData.static.infoProfessores.find(
    (professor) => professor.nome === nomeProfessor
  );
  return professor.apelido;
}

function getTurmasDoAnoSemestre(turmas, ano, semestre) {
  let turmasDoAnoSemestre = turmas.filter((turma) => {
    return turma.ano === ano && turma.semestre === semestre;
  });
  return turmasDoAnoSemestre;
}

function getTurmasDaHora(turmas, hora) {
  /* Turmas splitted */
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
  const newArray = oldArray.map((professorAntigo) => {
    return professorAntigo.idprofessor === newProfessor.idprofessor
      ? newProfessor
      : professorAntigo;
  });
  return newArray;
}

import options from "../../DB/local/options";

function getTurmasPorAnoESemestre(turmas, ano, semestre, splitted = false) {
  /*
    Essa função retorna um array de turmas que acontecem no ano e semestre passados como parâmetro.
    Ela também expande os horários de cada turma em um objeto separado, para facilitar a análise de conflitos.
  */

  /* // How it was done before
  turmas.forEach((turma) => {
    if (turma.ano === ano && turma.semestre === semestre) {
      turma.horarios.forEach((horario) => {
        let newTurma = { ...turma, ...horario };
        delete newTurma.horarios;
        turmasDesseSemestre.push(newTurma);
      });
    }
  });
  */
  let turmasDoAno = searchListForKeyWithValue(turmas, ["ano"], ano);
  let turmasDoSemestre = searchListForKeyWithValue(
    turmasDoAno,
    ["semestre"],
    semestre
  );

  if (!splitted) {
    return turmasDoSemestre;
  }
  let splittedTurmas = splitTurmas(turmasDoSemestre);

  return splittedTurmas;
}

function searchListForKeyWithValue(
  lista,
  chavesDaLista,
  valorAComparar,
  verbose = false
) {
  /*
  O primeiro valor é uma lista de objetos
  O segundo valor é uma string que representa uma chave de cada um dos objetos da lista
  O terceiro valor é o valor que a chave deve ter para que o objeto seja retornado
  */
  let listaFiltrada = [];

  lista.forEach((elemento) => {
    // Obter valor da lista
    let valorDoElemento = elemento;
    if (verbose) console.log("valorDoElemento", valorDoElemento);
    // console.log("chavesDaLista", elemento[chavesDaLista[0]])
    for (let indexChave in chavesDaLista) {
      let chave = chavesDaLista[indexChave];
      valorDoElemento = valorDoElemento[chave];
      if (verbose) console.log("valorDoElemento", valorDoElemento);
    }
    if (verbose) console.log("valorAComparar", valorAComparar);
    if (valorDoElemento === valorAComparar) {
      listaFiltrada.push(elemento);
    }
  });
  return listaFiltrada;
}

function getNumeroDeConflitos(conflitos) {
  /* Alguma outra lógica de cálculo de conflitos pode ser usada posteriormente, mas por enquanto isso está bom por mim */
  let numeroDeConflitos = conflitos.length;
  return numeroDeConflitos;
}

function andamentoToDemanda(andamentos) {
  let disciplinasSendoCursadas = {};

  for (let matricula in andamentos) {
    let disciplinas = andamentos[matricula].cursando;
    disciplinas.forEach((disciplina) => {
      if (!disciplinasSendoCursadas[disciplina]) {
        disciplinasSendoCursadas[disciplina] = {
          alunosDemandando: [matricula],
        };
      } else {
        disciplinasSendoCursadas[disciplina].alunosDemandando.push(matricula);
      }
    });
  }
  return disciplinasSendoCursadas;
}

function getTurmasDaSalaPorValorDoHorario(turmas, chaves, valorAComparar) {
  let newTurmasDaSala = [];
  // console.log("a", turmas);
  turmas.forEach((turma) => {
    for (let indexHorario in turma[chaves[0]]) {
      let valorDoElemento = turma[chaves[0]][indexHorario][chaves[1]];
      // console.log("valorDoElemento", valorDoElemento);
      // console.log("valorAComparar", valorAComparar);
      if (valorDoElemento === valorAComparar) {
        newTurmasDaSala.push({ ...turma });
      }
    }
  });

  return newTurmasDaSala;
}

function getAtendimentoDeDemandas(turmas, disciplinasDemandadas) {
  /* Essa função deve percorrer a lista de disciplinas demandadas e verificar quantas turmas existem para cada uma delas
    Depois vai preencher o objeto de disciplinas demandadas com o número de turmas
    Com o seguinte formato:
    disciplinasDemandadas = {
      codigoDisciplina: {
        alunosDemandando: [matricula],
        numeroDeTurmas: 0
      }
    }
  */
  let atendimentoDeDisciplinas = { ...disciplinasDemandadas };
  for (let codigoDisciplina in disciplinasDemandadas) {
    // console.log("codigoDisciplina", codigoDisciplina);
    let turmasDessaDisciplina = searchListForKeyWithValue(
      turmas,
      ["disciplina", "codigo"],
      codigoDisciplina
    );
    // console.log("turmasDessaDisciplina", turmasDessaDisciplina);
    atendimentoDeDisciplinas[codigoDisciplina].turmas = turmasDessaDisciplina;
    atendimentoDeDisciplinas[codigoDisciplina].numeroDeTurmas =
      turmasDessaDisciplina.length;
  }
  return atendimentoDeDisciplinas;
}

/* Post refactor \/ */

// 2
function flattenTurma(classData, classTime) {
  const { horarios, ...rest } = classData;
  let newClassData = {
    ...rest,
    ...classTime,
  };
  return newClassData;
}

// 1
/* function splitTurmas(classes) {
  let splittedClasses = classes.flatMap((classData) =>
    classData.horarios.map((classTime) => flattenTurma(classData, classTime))
  );
  return splittedClasses;
} */

function splitTurmas(turmas) {
  let newSplittedTurmas = [];
  turmas.forEach((turma) => {
    if (turma.horarios !== null && turma.horarios.length > 0) {
      turma.horarios.forEach((horario) => {
        let newTurma = flattenTurma(turma, horario);
        newSplittedTurmas.push(newTurma);
      });
    } else {
      let newTurma = {
        ...options.emptyObjects.classTime,
        /* when I do that, the idHorario is null and it shouldn't. Check it later. */
        ...turma,
      };
      delete newTurma.horarios;
      newSplittedTurmas.push(newTurma);
    }
  });

  return newSplittedTurmas;
}

import options from "../DB/local/options";
import sqlDataFromJson from "../DB/local/dataFromJSON";
import { replaceNewItemInListById } from "./auxCRUD";

function debugFunc(debugClasses, message) {
  let debug = [];
  debugClasses.forEach((classe) => {
    debug.push(classe.idTurma);
  });
  let debugSet = new Set(debug.sort((a, b) => a - b));
  let debugArray = Array.from(debugSet);
  console.log(message, debugArray.length);
}

function getValueFromObject(myObject) {
  const objectValue = myObject?.hora ?? myObject?.value ?? myObject ?? null;
  return objectValue;
}

function getDefaultYearSemesterValues() {
  const years = options.constantValues.years;
  const yearIndex = options.config.defaultIndexes.year;
  const year = years[yearIndex];
  const yearValue = getValueFromObject(year);

  const semesters = options.constantValues.semesters;
  const semesterIndex = options.config.defaultIndexes.semester;
  const semester = semesters[semesterIndex];
  const semesterValue = getValueFromObject(semester);

  const yearSemester = {
    year: yearValue,
    semester: semesterValue,
  };

  return yearSemester;
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
  // debugFunc,
  // max,
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
