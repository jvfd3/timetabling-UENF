import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { getId, replaceNewItemInListById } from "../helpers/auxCRUD";
import text from "../config/frontText";

const placeHolders = text.component.textInputPlaceholder;

/* DEFAULT TEXTINPUT */

function TextInputDefault(myStates) {
  const { generalStates, specificValues } = myStates;
  const { items, setItems, item, setItem } = generalStates;
  const { mainValue, getNewItemObject, title, isNumeric } = specificValues;

  /*
multi
myselects
pageselect
classitemtable
classtimeviewtable
classtimetable
notofferedsubject
*/

  const [mainProp, setMainProp] = useState(mainValue);

  useEffect(() => {
    /* this useEffect serves to update internal values when it's changed outside */
    // console.log(mainValue);
    setMainProp(mainValue);
  }, [mainValue]);

  function numericValueFilter(value) {
    const numberValue = Number(value);
    if (numberValue < 1) return null;
    if (numberValue > 9999) return 9999;
    return numberValue;
  }

  function updateValue(event) {
    // function updateValue({ target: { value } }) {
    let newValue = event.target.value;
    newValue = isNumeric ? numericValueFilter(newValue) : newValue;
    newValue = newValue === "" ? null : newValue;

    const newItem = getNewItemObject(newValue);
    const newItems = replaceNewItemInListById(newItem, items);
    setMainProp(newValue);
    setItem(newItem);
    setItems(newItems);
  }

  const isId = title === "ID";
  const specificIDProps = isId ? { disabled: true } : {};
  const specificNumericProps = isNumeric
    ? {
        type: "number",
        inputProps: { min: 0, max: 999, step: 1 },
        inputMode: "numeric",
        pattern: "[0-9]*",
      }
    : {};

  const TextFieldProps = {
    fullWidth: true,
    id: `TextField ID: ${title}-${getId(item)}`,
    key: `TextField Key: ${title}-${getId(item)}`,
    label: `${title}`,
    variant: "outlined",
    value: mainProp || "",
    onChange: updateValue,
    // style: { width: "100%" }, // Adicionado para garantir que o TextField preencha todo o conteúdo
    ...specificIDProps,
    ...specificNumericProps,
    disabled: isId || mainValue === undefined,
    // readOnly: true,
    /* InputLabelProps: {
      style: {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        width: "100%",
        color: "green",
        backgroundColor: "lightgray",
        borderColor: "red",
      },
    }, */
    // style: { width: "100%" }, // Adicionado para garantir que o TextField preencha todo o conteúdo
  };

  return <TextField {...TextFieldProps} />;
}

/* \\ MultiClasses // */

function NumberInputMultiClassesExpectedDemand(currentClassStates) {
  const { classes, setClasses, classItem, setClassItem } = currentClassStates;
  const generalStates = {
    items: classes,
    setItems: setClasses,
    item: classItem,
    setItem: setClassItem,
  };
  const specificValues = {
    mainValue: classItem.demandaEstimada,
    getNewItemObject: (newValue) => {
      const newClassItem = { ...classItem, demandaEstimada: newValue };
      return newClassItem;
    },
    title: placeHolders.expectedDemand,
    isNumeric: true,
  };
  const capacityStates = { generalStates, specificValues };
  return <TextInputDefault {...capacityStates} />;
}

function TextInputClassDescription(currentClassStates) {
  const { classes, setClasses, classItem, setClassItem } = currentClassStates;
  const generalStates = {
    items: classes,
    setItems: setClasses,
    item: classItem,
    setItem: setClassItem,
  };

  const specificValues = {
    mainValue: classItem?.description,
    getNewItemObject: (newValue) => {
      const newClassItem = { ...classItem, description: newValue };
      return newClassItem;
    },
    title: placeHolders.description,
  };

  const codeStates = { generalStates, specificValues };
  return <TextInputDefault {...codeStates} />;
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
    mainValue: getId(classItem),
    getNewItemObject: (newValue) => ({ ...classItem, id: newValue }),
    title: placeHolders.id,
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

function TextInputClassExpectedDemand({
  classes,
  setClasses,
  classItem,
  setClassItem,
}) {
  const generalStates = {
    items: classes,
    setItems: setClasses,
    item: classItem,
    setItem: setClassItem,
  };
  const specificValues = {
    mainValue: classItem?.demandaEstimada,
    getNewItemObject: (newValue) => ({
      ...classItem,
      demandaEstimada: newValue,
    }),
    title: placeHolders.expectedDemand,
    isNumeric: true,
  };
  const demandStates = { generalStates, specificValues };

  return <TextInputDefault {...demandStates} />;
}

/* \ Professor / */

function TextInputProfessorName(professorStates) {
  const { professors, setProfessors, professor, setProfessor } =
    professorStates;
  const generalStates = {
    items: professors,
    setItems: setProfessors,
    item: professor,
    setItem: setProfessor,
  };
  const specificValues = {
    mainValue: professor?.nome,
    getNewItemObject: (newValue) => ({ ...professor, nome: newValue }),
    title: placeHolders.name,
  };
  const nameStates = { generalStates, specificValues };
  return <TextInputDefault {...nameStates} />;
}

function TextinputProfessorAlias(professorStates) {
  const { professors, setProfessors, professor, setProfessor } =
    professorStates;
  const generalStates = {
    items: professors,
    setItems: setProfessors,
    item: professor,
    setItem: setProfessor,
  };
  const specificValues = {
    mainValue: professor?.apelido,
    getNewItemObject: (newValue) => ({ ...professor, apelido: newValue }),
    title: placeHolders.alias,
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
    mainValue: professor?.id,
    getNewItemObject: (newValue) => ({ ...professor, id: newValue }),
    title: placeHolders.id,
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
    mainValue: subject?.codigo,
    getNewItemObject: (newValue) => ({ ...subject, codigo: newValue }),
    title: placeHolders.code,
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
    mainValue: subject?.nome,
    getNewItemObject: (newValue) => ({ ...subject, nome: newValue }),
    title: placeHolders.name,
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
    mainValue: subject?.apelido,
    getNewItemObject: (newValue) => ({ ...subject, apelido: newValue }),
    title: placeHolders.alias,
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
    mainValue: subject?.id,
    getNewItemObject: (newValue) => ({ ...subject, id: newValue }),
    title: placeHolders.id,
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
    mainValue: student?.matricula,
    getNewItemObject: (newValue) => ({ ...student, matricula: newValue }),
    title: placeHolders.enrollment,
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
    mainValue: student?.nome,
    getNewItemObject: (newValue) => ({ ...student, nome: newValue }),
    title: placeHolders.name,
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
    mainValue: student?.id,
    getNewItemObject: (newValue) => ({ ...student, id: newValue }),
    title: placeHolders.id,
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
    mainValue: room?.descricao,
    getNewItemObject: (newValue) => ({ ...room, descricao: newValue }),
    title: placeHolders.comment,
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
    mainValue: room?.codigo,
    getNewItemObject: (newValue) => ({ ...room, codigo: newValue }),
    title: placeHolders.code,
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
    mainValue: room?.capacidade,
    getNewItemObject: (newValue) => ({ ...room, capacidade: newValue }),
    title: placeHolders.capacity,
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
    mainValue: room?.id,
    getNewItemObject: (newValue) => ({ ...room, id: newValue }),
    title: placeHolders.id,
    isNumeric: true,
  };
  const idStates = { generalStates, specificValues };

  return <TextInputDefault {...idStates} />;
}

export {
  /* \ MultiClasses / */
  NumberInputMultiClassesExpectedDemand,
  TextInputClassDescription,
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
