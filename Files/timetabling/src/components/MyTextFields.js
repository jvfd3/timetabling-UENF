import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

function TextInputNomeProfessor(props) {
  let { professores, setProfessores, professor, setProfessor } = props;
  // console.log("Tinp", professor);
  // console.log("Tinp>nome:", professor.nome);
  const [nomeProfessor, setNomeProfessor] = useState(professor.nome);

  console.log("a");
  useEffect(() => {
    console.log(professor.nome);
    setNomeProfessor(professor.nome);
  }, [professor.nome]);

  function updateNomeProfessor(event) {
    let newNome = event.target.value;
    let newProfessor = { ...professor, nome: newNome };
    setNomeProfessor(newNome);
    setProfessor(newProfessor);
  }

  return (
    <TextField
      fullWidth
      id="Nome1"
      key="Nome2"
      label="Nome"
      variant="outlined"
      value={nomeProfessor}
      onChange={updateNomeProfessor}
    />
  );
}

function TextInputApelidoProfessor(props) {
  let { professor, setProfessor } = props;
  const [apelidoProfessor, setApelidoProfessor] = useState(professor.apelido);

  useEffect(() => {
    setApelidoProfessor(professor.apelido);
  }, [professor.apelido]);

  function handleChange(event) {
    let newApelido = event.target.value;
    let newProfessor = { ...professor, apelido: newApelido };
    setApelidoProfessor(newApelido);
    setProfessor(newProfessor);
  }

  return (
    <TextField
      fullWidth
      id="Apelido1"
      key="Apelido2"
      label="Apelido do Professor"
      variant="outlined"
      value={apelidoProfessor}
      onChange={handleChange}
    />
  );
}

function NumberInputDemandaEstimada({ lTurma, setLTurma }) {
  const [demandaEstimada, setDemandaEstimada] = useState(
    lTurma.demandaEstimada || undefined
  );

  // console.log(lTurma);
  function handleDemandaEstimadaChange(value) {
    setDemandaEstimada(value);
    setLTurma({ ...lTurma, demandaEstimada: value });
  }
  return (
    <TextField
      fullWidth
      id={`DemandaEstimada-${lTurma.idTurma}`}
      label="Demanda Estimada"
      variant="outlined"
      type="number"
      value={demandaEstimada}
      inputProps={{ min: 0, max: 999, step: 1 }}
      onChange={(event) => handleDemandaEstimadaChange(event.target.value)}
    />
  );
}

function TextInputIdProfessor(props) {
  return (
    <TextField
      className="h"
      value={props.professor.id}
      // fullWidth
      label="ID do Professor"
      disabled
    />
  );
}

export {
  TextInputNomeProfessor,
  TextInputIdProfessor,
  TextInputApelidoProfessor,
  NumberInputDemandaEstimada,
};
