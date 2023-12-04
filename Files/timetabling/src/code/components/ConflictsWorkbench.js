import React from "react";
// import options from "../temp/options";
import "../CSS/defaultStyle.css";
import { allLocalJsonData } from "../../DB/dataFromJSON";
// import Tabela from "./Timetable";
import {
  testingTurmas2022_1,
  splitTurmas,
  andamentoToDemanda,
  //   getSplittedTurmasPorAnoESemestre,
  getTurmasDaSalaPorValorDoHorario,
  searchListForKeyWithValue,
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
