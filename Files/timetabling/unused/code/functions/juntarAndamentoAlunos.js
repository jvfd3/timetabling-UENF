import {
  allLocalJsonData,
  sqlDataFromJson,
} from "../../../src/DB/local/dataFromJSON";

juntarTodasAsInformacoes();

function juntarTodasAsInformacoes() {
  let alunos = allLocalJsonData.SQL.alunos;
  let geral = [];
  // let andamentoAlunosJsonData = allLocalJsonData.dynamic.andamentoAlunos;
  // let alunos_RS = allLocalJsonData.static.infoAlunos;
  // let alunosProgressao = andamentoAlunosJsonData;

  for (let i = 0; i < alunos.length; i++) {
    let filled_aluno = alunos[i];
    // let progressao_desse_aluno = alunosProgressao[filled_aluno.matricula];
    // let cursando = getNomesDasDisciplinas(progressao_desse_aluno.cursando);
    // let naofeitas = getNomesDasDisciplinas(progressao_desse_aluno.naofeitas);
    // let aprovadas = getNomesDasDisciplinas(progressao_desse_aluno.aprovadas);
    // filled_aluno["cursando"] = cursando;
    // filled_aluno["naofeitas"] = naofeitas;
    // filled_aluno["aprovadas"] = aprovadas;
    geral.push(filled_aluno);
  }
  return geral;
}

export { juntarTodasAsInformacoes };
