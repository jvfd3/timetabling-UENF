import React, { useState } from "react";
import TextField from "@mui/material/TextField";

function TextInputNomeProfessor(props) {
  let { professor, setProfessor, inputRef1 } = props;
  const [nomeProfessor, setNomeProfessor] = useState(professor.nomeProfessor);
  const handleChange = (event) => {
    setNomeProfessor(event.target.value);
    setProfessor({ ...professor, nomeProfessor: event.target.value });
  };
  return (
    <TextField
      fullWidth
      id="Nome1"
      key="Nome2"
      label="Nome"
      variant="outlined"
      value={nomeProfessor}
      onChange={handleChange}
      inputRef={inputRef1}
    />
  );
}

function TextInputApelidoProfessor(props) {
  let { professor, setProfessor, inputRef2 } = props;
  const handleChange = (event) => {
    setProfessor({ ...professor, apelidoProfessor: event.target.value });
  };
  return (
    <TextField
      fullWidth
      id="Apelido1"
      key="Apelido2"
      label="Apelido"
      variant="outlined"
      defaultValue={professor.apelidoProfessor}
      onChange={handleChange}
      inputRef={inputRef2}
    />
  );
}

function NumberInputDemandaEstimada({ lTurma, setLTurma }) {
  const [demandaEstimada, setDemandaEstimada] = useState(
    lTurma.demandaEstimada
  );
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

export {
  TextInputNomeProfessor,
  TextInputApelidoProfessor,
  NumberInputDemandaEstimada,
};
