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

/* \\ MultiClasses // */

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

/* \\ CRUD // */

/* \ Classes / */

function TextInputClassId({ classes, setClasses, classItem, setClassItem }) {
  const generalStates = {
    items: classes,
    setItems: setClasses,
    item: classItem,
    setItem: setClassItem,
  };
  const specificValues = {
    mainValue: classItem.idTurma,
    getNewItemObject: (newValue) => ({ ...classItem, idTurma: newValue }),
    title: "ID",
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

function TextInputClassExpectedDemand({ classes, setClasses, classItem, setClassItem }) {
  const generalStates = {
    items: classes,
    setItems: setClasses,
    item: classItem,
    setItem: setClassItem,
  };
  const specificValues = {
    mainValue: classItem.demandaEstimada,
    getNewItemObject: (newValue) => ({ ...classItem, demandaEstimada: newValue }),
    title: "Demanda Estimada",
    isNumeric: true,
  };
  const demandStates = { generalStates, specificValues };

  return <TextInputDefault {...demandStates} />;
}


/* \ Professor / */

function TextInputProfessorName({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  const generalStates = {
    items: professors,
    setItems: setProfessors,
    item: professor,
    setItem: setProfessor,
  };
  const specificValues = {
    mainValue: professor.nome,
    getNewItemObject: (newValue) => ({ ...professor, nome: newValue }),
    title: "Nome",
  };
  const nomeStates = { generalStates, specificValues };
  return <TextInputDefault {...nomeStates} />;
}

function TextinputProfessorAlias({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  const generalStates = {
    items: professors,
    setItems: setProfessors,
    item: professor,
    setItem: setProfessor,
  };
  const specificValues = {
    mainValue: professor.apelido,
    getNewItemObject: (newValue) => ({ ...professor, apelido: newValue }),
    title: "Apelido",
  };
  const aliasStates = { generalStates, specificValues };
  return <TextInputDefault {...aliasStates} />;
}

function TextInputProfessorId({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  const generalStates = {
    items: professors,
    setItems: setProfessors,
    item: professor,
    setItem: setProfessor,
  };
  const specificValues = {
    mainValue: professor.id,
    getNewItemObject: (newValue) => ({ ...professor, id: newValue }),
    title: "ID",
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

/* \ Subject / */

function TextInputSubjectCode({ subjects, setSubjects, subject, setSubject }) {
  const generalStates = {
    items: subjects,
    setItems: setSubjects,
    item: subject,
    setItem: setSubject,
  };
  const specificValues = {
    mainValue: subject.codigo,
    getNewItemObject: (newValue) => ({ ...subject, codigo: newValue }),
    title: "Código",
  };
  const codeStates = { generalStates, specificValues };

  return <TextInputDefault {...codeStates} />;
}

function TextInputSubjectName({ subjects, setSubjects, subject, setSubject }) {
  const generalStates = {
    items: subjects,
    setItems: setSubjects,
    item: subject,
    setItem: setSubject,
  };
  const specificValues = {
    mainValue: subject.nome,
    getNewItemObject: (newValue) => ({ ...subject, nome: newValue }),
    title: "Nome",
  };
  const nomeStates = { generalStates, specificValues };

  return <TextInputDefault {...nomeStates} />;
}

function TextInputSubjectAlias({ subjects, setSubjects, subject, setSubject }) {
  const generalStates = {
    items: subjects,
    setItems: setSubjects,
    item: subject,
    setItem: setSubject,
  };
  const specificValues = {
    mainValue: subject.apelido,
    getNewItemObject: (newValue) => ({ ...subject, apelido: newValue }),
    title: "Apelido",
  };
  const aliasStates = { generalStates, specificValues };

  return <TextInputDefault {...aliasStates} />;
}

function TextInputSubjectId({ subjects, setSubjects, subject, setSubject }) {
  const generalStates = {
    items: subjects,
    setItems: setSubjects,
    item: subject,
    setItem: setSubject,
  };
  const specificValues = {
    mainValue: subject.id,
    getNewItemObject: (newValue) => ({ ...subject, id: newValue }),
    title: "ID",
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

/* \ Student / */

function TextInputStudentEnrollment({
  students,
  setStudents,
  student,
  setStudent,
}) {
  const generalStates = {
    items: students,
    setItems: setStudents,
    item: student,
    setItem: setStudent,
  };
  const specificValues = {
    mainValue: student.matricula,
    getNewItemObject: (newValue) => ({ ...student, matricula: newValue }),
    title: "Matrícula",
  };
  const matriculaStates = { generalStates, specificValues };

  return <TextInputDefault {...matriculaStates} />;
}

function TextInputStudentName({ students, setStudents, student, setStudent }) {
  const generalStates = {
    items: students,
    setItems: setStudents,
    item: student,
    setItem: setStudent,
  };
  const specificValues = {
    mainValue: student.nome,
    getNewItemObject: (newValue) => ({ ...student, nome: newValue }),
    title: "Nome",
  };
  const nomeStates = { generalStates, specificValues };
  return <TextInputDefault {...nomeStates} />;
}

function TextInputStudentId({ students, setStudents, student, setStudent }) {
  const generalStates = {
    items: students,
    setItems: setStudents,
    item: student,
    setItem: setStudent,
  };
  const specificValues = {
    mainValue: student.id,
    getNewItemObject: (newValue) => ({ ...student, id: newValue }),
    title: "ID",
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

/* \ Room / */

function TextInputRoomDescription({ rooms, setRooms, room, setRoom }) {
  const generalStates = {
    items: rooms,
    setItems: setRooms,
    item: room,
    setItem: setRoom,
  };
  const specificValues = {
    mainValue: room.descricao,
    getNewItemObject: (newValue) => ({ ...room, descricao: newValue }),
    title: "Descrição",
  };
  const descriptionStates = { generalStates, specificValues };

  return <TextInputDefault {...descriptionStates} />;
}

function TextInputRoomCode({ rooms, setRooms, room, setRoom }) {
  const generalStates = {
    items: rooms,
    setItems: setRooms,
    item: room,
    setItem: setRoom,
  };
  const specificValues = {
    mainValue: room.codigo,
    getNewItemObject: (newValue) => ({ ...room, codigo: newValue }),
    title: "Código",
  };
  const codeStates = { generalStates, specificValues };

  return <TextInputDefault {...codeStates} />;
}

function TextInputRoomCapacity({ rooms, setRooms, room, setRoom }) {
  const generalStates = {
    items: rooms,
    setItems: setRooms,
    item: room,
    setItem: setRoom,
  };
  const specificValues = {
    mainValue: room.capacidade,
    getNewItemObject: (newValue) => ({ ...room, capacidade: newValue }),
    title: "Capacidade",
    isNumeric: true,
  };
  const capacityStates = { generalStates, specificValues };

  return <TextInputDefault {...capacityStates} />;
}

function TextInputRoomId({ rooms, setRooms, room, setRoom }) {
  const generalStates = {
    items: rooms,
    setItems: setRooms,
    item: room,
    setItem: setRoom,
  };
  const specificValues = {
    mainValue: room.id,
    getNewItemObject: (newValue) => ({ ...room, id: newValue }),
    title: "ID",
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

export {
  /* \ MultiClasses / */
  NumberInputMultiClassesExpectedDemand,
  /* \\ CRUD // */
  /* \ Classes / */
  TextInputClassExpectedDemand,
  TextInputClassId,
  /* \ Professor / */
  TextInputProfessorName,
  TextinputProfessorAlias,
  TextInputProfessorId,
  /* \ Subjects / */
  TextInputSubjectCode,
  TextInputSubjectName,
  TextInputSubjectAlias,
  TextInputSubjectId,
  /* \ Student / */
  TextInputStudentEnrollment,
  TextInputStudentName,
  TextInputStudentId,
  /* \ Room / */
  TextInputRoomDescription,
  TextInputRoomCode,
  TextInputRoomCapacity,
  TextInputRoomId,
};
