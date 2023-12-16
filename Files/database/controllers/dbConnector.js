import { db } from "../db.js";

function defaultRead(res, q) {
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}

function readDisciplinas(_, res) {
  const q = "SELECT * FROM disciplinas";
  defaultRead(res, q);
}

function readProfessores(_, res) {
  const q = "SELECT * FROM professores";
  defaultRead(res, q);
}

function readTurmas(_, res) {
  const q = "SELECT * FROM turmas";
  defaultRead(res, q);
}

function readSalas(_, res) {
  const q = "SELECT * FROM salas";
  defaultRead(res, q);
}

function defaultCreate(q, values, res) {
  db.query(q, [values], (err) => {
    return err
      ? res.json(err)
      : res.status(200).json("Item criado com sucesso.");
  });
}

function createDisciplina(req, res) {
  const q =
    "INSERT INTO disciplinas(`periodoEsperado`, `codigoDisciplina`, `nomeDisciplina`, `apelidoDisciplina`) VALUES(?)";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.periodoEsperado,
    req.body.codigoDisciplina,
    req.body.nomeDisciplina,
    req.body.apelidoDisciplina,
  ];
  defaultCreate(q, values, res);
}

function createProfessor(req, res) {
  const q =
    "INSERT INTO professores(`laboratorio`, `curso`, `apelidoProfessor`, `nomeProfessor`) VALUES(?)";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.laboratorio,
    req.body.curso,
    req.body.apelidoProfessor,
    req.body.nomeProfessor,
  ];
  defaultCreate(q, values, res);
}

function createTurma(req, res) {
  const q =
    "INSERT INTO turmas(`ano`, `semestre`, `demandaEstimada`, `nomeProfessor`, `codigoDisciplina`) VALUES(?)";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.ano,
    req.body.semestre,
    req.body.demandaEstimada,
    req.body.nomeProfessor,
    req.body.codigoDisciplina,
  ];
  defaultCreate(q, values, res);
}

function createSala(req, res) {
  const q =
    "INSERT INTO salas(`blocoSala`, `capacidade`, `bloco`, `codigoSala`, `descricaoBloco`) VALUES(?)";
  /* Dá para usar o "...req.body"? */
  const values = [
    req.body.blocoSala,
    req.body.capacidade,
    req.body.bloco,
    req.body.codigoSala,
    req.body.descricaoBloco,
  ];
  defaultCreate(q, values, res);
}

function updateDisciplina(req, res) {
  const q =
    "UPDATE disciplinas SET `periodoEsperado` = ?, `codigoDisciplina` = ?, `nomeDisciplina` = ?, `apelidoDisciplina` = ? WHERE `iddisciplina` = ?";

  const values = [
    req.body.periodoEsperado,
    req.body.codigoDisciplina,
    req.body.nomeDisciplina,
    req.body.apelidoDisciplina,
  ];
  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Item atualizado com sucesso.");
  });
}

function updateProfessor(req, res) {
  const q =
    "UPDATE professores SET `laboratorio` = ?, `curso` = ?, `apelidoProfessor` = ?, `nomeProfessor` = ? WHERE `idprofessor` = ?";

  const values = [
    req.body.laboratorio,
    req.body.curso,
    req.body.apelidoProfessor,
    req.body.nomeProfessor,
  ];

  db.query(q, [...values, req.params.idprofessor], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Item atualizado com sucesso.");
  });
}

function updateTurma(req, res) {
  const q =
    "UPDATE turmas SET `ano` = ?, `semestre` = ?, `demandaEstimada` = ?, `nomeProfessor` = ?, `codigoDisciplina` = ? WHERE `idturma` = ?";
  const values = [
    req.body.ano,
    req.body.semestre,
    req.body.demandaEstimada,
    req.body.nomeProfessor,
    req.body.codigoDisciplina,
  ];

  db.query(q, [...values, req.params.idturma], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Item atualizado com sucesso.");
  });
}

function updateSala(req, res) {
  const q =
    "UPDATE salas SET `blocoSala` = ?, `capacidade` = ?, `bloco` = ?, `codigoSala` = ?, `descricaoBloco` = ? WHERE `idsala` = ?";
  const values = [
    req.body.blocoSala,
    req.body.capacidade,
    req.body.bloco,
    req.body.codigoSala,
    req.body.descricaoBloco,
  ];

  db.query(q, [...values, req.params.idsala], (err) => {
    if (err) return res.json(err);
    return res.status(200).json("Item atualizado com sucesso.");
  });
}

function defaultDelete(q, id, res) {
  db.query(q, [id], (err) => {
    return err
      ? res.json(err)
      : res.status(200).json("Item deletado com sucesso.");
  });
}

function deleteDisciplina(req, res) {
  const q = "DELETE FROM disciplinas WHERE `iddisciplina` = ?";
  defaultDelete(q, req.params.id, res);
}

function deleteProfessor(req, res) {
  const q = "DELETE FROM professores WHERE `id` = ?";
  defaultDelete(q, req.params.id, res);
}

function deleteTurma(req, res) {
  const q = "DELETE FROM turmas WHERE `id` = ?";
  defaultDelete(q, req.params.id, res);
}

function deleteSala(req, res) {
  const q = "DELETE FROM salas WHERE `id` = ?";
  defaultDelete(q, req.params.id, res);
}

function getUsers(_, res) {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
}

function addUser(req, res) {
  const q =
    "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES(?)";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário criado com sucesso.");
  });
}

function updateUser(req, res) {
  const q =
    "UPDATE usuarios SET `nome` = ?, `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?";

  const values = [
    req.body.nome,
    req.body.email,
    req.body.fone,
    req.body.data_nascimento,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário atualizado com sucesso.");
  });
}

function deleteUser(req, res) {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
}

export {
  createDisciplina,
  createProfessor,
  createTurma,
  createSala,
  readDisciplinas,
  readProfessores,
  readTurmas,
  readSalas,
  updateDisciplina,
  updateProfessor,
  updateTurma,
  updateSala,
  deleteDisciplina,
  deleteProfessor,
  deleteTurma,
  deleteSala,
  getUsers,
  addUser,
  updateUser,
  deleteUser,
};
