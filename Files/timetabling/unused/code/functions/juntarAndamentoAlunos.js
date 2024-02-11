import sqlDataFromJson from "../../../src/DB/local/dataFromJSON";

juntarTodasAsInformacoes();

function juntarTodasAsInformacoes() {
  let alunos = sqlDataFromJson.students;
  let geral = [];

  for (let i = 0; i < alunos.length; i++) {
    let filled_aluno = alunos[i];
    geral.push(filled_aluno);
  }
  return geral;
}

export { juntarTodasAsInformacoes };
