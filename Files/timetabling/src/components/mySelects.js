import React, { useEffect, useState } from "react";
import Select, { components } from "react-select";
import text from "../config/frontText";
import myStyles from "../config/myStyles";
import configInfo from "../config/configInfo";
import defaultColors from "../config/defaultColors";
import constantValues from "../config/constantValues";
import pseudoDatabase from "../config/pseudoDatabase";
import sqlDataFromJson from "../DB/dataFromJSON";
import { getValueFromObject, menuIsOpen } from "../helpers/auxFunctions";
import { LockedProp, UnlockedProp } from "./Buttons/Dumb/Dumb";
import {
  getId,
  getItemFromListById,
  replaceNewItemInListById,
} from "../helpers/auxCRUD";
import {
  defaultLabel,
  getBlockFormatLabel,
  getLabelStudentSelection,
  getSubjectFormatLabel,
  getFormatOptionLabelSelectClassItem,
  getRoomItemLabel,
  courseLabel,
  getProfessorFormatLabel,
  getLabFormatLabel,
  getRoomSelectionLabel,
  getStartHourFormatLabel,
} from "../helpers/visualizationText/textLabels";

const styleWidthFix = myStyles.selects.fullItem;
const placeHolders = text.component.SelectPlaceholder;
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
- SelectProfessor         - CRUD: ClassItem
- SelectRoom              - CRUD: ClassTime
- SelectDay               - CRUD: ClassTime
- SelectStartHour         - CRUD: ClassTime
- SelectDuration          - CRUD: ClassTime
*/

/* \ Page Selection / */

function SelectPage({ currentPage, setCurrentPage }) {
  const pageObjectList = configInfo.pageSelection;
  const pagesList = Object.values(pageObjectList);
  const filteredPages = pagesList.filter(
    (iterPage) => iterPage.url !== pageObjectList.notFound.url
  );

  function findPageObject(selectedPage) {
    const pageObject = pagesList.find((iterPage) => {
      const iterUrl = iterPage?.url;
      const selectedUrl = selectedPage?.url;
      const isSameUrl = iterUrl === selectedUrl;
      return isSameUrl;
    });
    return pageObject ?? null;
  }

  const selectPageProps = {
    placeHolderText: text.component.unexpectedPlaceholder,
    isClearable: false,
    options: filteredPages,
    setOuterValue: setCurrentPage,
    value: currentPage,
    findCorrectObject: findPageObject,
    customProps: {
      getOptionValue: ({ url }) => url,
      getOptionLabel: ({ pageName }) => pageName,
      formatOptionLabel: ({ pageName }) => pageName,
      /* formatOptionLabel: ({ pageName }) => (
        <div style={{ display: "flex" }}>{pageName}</div>
      ), */
    },
  };

  return <DefaultSelect {...selectPageProps} />;
}

function SelectYear({ outerYear, setOuterYear, outerIsClearable = false }) {
  function findYearObject(year) {
    const years = constantValues.years;
    const yearObject = years.find((iterYear) => iterYear.value == year);
    return yearObject ?? null;
  }

  const SelectYearStates = {
    placeHolderText: placeHolders.year,
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
    placeHolderText: placeHolders.semester,
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
    placeHolderText: placeHolders.lab,
    isClearable: true,
    options: pseudoDatabase.labs,
    setOuterValue: setOuterLab,
    value: outerLab,
    findCorrectObject: findLabObject,
    customProps: {
      getOptionValue: (lab) => getId(lab),
      getOptionLabel: (lab) => defaultLabel(lab),
      formatOptionLabel: (lab, { context }) => getLabFormatLabel(lab, context),
    },
  };

  return <DefaultSelect {...SelectLabStates} />;
}

function SelectCourse({ outerCourse, setOuterCourse }) {
  function findCourseObject(course) {
    const courses = pseudoDatabase.courses;
    const courseObject = courses.find(
      (iterCourse) => iterCourse?.apelido === course
    );
    return courseObject ?? null;
  }

  const SelectCourseStates = {
    placeHolderText: placeHolders.course,
    isClearable: true,
    options: pseudoDatabase.courses,
    setOuterValue: setOuterCourse,
    value: outerCourse,
    findCorrectObject: findCourseObject,
    customProps: {
      getOptionValue: (course) => getId(course),
      getOptionLabel: (course) => defaultLabel(course),
      formatOptionLabel: (course, { context }) => courseLabel(course, context),
    },
  };

  return <DefaultSelect {...SelectCourseStates} />;
}

function SelectBlock({ outerBlock, setOuterBlock, outerIsClearable = false }) {
  function findBlockObject(block) {
    const blocks = pseudoDatabase.blocks;
    const blockObject = blocks.find((iterBlock) => iterBlock.id == block);
    return blockObject ?? null;
  }

  const SelectBlockStates = {
    placeHolderText: placeHolders.block,
    isClearable: outerIsClearable,
    options: pseudoDatabase.blocks,
    setOuterValue: setOuterBlock,
    value: outerBlock,
    findCorrectObject: findBlockObject,
    customProps: {
      getOptionValue: (block) => getId(block),
      getOptionLabel: (block) => defaultLabel(block),
      formatOptionLabel: (block, { context }) =>
        getBlockFormatLabel(block, context),
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
    return expectedSemesterObject ?? null;
  }

  const SelectExpectedSemesterStates = {
    placeHolderText: placeHolders.expectedSemester,
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
    placeHolderText: placeHolders.subject,
    isClearable: true,
    options: localSubjects,
    setOuterValue: setOuterSubject,
    value: outerSubject,
    findCorrectObject: findSubjectObject,
    customProps: {
      getOptionValue: (subject) => getId(subject),
      getOptionLabel: (subject) => defaultLabel(subject),
      formatOptionLabel: (subject, { context }) =>
        getSubjectFormatLabel(subject, context),
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
    return professorObject ?? null;
  }

  const SelectProfessorStates = {
    placeHolderText: placeHolders.professor,
    isClearable: outerIsClearable,
    options: localProfessors,
    setOuterValue: setOuterProfessor,
    value: outerProfessor,
    findCorrectObject: findProfessorObject,
    customProps: {
      getOptionValue: (professor) => getId(professor),
      getOptionLabel: (professor) => defaultLabel(professor),
      formatOptionLabel: (professor, { context }) =>
        getProfessorFormatLabel(professor, context),
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
    placeHolderText: placeHolders.room,
    isClearable: outerIsClearable,
    options: localRooms,
    setOuterValue: setOuterRoom,
    value: outerRoom,
    findCorrectObject: findRoomObject,
    customProps: {
      getOptionValue: (room) => getId(room),
      getOptionLabel: (room) => defaultLabel(room),
      formatOptionLabel: (room, { context }) =>
        getRoomSelectionLabel(room, context),
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
    placeHolderText: placeHolders.day,
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
    placeHolderText: placeHolders.hour,
    isClearable: outerIsClearable,
    value: outerStartHour,
    setOuterValue: setOuterStartHour,
    options: constantValues.hours,
    findCorrectObject: findHourObject,
    customProps: {
      getOptionValue: (hour) => hour.hora,
      getOptionLabel: (startHour) => defaultLabel(startHour),
      formatOptionLabel: (hour, { context }) =>
        getStartHourFormatLabel(hour, context),
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
    placeHolderText: placeHolders.duration,
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
    placeHolderText: placeHolders.classItem,
    isClearable: false,
    options: filteredClasses,
    setOuterValue: setClassItem,
    value: classItem,
    customProps: {
      getOptionValue: (classItem) => getId(classItem),
      getOptionLabel: (classItem) => defaultLabel(classItem),
      formatOptionLabel: (classItem, { context }) =>
        getFormatOptionLabelSelectClassItem(classItem, context),
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
    outerSubject: classItem?.subject ?? classItem?.disciplina,
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
    placeHolderText: placeHolders.professor,
    isClearable: false,
    options: professors,
    setOuterValue: setProfessor,
    value: professor,
    customProps: {
      getOptionValue: (professor) => getId(professor),
      getOptionLabel: (professor) => defaultLabel(professor),
      formatOptionLabel: (professor, { context }) =>
        getProfessorFormatLabel(professor, context),
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
    const newProfessor = { ...professor, curso: newCourse?.name ?? null };
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
    placeHolderText: placeHolders.room,
    isClearable: false,
    options: rooms,
    setOuterValue: setRoom,
    value: room,
    // findCorrectObject: ,
    customProps: {
      getOptionValue: (room) => getId(room),
      getOptionLabel: (room) => defaultLabel(room),
      formatOptionLabel: (room, { context }) => getRoomItemLabel(room, context),
    },
  };

  return <DefaultSelect {...SelectRoomItemStates} />;
}

function SelectRoomBlock(myRoomStates) {
  const { room, setRoom } = myRoomStates;

  function updateRoomBlock(newBlock) {
    // const { id, code, alias, name } = newBlock;
    // const sameCodeAlias = code === alias;
    // const description = sameCodeAlias ? name : alias;
    // const newBlockValue = `(${code}) ${description}`
    const newRoom = {
      ...room,
      idBlock: newBlock?.id,
      bloco: newBlock?.code ?? newBlock?.alias ?? newBlock?.name,
    };
    setRoom(newRoom);
  }

  // console.log(room.bloco);

  const blockStates = {
    // outerBlock: room.bloco,
    outerBlock: room?.idBlock,
    setOuterBlock: updateRoomBlock,
    outerIsClearable: true,
  };

  return <SelectBlock {...blockStates} />;
}

/* \\ Subjects // */

function SelectSubjectItem({ subjects, setSubjects, subject, setSubject }) {
  const SelectSubjectItemStates = {
    placeHolderText: placeHolders.subject,
    isClearable: false,
    options: subjects,
    setOuterValue: setSubject,
    value: subject,
    // findCorrectObject: ,
    customProps: {
      getOptionValue: (subject) => getId(subject),
      getOptionLabel: (subject) => defaultLabel(subject),
      formatOptionLabel: (subject, { context }) =>
        getSubjectFormatLabel(subject, context),
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
    outerIsClearable: true,
  };

  return <SelectExpectedSemester {...expectedSemesterStates} />;
}

/* \ Students / */

function SelectStudentItem({ students, setStudents, student, setStudent }) {
  const SelectStudentItemStates = {
    placeHolderText: placeHolders.student,
    isClearable: false,
    options: students,
    setOuterValue: setStudent,
    value: student,
    // findCorrectObject: ,
    customProps: {
      getOptionValue: (student) => getId(student),
      getOptionLabel: (student) => defaultLabel(student),
      formatOptionLabel: (student) => getLabelStudentSelection(student),
    },
  };

  return <DefaultSelect {...SelectStudentItemStates} />;
}

function SelectStudentYear({ student, setStudent }) {
  function updateStudentYear(newYear) {
    // console.log(newYear);
    const newStudent = { ...student, anoEntrada: newYear?.value ?? null };
    setStudent(newStudent);
  }

  const yearStates = {
    outerYear: student?.anoEntrada,
    setOuterYear: updateStudentYear,
    outerIsClearable: true,
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
  SelectPage,
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
