import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

/* DEFAULT TEXTINPUT */

function TextInputDefault(myStates) {
  let { generalStates, specificValues } = myStates;
  let { /* items, setItems,*/ item, setItem } = generalStates;
  let { mainValue, getNewItemObject, title, isNumeric } = specificValues;

  const [mainProp, setMainProp] = useState(mainValue);

  useEffect(() => {
    /* this useEffect serves to update internal values when it's changed outside */
    // console.log(mainValue);
    setMainProp(mainValue);
  }, [mainValue]);

  function numericValueFilter(value) {
    let newValue = null;
    // console.log("value", value);
    newValue = Number(value);
    if (newValue < 1) newValue = null;
    if (newValue > 9999) newValue = 9999;
    return newValue;
  }

  function updateValue(event) {
    let newValue = event.target.value;
    if (isNumeric) {
      newValue = numericValueFilter(newValue);
    }
    setMainProp(newValue);
    setItem(getNewItemObject(newValue));
  }

  let isId = title === "ID";
  let specificIDProps = isId ? { disabled: true } : {};
  let specificNumericProps = isNumeric
    ? {
        type: "number",
        inputProps: { min: 0, max: 999, step: 1 },
        inputMode: "numeric",
        pattern: "[0-9]*",
      }
    : {};

  return (
    <TextField
      fullWidth
      {...specificIDProps}
      {...specificNumericProps}
      id={`TextField ID: ${title}-${item?.id || item?.idTurma}`}
      key={`TextField Key: ${title}-${item?.id || item?.idTurma}`}
      label={`${title}`}
      variant="outlined"
      value={mainProp || ""}
      onChange={updateValue}
      style={{ width: "100%" }} // Adicionado para garantir que o TextField preencha todo o conteúdo
      disabled={isId}
    />
  );
}

/* \\ CRUD // */

/* \ Professor / */

function TextInputNomeProfessor(props) {
  let { professores, setProfessores, professor, setProfessor } = props;
  // console.log("Tinp", professor);
  // console.log("Tinp>nome:", professor.nome);
  const [nomeProfessor, setNomeProfessor] = useState(professor.nome);

  useEffect(() => {
    // console.log(professor.nome);
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

function NumberInputMultiClassesExpectedDemand(myClassStates) {
  let generalStates = {
    items: myClassStates.classes,
    setItems: myClassStates.setClasses,
    item: myClassStates.class,
    setItem: myClassStates.setClass,
  };
  let specificValues = {
    mainValue: myClassStates.class.demandaEstimada,
    getNewItemObject: (newValue) => {
      return { ...myClassStates.class, demandaEstimada: newValue };
    },
    title: "Demanda Estimada",
    isNumeric: true,
  };
  let capacityStates = { generalStates, specificValues };
  return <TextInputDefault {...capacityStates} />;
}

/* \ Subject / */

function TextInputCodigoDisciplina(myDisciplinasStates) {
  let { disciplinas, setDisciplinas, disciplina, setDisciplina } =
    myDisciplinasStates;
  // console.log("TiCD", disciplina);
  // console.log("TiCD>codigo:", disciplina.codigo);
  const [codigoDisciplina, setCodigoDisciplina] = useState(disciplina.codigo);

  useEffect(() => {
    // console.log(disciplina.codigo);
    setCodigoDisciplina(disciplina.codigo);
  }, [disciplina.codigo]);

  function updateCodigoDisciplina(event) {
    let newCodigo = event.target.value;
    let newDisciplina = { ...disciplina, codigo: newCodigo };
    setCodigoDisciplina(newCodigo);
    setDisciplina(newDisciplina);
  }

  return (
    <TextField
      fullWidth
      id="Codigo1"
      key="Codigo2"
      label="Código"
      variant="outlined"
      value={codigoDisciplina}
      onChange={updateCodigoDisciplina}
    />
  );
}

function TextInputNomeDisciplina(myDisciplinasStates) {
  let { disciplinas, setDisciplinas, disciplina, setDisciplina } =
    myDisciplinasStates;
  // console.log("Tinp", disciplina);
  // console.log("Tinp>nome:", disciplina.nome);
  const [nomeDisciplina, setNomeDisciplina] = useState(disciplina.nome);

  useEffect(() => {
    /* this useEffect serves to update internal values when it's changed outside */
    // console.log(disciplina.nome);
    setNomeDisciplina(disciplina.nome);
  }, [disciplina.nome]);

  function updateNomeDisciplina(event) {
    let newNome = event.target.value;
    let newDisciplina = { ...disciplina, nome: newNome };
    setNomeDisciplina(newNome);
    setDisciplina(newDisciplina);
  }

  return (
    <TextField
      fullWidth
      id="Nome1"
      key="Nome2"
      label="Nome"
      variant="outlined"
      value={nomeDisciplina}
      onChange={updateNomeDisciplina}
      style={{ width: "100%" }} // Adicionado para garantir que o TextField preencha todo o conteúdo
    />
  );
}

function TextInputApelidoDisciplina(myDisciplinasStates) {
  let { disciplina, setDisciplina } = myDisciplinasStates;
  const [apelidoDisciplina, setApelidoDisciplina] = useState(
    disciplina.apelido
  );

  useEffect(() => {
    setApelidoDisciplina(disciplina.apelido);
  }, [disciplina.apelido]);

  function handleChange(event) {
    let newApelido = event.target.value;
    let newDisciplina = { ...disciplina, apelido: newApelido };
    setApelidoDisciplina(newApelido);
    setDisciplina(newDisciplina);
  }

  return (
    <TextField
      fullWidth
      id="Apelido1"
      key="Apelido2"
      label="Apelido do Disciplina"
      variant="outlined"
      value={apelidoDisciplina}
      onChange={handleChange}
    />
  );
}

function TextInputIdDisciplina(myDisciplinasStates) {
  const { disciplina } = myDisciplinasStates;
  const { id } = disciplina;
  return (
    <TextField
      value={id}
      // fullWidth
      label="ID da Disciplina"
      disabled
    />
  );
}

/* \ Student / */

function TextInputStudentMatricula(myStates) {
  let generalStates = {
    items: myStates.students,
    setItems: myStates.setStudents,
    item: myStates.student,
    setItem: myStates.setStudent,
  };
  let specificValues = {
    mainValue: myStates.student.matricula,
    getNewItemObject: (newValue) => {
      return { ...myStates.student, matricula: newValue };
    },
    title: "Matrícula",
  };
  let matriculaStates = { generalStates, specificValues };
  return <TextInputDefault {...matriculaStates} />;
}

function TextInputStudentName(myStates) {
  let generalStates = {
    items: myStates.students,
    setItems: myStates.setStudents,
    item: myStates.student,
    setItem: myStates.setStudent,
  };
  let specificValues = {
    mainValue: myStates.student.nome,
    getNewItemObject: (newValue) => {
      return { ...myStates.student, nome: newValue };
    },
    title: "Nome",
  };
  let nomeStates = { generalStates, specificValues };
  return <TextInputDefault {...nomeStates} />;
}

function TextInputStudentId(myStates) {
  let generalStates = {
    items: myStates.students,
    setItems: myStates.setStudents,
    item: myStates.student,
    setItem: myStates.setStudent,
  };
  let specificValues = {
    mainValue: myStates.student.id,
    getNewItemObject: (newValue) => {
      return { ...myStates.student, id: newValue };
    },
    title: "ID",
  };
  let idStates = { generalStates, specificValues };
  return <TextInputDefault {...idStates} />;
}

/* \ Room / */

function TextInputRoomDescription(myRoomStates) {
  let generalStates = {
    items: myRoomStates.rooms,
    setItems: myRoomStates.setRooms,
    item: myRoomStates.room,
    setItem: myRoomStates.setRoom,
  };
  let specificValues = {
    mainValue: myRoomStates.room.descricao,
    getNewItemObject: (newValue) => {
      return { ...myRoomStates.room, descricao: newValue };
    },
    title: "Descrição",
  };
  let descriptionStates = { generalStates, specificValues };
  return <TextInputDefault {...descriptionStates} />;
}

function TextInputRoomCode(myRoomStates) {
  let generalStates = {
    items: myRoomStates.rooms,
    setItems: myRoomStates.setRooms,
    item: myRoomStates.room,
    setItem: myRoomStates.setRoom,
  };
  let specificValues = {
    mainValue: myRoomStates.room.codigo,
    getNewItemObject: (newValue) => {
      return { ...myRoomStates.room, codigo: newValue };
    },
    title: "Código",
  };
  let codeStates = { generalStates, specificValues };
  return <TextInputDefault {...codeStates} />;
}

function TextInputRoomCapacity(myRoomStates) {
  let generalStates = {
    items: myRoomStates.rooms,
    setItems: myRoomStates.setRooms,
    item: myRoomStates.room,
    setItem: myRoomStates.setRoom,
  };
  let specificValues = {
    mainValue: myRoomStates.room.capacidade,
    getNewItemObject: (newValue) => {
      return { ...myRoomStates.room, capacidade: newValue };
    },
    title: "Capacidade",
    isNumeric: true,
  };
  let capacityStates = { generalStates, specificValues };
  return <TextInputDefault {...capacityStates} />;
}

function TextInputRoomId(myRoomStates) {
  let generalStates = {
    items: myRoomStates.rooms,
    setItems: myRoomStates.setRooms,
    item: myRoomStates.room,
    setItem: myRoomStates.setRoom,
  };
  let specificValues = {
    mainValue: myRoomStates.room.id,
    getNewItemObject: (newValue) => {
      return { ...myRoomStates.room, id: newValue };
    },
    title: "ID",
    isNumeric: true,
  };
  let idStates = { generalStates, specificValues };
  return <TextInputDefault {...idStates} />;
}

export {
  /* \ MultiClasses / */
  NumberInputMultiClassesExpectedDemand,
  /* \\ CRUD // */
  /* \ Professor / */
  TextInputNomeProfessor,
  TextInputIdProfessor,
  TextInputApelidoProfessor,
  /* \ Subjects / */
  TextInputCodigoDisciplina,
  TextInputNomeDisciplina,
  TextInputApelidoDisciplina,
  TextInputIdDisciplina,
  /* \ Student / */
  TextInputStudentMatricula,
  TextInputStudentName,
  TextInputStudentId,
  /* \ Room / */
  TextInputRoomDescription,
  TextInputRoomCode,
  TextInputRoomCapacity,
  TextInputRoomId,
};
