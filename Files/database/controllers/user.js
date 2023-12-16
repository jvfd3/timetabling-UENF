import { db } from "../db.js";

function defaultGet (res, q){
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.status(200).json(data);
  });
}

function getDisciplinas (_, res) {
  const q = "SELECT * FROM disciplinas";
  defaultGet(res, q);
}

function getProfessores (_, res) {
  const q = "SELECT * FROM professores";
  defaultGet(res, q);
}

function getSalas (_, res) {
  const q = "SELECT * FROM salas";
  defaultGet(res, q);
}

function getTurmas (_, res) {
  const q = "SELECT * FROM turmas";
  defaultGet(res, q);
}


function defaultAdd (q, values, res){
  db.query(q, [values], (err) => {
    let valueToReturn;
    valueToReturn = (err) ? res.json(err) : res.status(200).json("Item criado com sucesso.");
    return valueToReturn;
  });
}

function addProfessor (req, res) {
  const q =
    "INSERT INTO professores(`laboratorio`, `curso`, `apelidoProfessor`, `nomeProfessor`) VALUES(?)";
    /* Dá para usar o "...req.body"? */
    const values = [
    req.body.laboratorio,
    req.body.curso,
    req.body.apelidoProfessor,
    req.body.nomeProfessor
  ];
  defaultAdd(q, values, res);
}

function addDisciplina (req, res) {
  const q =
    "INSERT INTO disciplinas(`periodoEsperado`, `codigoDisciplina`, `nomeDisciplina`, `apelidoDisciplina`) VALUES(?)";
    /* Dá para usar o "...req.body"? */
    const values = [
    req.body.periodoEsperado,
    req.body.codigoDisciplina,
    req.body.nomeDisciplina,
    req.body.apelidoDisciplina
  ];
  defaultAdd(q, values, res);
}

function addSala (req, res) {
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
  defaultAdd(q, values, res);
}

function addTurma (req, res) {
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
  defaultAdd(q, values, res);
}

function getUsers (_, res) {
  const q = "SELECT * FROM usuarios";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

function addUser (req, res) {
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
};

function updateUser (req, res) {
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
};

function deleteUser (req, res) {
  const q = "DELETE FROM usuarios WHERE `id` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Usuário deletado com sucesso.");
  });
};


export {
  getDisciplinas,
  getProfessores,
  getSalas,
  getTurmas,
  getUsers,
  addProfessor,
  addDisciplina,
  addSala,
  addTurma,
  addUser,
  updateUser,
  deleteUser,
}