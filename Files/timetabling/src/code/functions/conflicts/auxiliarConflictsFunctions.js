import options from "../../temp/options";
import { allLocalJsonData } from "../../../DB/dataFromJSON";

function testingTurmas2022_1() {
  let anos = options.constantValues.years;
  let ano = anos[8].value;

  let semestres = options.constantValues.semesters;
  let semestre = semestres[0].value;

  let turmas = allLocalJsonData.tests.turmasTesteAlunos;
  let turmas2022_1 = getTurmasPorAnoESemestre(turmas, ano, semestre);
  return turmas2022_1;
}

function splitTurmas(turmas) {
  let newSplittedTurmas = [];
  turmas.forEach((turma) => {
    turma.horarios.forEach((horario) => {
      let newTurma = { ...turma, ...horario };
      delete newTurma.horarios;
      newSplittedTurmas.push(newTurma);
    });
  });
  return newSplittedTurmas;
}

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
  let turmasDoAno = searchListForKeyWithValue(turmas, "ano", ano);
  let turmasDoSemestre = searchListForKeyWithValue(
    turmasDoAno,
    "semestre",
    semestre
  );

  if (!splitted) {
    return turmasDoSemestre;
  }
  let splittedTurmas = splitTurmas(turmasDoSemestre);

  return splittedTurmas;
}

function searchListForKeyWithValue(lista, chaveDaLista, valorAComparar) {
  /*
  O primeiro valor é uma lista de objetos
  O segundo valor é uma string que representa uma chave de cada um dos objetos da lista
  O terceiro valor é o valor que a chave deve ter para que o objeto seja retornado
  */
  let listaFiltrada = [];
  lista.forEach((elemento) => {
    if (elemento[chaveDaLista] === valorAComparar) {
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

export {
  testingTurmas2022_1,
  splitTurmas,
  getTurmasPorAnoESemestre,
  searchListForKeyWithValue,
  getNumeroDeConflitos,
};
