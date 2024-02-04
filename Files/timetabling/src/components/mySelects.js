import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import myStyles from "../config/myStyles";
import defaultColors from "../config/defaultColors";
import constantValues from "../config/constantValues";
import pseudoDatabase from "../config/pseudoDatabase";
import { sqlDataFromJson } from "../DB/local/dataFromJSON";
import { getValueFromObject } from "../helpers/auxFunctions";
import { LockedProp, UnlockedProp } from "./Buttons/Dumb/Dumb";
import {
  getId,
  getItemFromListById,
  replaceNewItemInListById,
} from "../helpers/auxCRUD";
import {
  getDefaultOptionLabelClassItem,
  getDefaultOptionLabelProfessor,
  getDefaultOptionLabelRoom,
  getDefaultOptionLabelStudent,
  getDefaultOptionLabelSubject,
} from "../helpers/visualizationText/textLabels";

const styleWidthFix = myStyles.selects.fullItem;

/* \\ Internal-use Selects // */

function LockableSelect(extProps) {
  const {
    placeholder,
    options,
    value,
    onChange,
    getOptionValue,
    getOptionLabel,
    formatOptionLabel,
    lockStates,
  } = extProps;

  const { isLocked, setIsLocked, title } = lockStates;

  function LockSelect() {
    function toggleLock() {
      setIsLocked(!isLocked);
    }

    return (
      <div
        onClick={toggleLock}
        style={{
          pointerEvents: "auto",
          color: isLocked
            ? defaultColors.locker.locked
            : defaultColors.locker.unlocked,
          cursor: "pointer",
        }}
      >
        {isLocked ? <LockedProp text={title} /> : <UnlockedProp text={title} />}
      </div>
    );
  }

  function ValueWithLock(props) {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <LockSelect {...lockStates} />
        <components.ValueContainer {...props} />
      </div>
    );
  }

  return (
    <div style={{ display: "flex" }}>
      <Select
        placeholder={placeholder}
        options={options}
        value={value}
        onChange={onChange}
        getOptionValue={getOptionValue}
        getOptionLabel={getOptionLabel}
        className={myStyles.selects.className}
        styles={styleWidthFix}
        isDisabled={isLocked}
        isClearable={true}
        components={{ ValueContainer: ValueWithLock }}
        formatOptionLabel={formatOptionLabel}
      />
    </div>
  );
}

function DefaultSelect(defaultProps) {
  const {
    placeHolderText,
    isClearable,
    options,
    setOuterValue,
    value,
    findCorrectObject,
    customProps,
  } = defaultProps;

  const [currentValue, setCurrentValue] = useState(value);

  function updateOuterValue(newValue) {
    setCurrentValue(newValue);
    setOuterValue(newValue);
  }

  useEffect(() => {
    const correctObject = findCorrectObject ? findCorrectObject(value) : value;
    // console.log(value);
    setCurrentValue(correctObject);
  }, [value]);

  return (
    <Select
      placeholder={placeHolderText}
      isClearable={isClearable}
      options={options}
      onChange={updateOuterValue}
      value={currentValue}
      {...customProps}
      className={myStyles.selects.className}
      styles={styleWidthFix}
    />
  );
}

/* \ SubDefault Selects / */

/*
Where each Select is used:

- SelectYear
- SelectSemester
- SelectLab               - CRUD: Professor
- SelectCourse            - CRUD: Professor, Student
- SelectBlock             - CRUD: Room
- SelectExpectedSemester  - CRUD: Subject
- SelectSubject           - CRUD: ClassItem
- SelectProfessor  - CRUD: ClassItem
- SelectRoom              - CRUD: ClassTime
- SelectDay               - CRUD: ClassTime
- SelectStartHour         - CRUD: ClassTime
- SelectDuration          - CRUD: ClassTime
*/

function SelectYear({ outerYear, setOuterYear, outerIsClearable = false }) {
  function findYearObject(year) {
    const years = constantValues.years;
    const yearObject = years.find((iterYear) => iterYear.value == year);
    return yearObject;
  }

  const SelectYearStates = {
    placeHolderText: "Ano",
    isClearable: outerIsClearable,
    options: constantValues.years,
    setOuterValue: setOuterYear,
    value: outerYear,
    findCorrectObject: findYearObject,
  };

  return <DefaultSelect {...SelectYearStates} />;
}

function SelectSemester({
  outerSemester,
  setOuterSemester,
  outerIsClearable = false,
}) {
  function findSemesterObject(semester) {
    const semesters = constantValues.semesters;
    const semesterObject = semesters.find(
      (iterSemester) => iterSemester.value == semester
    );
    return semesterObject;
  }

  const SelectSemesterStates = {
    placeHolderText: "Semestre",
    isClearable: outerIsClearable,
    options: constantValues.semesters,
    setOuterValue: setOuterSemester,
    value: outerSemester,
    findCorrectObject: findSemesterObject,
  };

  return <DefaultSelect {...SelectSemesterStates} />;
}

function SelectLab({ outerLab, setOuterLab }) {
  function findLabObject(labAlias) {
    const labs = pseudoDatabase.labs;
    const labObject = labs.find((iterLab) => iterLab.apelido === labAlias);
    return labObject ?? null;
  }

  const SelectLabStates = {
    placeHolderText: "Laboratório",
    isClearable: true,
    options: pseudoDatabase.labs,
    setOuterValue: setOuterLab,
    value: outerLab,
    findCorrectObject: findLabObject,
    customProps: {
      getOptionValue: (lab) => lab.apelido,
      getOptionLabel: (lab) => `${lab.centro} -${lab.apelido} - ${lab.nome}`,
      formatOptionLabel: ({ centro, apelido, nome }, { context }) => {
        const isOpened = context === "value";
        const message = isOpened ? `${apelido}` : `${centro} - ${nome}`;
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectLabStates} />;
}

function SelectCourse({ outerCourse, setOuterCourse }) {
  function findCourseObject(course) {
    const courses = pseudoDatabase.courses;
    const courseObject = courses.find(
      (iterCourse) => iterCourse.apelido === course
    );
    return courseObject ?? null;
  }

  const SelectCourseStates = {
    placeHolderText: "Curso",
    isClearable: true,
    options: pseudoDatabase.courses,
    setOuterValue: setOuterCourse,
    value: outerCourse,
    findCorrectObject: findCourseObject,
    customProps: {
      getOptionLabel: ({ nome, apelido }) => `${nome} - ${apelido}`,
      getOptionValue: ({ nome, apelido }) => `${nome} - ${apelido}`,
      formatOptionLabel: ({ nome, apelido }, { context }) => {
        const isOpened = context === "value";
        const message = isOpened ? `${apelido}` : `${nome}`;
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectCourseStates} />;
}

function SelectBlock({ outerBlock, setOuterBlock }) {
  function findBlockObject(block) {
    const blocks = pseudoDatabase.blocks;
    const blockObject = blocks.find((iterBlock) => iterBlock.id == block);
    return blockObject;
  }

  const SelectBlockStates = {
    placeHolderText: "Bloco",
    isClearable: false,
    options: pseudoDatabase.blocks,
    setOuterValue: setOuterBlock,
    value: outerBlock,
    findCorrectObject: findBlockObject,
    customProps: {
      getOptionValue: ({ id }) => id,
      getOptionLabel: ({ id, code, alias, name }) =>
        `(${code}) ` + alias === code ? `${name}` : `${alias}`,
      formatOptionLabel: ({ id, code, alias, name }, { context }) => {
        const isMenuLabel = context === "menu";
        let msg = `(${code}) `;
        const sameCodigoAndApelido = alias === code;
        msg += sameCodigoAndApelido ? `${name}` : `${alias}`;
        const finalMessage = isMenuLabel ? msg : `${code}`;
        return finalMessage;
      },
    },
  };

  return <DefaultSelect {...SelectBlockStates} />;
}

function SelectExpectedSemester({
  outerExpectedSemester,
  setOuterExpectedSemester,
  outerIsClearable = false,
}) {
  function findExpectedSemesterObject(expectedSemester) {
    const expectedSemesters = constantValues.expectedSemester;
    const expectedSemesterObject = expectedSemesters.find(
      (iterExpectedSemester) => iterExpectedSemester.value == expectedSemester
    );
    return expectedSemesterObject;
  }

  const SelectExpectedSemesterStates = {
    placeHolderText: "Semestre esperado",
    isClearable: outerIsClearable,
    options: constantValues.expectedSemester,
    setOuterValue: setOuterExpectedSemester,
    value: outerExpectedSemester,
    findCorrectObject: findExpectedSemesterObject,
  };

  return <DefaultSelect {...SelectExpectedSemesterStates} />;
}

function SelectSubject({ outerSubject, setOuterSubject, subjects = [] }) {
  const checkDB = subjects.length > 0;
  const localSubjects = checkDB ? subjects : sqlDataFromJson.subjects;

  function findSubjectObject(subject) {
    const subjectsList = localSubjects;
    const subjectObject = getItemFromListById(subject, subjectsList);
    return subjectObject ? subjectObject : null;
  }

  const SelectSubjectStates = {
    placeHolderText: "Disciplina",
    isClearable: true,
    options: localSubjects,
    setOuterValue: setOuterSubject,
    value: outerSubject,
    findCorrectObject: findSubjectObject,
    customProps: {
      getOptionValue: (subject) => subject.id,
      getOptionLabel: ({ codigo, apelido, nome }) =>
        `${codigo} - ${apelido} - ${nome}`,
      formatOptionLabel: ({ codigo, apelido, nome }, { context }) => {
        const isOpened = context === "value";
        let message = `${codigo} - `;
        message += isOpened ? `${apelido}` : `${nome}`;
        return message;
      },
    },
  };
  // console.log("SelectSubject", outerSubject?.apelido);

  return <DefaultSelect {...SelectSubjectStates} />;
}

function SelectProfessor({
  outerProfessor,
  setOuterProfessor,
  outerIsClearable = true,
  professors = [],
}) {
  const checkDB = professors.length > 0;
  const localProfessors = checkDB ? professors : sqlDataFromJson.professors;

  function findProfessorObject(professor) {
    const professorsList = localProfessors; // get from DB
    const professorObject = getItemFromListById(professor, professorsList);
    return professorObject ? professorObject : null;
  }

  const SelectProfessorStates = {
    placeHolderText: "Professor",
    isClearable: outerIsClearable,
    options: localProfessors,
    setOuterValue: setOuterProfessor,
    value: outerProfessor,
    findCorrectObject: findProfessorObject,
    customProps: {
      getOptionValue: (professor) => professor.id,
      getOptionLabel: ({ nome, apelido, laboratorio, curso }) =>
        `${nome} - ${apelido} - ${laboratorio} - ${curso}`,
      formatOptionLabel: ({ nome, apelido }, { context }) => {
        const isOpened = context === "value";
        const message = isOpened ? `${apelido}` : `${nome}`;
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectProfessorStates} />;
}

function SelectRoom({
  outerRoom,
  setOuterRoom,
  outerIsClearable = true,
  rooms = [],
}) {
  const checkDB = rooms.length > 0;
  const localRooms = checkDB ? rooms : sqlDataFromJson.salas;

  function findRoomObject(room) {
    const roomsList = localRooms;
    const roomObject = getItemFromListById(room, roomsList);
    return roomObject ?? null;
  }

  const SelectRoomStates = {
    placeHolderText: "Sala",
    isClearable: outerIsClearable,
    options: localRooms,
    setOuterValue: setOuterRoom,
    value: outerRoom,
    findCorrectObject: findRoomObject,
    customProps: {
      getOptionValue: (room) => room.id,
      getOptionLabel: ({ capacidade, bloco, codigo }) =>
        `${capacidade} - ${bloco} - ${codigo}`,
      formatOptionLabel: ({ capacidade, bloco, codigo }, { context }) => {
        const isOpened = context === "value";
        let message = "";
        message += capacidade ? `(${capacidade})` : "(Cap. indef.)";
        message += bloco ? ` ${bloco}` : "(Bloco indef.)";
        message += codigo ? ` - ${codigo}` : " (Cod. indef.)";
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectRoomStates} />;
}

function SelectDay({ outerDay, setOuterDay, outerIsClearable = true }) {
  function findDayObject(day) {
    const days = constantValues.days;
    const dayObject = days.find((iterDay) => iterDay?.value == day);
    return dayObject ?? null;
  }

  const SelectDayStates = {
    placeHolderText: "Dia",
    isClearable: outerIsClearable,
    value: outerDay,
    setOuterValue: setOuterDay,
    options: constantValues.days,
    findCorrectObject: findDayObject,
  };

  return <DefaultSelect {...SelectDayStates} />;
}

function SelectStartHour({
  outerStartHour,
  setOuterStartHour,
  outerIsClearable = true,
}) {
  function findHourObject(hour) {
    const hours = constantValues.hours;
    const hourObject = hours.find((iterHour) => iterHour?.hora == hour);
    return hourObject ?? null;
  }

  const SelectStartHourStates = {
    placeHolderText: "Hora",
    isClearable: outerIsClearable,
    value: outerStartHour,
    setOuterValue: setOuterStartHour,
    options: constantValues.hours,
    findCorrectObject: findHourObject,
    customProps: {
      getOptionValue: (hour) => hour.hora,
      getOptionLabel: ({ hora, turno }) => `${hora} (${turno})`,
      formatOptionLabel: ({ hora, turno }, { context }) => {
        const isOpened = context === "value";
        const message = isOpened ? `${hora}` : `${hora} (${turno})`;
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectStartHourStates} />;
}

function SelectDuration({ outerDuration, setOuterDuration }) {
  function findDurationObject(duration) {
    const durations = constantValues.durations;
    const durationObject = durations.find(
      (iterDuration) => iterDuration?.value == duration
    );
    return durationObject ?? null;
  }

  const SelectDurationStates = {
    placeHolderText: "Duração",
    isClearable: true,
    value: outerDuration,
    setOuterValue: setOuterDuration,
    options: constantValues.durations,
    findCorrectObject: findDurationObject,
  };

  return <DefaultSelect {...SelectDurationStates} />;
}

/* \/ \/ \/ \/ \/ \/ \/ \/ NEW FILTER GENERATION \/ \/ \/ \/ \/ \/ \/ \/ */

function SelectFilterYear({ year, setYear }) {
  function updateOuterYear(newYear) {
    const newYearValue = getValueFromObject(newYear);
    setYear(newYearValue);
  }

  const yearStates = {
    outerYear: year,
    setOuterYear: updateOuterYear,
    outerIsClearable: true,
  };

  return <SelectYear {...yearStates} />;
}

function SelectFilterSemester({ semester, setSemester }) {
  function updateOuterSemester(newSemester) {
    const newSemesterValue = getValueFromObject(newSemester);
    setSemester(newSemesterValue);
  }
  const semesterStates = {
    outerSemester: semester,
    setOuterSemester: updateOuterSemester,
    outerIsClearable: true,
  };

  return <SelectSemester {...semesterStates} />;
}

function SelectFilterDay({ day, setDay }) {
  function updateOuterDay(newDay) {
    const newDayValue = getValueFromObject(newDay);
    setDay(newDayValue);
  }

  const dayStates = {
    outerDay: day,
    setOuterDay: updateOuterDay,
    outerIsClearable: true,
  };

  return <SelectDay {...dayStates} />;
}

function SelectFilterHour({ hour, setHour }) {
  function updateOuterStartHour(newStartHour) {
    const newStartHourValue = getValueFromObject(newStartHour);
    console.log(newStartHourValue);
    setHour(newStartHourValue);
  }

  const startHourStates = {
    outerStartHour: hour,
    setOuterStartHour: updateOuterStartHour,
    outerIsClearable: true,
  };

  return <SelectStartHour {...startHourStates} />;
}

function SelectFilterExpectedSemester({
  expectedSemester,
  setExpectedSemester,
}) {
  function updateOuterExpectedSemester(newExpectedSemester) {
    const newExpectedSemesterValue = getValueFromObject(newExpectedSemester);
    setExpectedSemester(newExpectedSemesterValue);
  }

  const expectedSemesterStates = {
    outerExpectedSemester: expectedSemester,
    setOuterExpectedSemester: updateOuterExpectedSemester,
    outerIsClearable: true,
  };

  return <SelectExpectedSemester {...expectedSemesterStates} />;
}

function SelectFilterSubject({ subject, setSubject, subjects }) {
  function updateOuterSubject(newSubject) {
    const newSubjectValue = newSubject ?? null;
    setSubject(newSubjectValue);
  }

  const subjectStates = {
    outerSubject: subject,
    setOuterSubject: updateOuterSubject,
    outerIsClearable: true,
    subjects,
  };

  return <SelectSubject {...subjectStates} />;
}

function SelectFilterProfessor({ professor, setProfessor, professors }) {
  function updateOuterProfessor(newProfessor) {
    const newProfessorValue = newProfessor ?? null;
    setProfessor(newProfessorValue);
  }

  const professorStates = {
    outerProfessor: professor,
    setOuterProfessor: updateOuterProfessor,
    outerIsClearable: true,
    professors,
  };

  return <SelectProfessor {...professorStates} />;
}

function SelectFilterRoom({ room, setRoom, rooms }) {
  function updateOuterRoom(newRoom) {
    const newRoomValue = newRoom ?? null;
    setRoom(newRoomValue);
  }

  const roomStates = {
    outerRoom: room,
    setOuterRoom: updateOuterRoom,
    outerIsClearable: true,
    rooms,
  };

  return <SelectRoom {...roomStates} />;
}

/* /\ /\ /\ /\ /\ /\ /\ /\ NEW FILTER GENERATION /\ /\ /\ /\ /\ /\ /\ /\ */

/* \\ MultiClasses // */

/* \\ CRUD // */

/* \ ClassTimes / */

function SelectClassTimeRoom(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, classTime, rooms } =
    classTimeStates;

  function updateClassTimeRoom(newRoom) {
    const newClassTime = { ...classTime, sala: newRoom ?? null };
    const classTimes = classItem.horarios;
    const newClassTimes = replaceNewItemInListById(newClassTime, classTimes);
    const newClassItem = { ...classItem, horarios: newClassTimes };
    const newClasses = replaceNewItemInListById(newClassItem, classes);
    setClassItem(newClassItem);
    setClasses(newClasses);
  }

  const roomStates = {
    outerRoom: classTime.sala,
    setOuterRoom: updateClassTimeRoom,
    rooms,
  };

  return <SelectRoom {...roomStates} />;
}

function SelectClassTimeDay(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, classTime } =
    classTimeStates;

  function updateClassTimeDay(newDay) {
    const newClassTime = { ...classTime, dia: getValueFromObject(newDay) };
    const classTimes = classItem.horarios;
    const newClassTimes = replaceNewItemInListById(newClassTime, classTimes);
    const newClassItem = { ...classItem, horarios: newClassTimes };
    setClassItem(newClassItem);
    const newClasses = replaceNewItemInListById(newClassItem, classes);
    setClasses(newClasses);
  }

  const dayStates = {
    outerDay: classTime.dia,
    setOuterDay: updateClassTimeDay,
  };

  return <SelectDay {...dayStates} />;
}

function SelectClassTimeStartHour(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, classTime } =
    classTimeStates;

  function updateClassTimeStartHour(newStartHour) {
    const newClassTime = {
      ...classTime,
      horaInicio: newStartHour?.hora ?? null,
    };
    const classTimes = classItem.horarios;
    const newClassTimes = replaceNewItemInListById(newClassTime, classTimes);
    const newClassItem = { ...classItem, horarios: newClassTimes };
    setClassItem(newClassItem);
    const newClasses = replaceNewItemInListById(newClassItem, classes);
    setClasses(newClasses);
  }

  const startHourStates = {
    outerStartHour: classTime.horaInicio,
    setOuterStartHour: updateClassTimeStartHour,
  };

  return <SelectStartHour {...startHourStates} />;
}

function SelectClassTimeDuration(classTimeStates) {
  const { classes, setClasses, classItem, setClassItem, classTime } =
    classTimeStates;

  function updateClassTimeDuration(newDuration) {
    const newClassTime = {
      ...classTime,
      duracao: getValueFromObject(newDuration),
    };
    const classTimes = classItem.horarios;
    const newClassTimes = replaceNewItemInListById(newClassTime, classTimes);
    const newClassItem = { ...classItem, horarios: newClassTimes };
    setClassItem(newClassItem);
    const newClasses = replaceNewItemInListById(newClassItem, classes);
    setClasses(newClasses);
  }

  const durationStates = {
    outerDuration: classTime.duracao,
    setOuterDuration: updateClassTimeDuration,
  };

  return <SelectDuration {...durationStates} />;
}

/* \ Classes / */

function SelectClassItem(classStates) {
  const { filteredClasses, setClasses, classItem, setClassItem } = classStates;

  const SelectClassItemStates = {
    placeHolderText: "Selecione uma turma",
    isClearable: false,
    options: filteredClasses,
    setOuterValue: setClassItem,
    value: classItem,
    customProps: {
      getOptionValue: (classItem) => getId(classItem),
      getOptionLabel: (classItem) => getDefaultOptionLabelClassItem(classItem),
      formatOptionLabel: (
        { id, idTurma, ano, semestre, disciplina, professor },
        { context }
      ) => {
        let message = "";
        message += `(id: ${id ?? idTurma}) `;
        message += `${ano}.${semestre} - `;
        message += `${disciplina?.apelido ?? "disc. indef."} - `;
        message += `${professor?.apelido ?? "prof. indef."}`;
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectClassItemStates} />;
}

function SelectClassYear(classStates) {
  const { classes, setClasses, classItem, setClassItem } = classStates;

  function updateClassYear(newYear) {
    const newClass = { ...classItem, ano: getValueFromObject(newYear) };
    const newClasses = replaceNewItemInListById(newClass, classes);
    setClassItem(newClass);
    setClasses(newClasses);
  }

  const yearStates = {
    outerYear: classItem?.ano,
    setOuterYear: updateClassYear,
  };

  return <SelectYear {...yearStates} />;
}

function SelectClassSemester(classStates) {
  const { classes, setClasses, classItem, setClassItem } = classStates;

  function updateClassSemester(newSemester) {
    const newClass = {
      ...classItem,
      semestre: getValueFromObject(newSemester),
    };
    const newClasses = replaceNewItemInListById(newClass, classes);
    setClassItem(newClass);
    setClasses(newClasses);
  }

  const semesterStates = {
    outerSemester: classItem?.semestre,
    setOuterSemester: updateClassSemester,
  };

  return <SelectSemester {...semesterStates} />;
}

function SelectClassSubject(classStates) {
  const { classes, setClasses, classItem, setClassItem, subjects } =
    classStates;
  // console.log("SelectClassSubject", subjects);
  function updateClassSubject(newSubject) {
    const newClass = { ...classItem, disciplina: newSubject ?? null };
    const newClasses = replaceNewItemInListById(newClass, classes);
    setClassItem(newClass);
    setClasses(newClasses);
  }

  const subjectStates = {
    outerSubject: classItem?.disciplina,
    setOuterSubject: updateClassSubject,
    subjects,
  };

  // console.log("SelectClassSubject", classItem?.disciplina?.apelido);

  return <SelectSubject {...subjectStates} />;
}

function SelectClassProfessor(classStates) {
  const { classes, setClasses, classItem, setClassItem, professors } =
    classStates;

  function updateClassProfessor(newProfessor) {
    const newClass = { ...classItem, professor: newProfessor ?? null };
    const newClasses = replaceNewItemInListById(newClass, classes);
    setClassItem(newClass);
    setClasses(newClasses);
  }

  const professorStates = {
    outerProfessor: classItem?.professor,
    setOuterProfessor: updateClassProfessor,
    professors,
  };

  return <SelectProfessor {...professorStates} />;
}

/* \ Professors / */

function SelectProfessorItem(professorStates) {
  const { professors, setProfessors, professor, setProfessor } =
    professorStates;

  const SelectProfessorItemStates = {
    placeHolderText: "Selecione um professor",
    isClearable: false,
    options: professors,
    setOuterValue: setProfessor,
    value: professor,
    customProps: {
      getOptionValue: (professor) => getId(professor),
      getOptionLabel: (professor) => getDefaultOptionLabelProfessor(professor),
      formatOptionLabel: ({ laboratorio, curso, apelido }) => {
        let message = "";
        message += `(`;
        message += `${laboratorio || "lab indef."} - `;
        message += `${curso || "cur indef."}) - `;
        message += `${apelido || "Apelido indef."}`;
        return message;
      },
    },
  };

  return <DefaultSelect {...SelectProfessorItemStates} />;
}

function SelectProfessorLab(professorStates) {
  const { professors, setProfessors, professor, setProfessor } =
    professorStates;
  function updateProfessorLab(newLab) {
    const newProfessor = { ...professor, laboratorio: newLab?.apelido ?? null };
    const newProfessors = replaceNewItemInListById(newProfessor, professors);
    setProfessor(newProfessor);
    setProfessors(newProfessors);
  }

  const labStates = {
    outerLab: professor?.laboratorio,
    setOuterLab: updateProfessorLab,
  };

  return <SelectLab {...labStates} />;
}

function SelectProfessorCourse({
  professors,
  setProfessors,
  professor,
  setProfessor,
}) {
  function updateProfessorCourse(newCourse) {
    const newProfessor = { ...professor, curso: newCourse?.apelido ?? null };
    const newProfessors = replaceNewItemInListById(newProfessor, professors);
    setProfessor(newProfessor);
    setProfessors(newProfessors);
  }

  const courseStates = {
    outerCourse: professor?.curso,
    setOuterCourse: updateProfessorCourse,
  };

  return <SelectCourse {...courseStates} />;
}

/* \ Rooms / */

function SelectRoomItem({ rooms, setRooms, room, setRoom }) {
  const SelectRoomItemStates = {
    placeHolderText: "Selecione uma sala",
    isClearable: false,
    options: rooms,
    setOuterValue: setRoom,
    value: room,
    // findCorrectObject: ,
    customProps: {
      getOptionValue: (room) => getId(room),
      getOptionLabel: (room) => getDefaultOptionLabelRoom(room),
      formatOptionLabel: ({ capacidade, bloco, codigo }) => {
        let msg = "";
        msg += capacidade ? `(${capacidade})` : "(Cap. indef.)";
        msg += bloco ? ` ${bloco}` : "(Bloco indef.)";
        msg += codigo ? ` - ${codigo}` : " (Cod. indef.)";
        return msg;
      },
    },
  };

  return <DefaultSelect {...SelectRoomItemStates} />;
}

function SelectRoomBlock(myRoomStates) {
  const { room, setRoom } = myRoomStates;

  function updateRoomBlock(newBlock) {
    const { id, code, alias, name } = newBlock;
    // const sameCodeAlias = code === alias;
    // const description = sameCodeAlias ? name : alias;
    // const newBlockValue = `(${code}) ${description}`
    const newRoom = { ...room, idBlock: id, bloco: code };
    setRoom(newRoom);
  }

  // console.log(room.bloco);

  const blockStates = {
    // outerBlock: room.bloco,
    outerBlock: room?.idBlock,
    setOuterBlock: updateRoomBlock,
  };

  return <SelectBlock {...blockStates} />;
}

/* \\ Subjects // */

function SelectSubjectItem({ subjects, setSubjects, subject, setSubject }) {
  const SelectSubjectItemStates = {
    placeHolderText: "Selecione uma disciplina",
    isClearable: false,
    options: subjects,
    setOuterValue: setSubject,
    value: subject,
    // findCorrectObject: ,
    customProps: {
      getOptionValue: (subject) => getId(subject),
      getOptionLabel: (subject) => getDefaultOptionLabelSubject(subject),
      formatOptionLabel: ({ codigo, nome }) => {
        let msg = "";
        msg += codigo ? `(${codigo})` : "(Cod. indef.)";
        msg += nome ? ` ${nome}` : " (Nome indef.)";
        return msg;
      },
    },
  };

  return <DefaultSelect {...SelectSubjectItemStates} />;
}

function SelectSubjectExpectedSemester({ subject, setSubject }) {
  function updateDisciplinaExpectedSemester(newExpectedSemester) {
    const newDisciplina = { ...subject, periodo: newExpectedSemester?.value };
    setSubject(newDisciplina);
  }

  const expectedSemesterStates = {
    outerExpectedSemester: subject?.periodo,
    setOuterExpectedSemester: updateDisciplinaExpectedSemester,
  };

  return <SelectExpectedSemester {...expectedSemesterStates} />;
}

/* \ Students / */

function SelectStudentItem({ students, setStudents, student, setStudent }) {
  const SelectStudentItemStates = {
    placeHolderText: "Selecione um aluno",
    isClearable: false,
    options: students,
    setOuterValue: setStudent,
    value: student,
    // findCorrectObject: ,
    customProps: {
      getOptionValue: (student) => getId(student),
      getOptionLabel: (student) => getDefaultOptionLabelStudent(student),
      formatOptionLabel: ({ matricula, nome }) => `${matricula}: ${nome}`,
    },
  };

  return <DefaultSelect {...SelectStudentItemStates} />;
}

function SelectStudentYear({ student, setStudent }) {
  function updateStudentYear(newYear) {
    // console.log(newYear);
    const newStudent = { ...student, anoEntrada: newYear?.value };
    setStudent(newStudent);
  }

  const yearStates = {
    outerYear: student?.anoEntrada,
    setOuterYear: updateStudentYear,
  };

  return <SelectYear {...yearStates} />;
}

function SelectStudentCourse({ student, setStudent }) {
  function updateStudentCourse(newCourse) {
    const newStudent = { ...student, curso: newCourse?.apelido ?? null };
    setStudent(newStudent);
  }

  const courseStates = {
    outerCourse: student?.curso,
    setOuterCourse: updateStudentCourse,
  };

  return <SelectCourse {...courseStates} />;
}

export {
  /* Filters */
  SelectFilterYear,
  SelectFilterSemester,
  SelectFilterDay,
  SelectFilterHour,
  SelectFilterExpectedSemester,
  SelectFilterSubject,
  SelectFilterProfessor,
  SelectFilterRoom,

  /* \\ CRUD // */

  /* \ ClassTimes / */
  SelectClassTimeRoom,
  SelectClassTimeDay,
  SelectClassTimeStartHour,
  SelectClassTimeDuration,

  /* \ ClassItem / */
  SelectClassItem,
  SelectClassYear,
  SelectClassSemester,
  SelectClassSubject,
  SelectClassProfessor,

  /* \ Professor / */
  SelectProfessorItem,
  SelectProfessorLab,
  SelectProfessorCourse,

  /* Room */
  SelectRoomItem,
  SelectRoomBlock,

  /* \ Subject / */
  SelectSubjectItem,
  SelectSubjectExpectedSemester,

  /* Student */
  SelectStudentItem,
  SelectStudentYear,
  SelectStudentCourse,
};
