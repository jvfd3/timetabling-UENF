import db from "../db.js";

function defaultCreate(q, values, req, res) {
  let itemUpdated = req.route.path.split("/")[1];
  let toastMessage = `Item criado com sucesso: ${itemUpdated}(${values})`;
  db.query(q, [values], (err) => {
    return err ? res.json(err) : res.status(200).json(toastMessage);
  });
}

function createProfessor(req, res) {
  const q =
    "INSERT INTO professores(`laboratorio`, `curso`, `apelidoProfessor`, `nomeProfessor`) VALUES(?);";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.laboratorio,
    req.body.curso,
    req.body.apelidoProfessor,
    req.body.nomeProfessor,
  ];
  defaultCreate(q, values, req, res);
}

function createDisciplina(req, res) {
  const q =
    "INSERT INTO disciplinas(`periodoEsperado`, `codigoDisciplina`, `nomeDisciplina`, `apelidoDisciplina`) VALUES(?);";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.periodoEsperado,
    req.body.codigoDisciplina,
    req.body.nomeDisciplina,
    req.body.apelidoDisciplina,
  ];
  defaultCreate(q, values, req, res);
}

function createTurma(req, res) {
  const q =
    "INSERT INTO turmas(`ano`, `semestre`, `demandaEstimada`, `nomeProfessor`, `codigoDisciplina`) VALUES(?);";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.ano,
    req.body.semestre,
    req.body.demandaEstimada,
    req.body.nomeProfessor,
    req.body.codigoDisciplina,
  ];
  defaultCreate(q, values, req, res);
}

function createAluno(req, res) {
  const q =
    "INSERT INTO alunos(`nomeAluno`, `apelidoAluno`, `curso`, `periodo`, `matricula`) VALUES(?);";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.nomeAluno,
    req.body.apelidoAluno,
    req.body.curso,
    req.body.periodo,
    req.body.matricula,
  ];
  defaultCreate(q, values, req, res);
}

function createSala(req, res) {
  const q =
    "INSERT INTO salas(`blocoSala`, `capacidade`, `bloco`, `codigoSala`, `descricaoBloco`) VALUES(?);";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.blocoSala,
    req.body.capacidade,
    req.body.bloco,
    req.body.codigoSala,
    req.body.descricaoBloco,
  ];
  defaultCreate(q, values, req, res);
}

function defaultRead(res, q) {
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}

function readProfessores(_, res) {
  const q = "SELECT * FROM professores;";
  defaultRead(res, q);
}

function readDisciplinas(_, res) {
  const q = "SELECT * FROM disciplinas;";
  defaultRead(res, q);
}

function readTurmas(_, res) {
  const q = "SELECT * FROM turmas;";
  defaultRead(res, q);
}

function readAlunos(_, res) {
  const q = "SELECT * FROM alunos;";
  defaultRead(res, q);
}

function readSalas(_, res) {
  const q = "SELECT * FROM salas;";
  defaultRead(res, q);
}

function defaultUpdate(q, values, req, res) {
  let itemUpdated = req.route.path.split("/")[1];
  let toastMessage = `Atualização bem sucedida: ${itemUpdated} (id: ${req.params.id})`;
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json(toastMessage);
  });
}

function updateDisciplina(req, res) {
  const q =
    "UPDATE disciplinas SET `periodoEsperado` = ?, `codigoDisciplina` = ?, `nomeDisciplina` = ?, `apelidoDisciplina` = ? WHERE `iddisciplina` = ?;";

  const values = [
    req.body.periodoEsperado,
    req.body.codigoDisciplina,
    req.body.nomeDisciplina,
    req.body.apelidoDisciplina,
  ];
  defaultUpdate(q, values, req, res);
}

function updateProfessor(req, res) {
  const q =
    "UPDATE professores SET `laboratorio` = ?, `curso` = ?, `apelidoProfessor` = ?, `nomeProfessor` = ? WHERE `idprofessor` = ?;";

  const values = [
    req.body.laboratorio,
    req.body.curso,
    req.body.apelidoProfessor,
    req.body.nomeProfessor,
  ];
  defaultUpdate(q, values, req, res);
}

function updateTurma(req, res) {
  const q =
    "UPDATE turmas SET `ano` = ?, `semestre` = ?, `demandaEstimada` = ?, `nomeProfessor` = ?, `codigoDisciplina` = ? WHERE `idturma` = ?;";
  const values = [
    req.body.ano,
    req.body.semestre,
    req.body.demandaEstimada,
    req.body.nomeProfessor,
    req.body.codigoDisciplina,
  ];
  defaultUpdate(q, values, req, res);
}

function updateAluno(req, res) {
  const q =
    "UPDATE alunos SET `nomeAluno` = ?, `apelidoAluno` = ?, `curso` = ?, `periodo` = ?, `matricula` = ? WHERE `idaluno` = ?;";
  const values = [
    req.body.nomeAluno,
    req.body.apelidoAluno,
    req.body.curso,
    req.body.periodo,
    req.body.matricula,
  ];
  defaultUpdate(q, values, req, res);
}

function updateSala(req, res) {
  const q =
    "UPDATE salas SET `blocoSala` = ?, `capacidade` = ?, `bloco` = ?, `codigoSala` = ?, `descricaoBloco` = ? WHERE `idsala` = ?;";
  const values = [
    req.body.blocoSala,
    req.body.capacidade,
    req.body.bloco,
    req.body.codigoSala,
    req.body.descricaoBloco,
  ];
  defaultUpdate(q, values, req, res);
}

function defaultDelete(q, id, req, res) {
  let itemUpdated = req.route.path.split("/")[1];
  let toastMessage = `Deleção bem sucedida: ${itemUpdated} (id: ${id})`;
  db.query(q, [id], (err) => {
    return err ? res.json(err) : res.status(200).json(toastMessage);
  });
}

function deleteDisciplina(req, res) {
  const q = "DELETE FROM disciplinas WHERE `iddisciplina` = ?;";
  defaultDelete(q, req.params.id, req, res);
}

function deleteProfessor(req, res) {
  const q = "DELETE FROM professores WHERE `idprofessor` = ?;";
  defaultDelete(q, req.params.id, req, res);
}

function deleteTurma(req, res) {
  const q = "DELETE FROM turmas WHERE `idturma` = ?;";
  defaultDelete(q, req.params.id, req, res);
}

function deleteAluno(req, res) {
  const q = "DELETE FROM alunos WHERE `idaluno` = ?;";
  defaultDelete(q, req.params.id, req, res);
}

function deleteSala(req, res) {
  const q = "DELETE FROM salas WHERE `idsala` = ?;";
  defaultDelete(q, req.params.id, req, res);
}

export {
  createDisciplina,
  createProfessor,
  createTurma,
  createAluno,
  createSala,
  readDisciplinas,
  readProfessores,
  readTurmas,
  readAlunos,
  readSalas,
  updateDisciplina,
  updateProfessor,
  updateTurma,
  updateAluno,
  updateSala,
  deleteDisciplina,
  deleteProfessor,
  deleteTurma,
  deleteAluno,
  deleteSala,
};
