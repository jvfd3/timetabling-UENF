import options from "../../DB/local/options";

function sortClassTimes(classTimes) {
  const days = options.constantValues.days;
  let orderedClassTimes = [];

  days.forEach((day) => {
    const filteredClassTimes = classTimes.filter(
      (classTime) => classTime.dia === day.value
    );
    filteredClassTimes.sort((a, b) => {
      const aTime = a.horaInicio;
      const bTime = b.horaInicio;
      return aTime - bTime;
    });
    orderedClassTimes = [...orderedClassTimes, ...filteredClassTimes];
  });

  return orderedClassTimes;
}

export { sortClassTimes };