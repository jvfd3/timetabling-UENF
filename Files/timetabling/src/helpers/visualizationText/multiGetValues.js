function getDay(classTime) {
  const day = classTime?.day ?? classTime?.dia;
  return day;
}

function getStartTime(classTime) {
  const startTime =
    classTime?.startTime ??
    classTime?.startHour ??
    classTime?.hour ??
    classTime?.horaInicio ??
    classTime?.hora;
  return startTime;
}

function getDuration(classTime) {
  const duration = classTime?.duration ?? classTime?.duracao;
  return duration;
}

function getRoom(classTime) {
  const room = classTime?.room ?? classTime?.sala;
  return room;
}

export { getDay, getStartTime, getDuration, getRoom };
