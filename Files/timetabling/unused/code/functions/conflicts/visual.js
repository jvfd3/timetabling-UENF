function getNullgetClassTimeConflicts(classTime) {
  const foundNullProps = {
    room: classTime?.sala === null,
    day: classTime?.dia === null,
    hour: classTime?.horaInicio === null,
    duration: classTime?.duracao === null,
  };
  return foundNullProps;
}

function setNullStyles(conflictStyles, classTime) {
  const isNull = getNullgetClassTimeConflicts(classTime);
  const notSetTexts = {
    room: "Sala não definida",
    day: "Dia não definido",
    hour: "Hora não definida",
    duration: "Duração não definida",
  };
  if (isNull.day) {
    conflictStyles.day = {
      title: notSetTexts.day,
      style: { backgroundColor: options.config.colors.conflicts.notSet.day },
    };
  }
  if (isNull.hour) {
    conflictStyles.hour = {
      title: notSetTexts.hour,
      style: { backgroundColor: options.config.colors.conflicts.notSet.hour },
    };
  }
  return conflictStyles;
}

function oldgetClassTimeConflicts(conflicts, classTime) {
  let conflictStyles = {
    hour: {
      title: "Nenhum conflito encontrado",
      style: { backgroundColor: "" },
    },
    day: {
      title: "Nenhum conflito encontrado",
      style: { backgroundColor: "" },
    },
  };

  const classTimeId = getId(classTime);

  const professorConflicts = conflicts.raw.professor.alloc;
  const hasProfessorConflict = professorConflicts.some(
    (conflict) => conflict?.from?.idHorario === classTimeId
  );

  if (hasProfessorConflict) {
    conflictStyles.day = conflicts.styled.professor;
    conflictStyles.hour = conflicts.styled.professor;
  }

  conflictStyles = setNullStyles(conflictStyles, classTime);

  return conflictStyles;
}
