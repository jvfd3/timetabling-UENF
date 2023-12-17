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

export { TextInputNomeProfessor, TextInputApelidoProfessor };
