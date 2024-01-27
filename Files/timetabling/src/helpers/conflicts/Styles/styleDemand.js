import options from "../../../DB/local/options";

function getDemandStyledConflict(conflicts, classItem) {
  // console.log("classItem", classItem);
  let demandConflicts = conflicts.expectedDemand.singleTurmaCapacity;
  let newColor = options.config.colors.conflicts.noProblem.demand;
  let titleMessage = "Não foi identificado conflitos de demanda";
  let demandStyle = {
    title: newColor,
    style: titleMessage,
  };
  // console.log("demandConflicts", demandConflicts); //idRoom Undefined
  let numberOfConflicts = demandConflicts.length;
  if (numberOfConflicts > 0) {
    newColor = options.config.colors.conflicts.hasConflict.demand;
    titleMessage = `❌ Conflito: demanda X capacidade.\n\t- Há ${numberOfConflicts} conflitos de demanda.`;
    let surplus = 0;
    demandConflicts.forEach((iterConflict) => {
      // console.log("iterConflict", iterConflict);
      let cap = iterConflict.capacity;
      let demand = iterConflict.expectedDemand;
      let diff = demand - cap;
      surplus = diff > surplus ? diff : surplus;
      let idRoom = iterConflict.idRoom;
      let idClassTime = iterConflict.idClassTime;
      let idClass = iterConflict.idClass;
      titleMessage += `\n\t-- Sobraram ${diff} alunos `;
      titleMessage += `na Sala ${idRoom} `;
      titleMessage += `do Horário ${idClassTime} `;
      titleMessage += `da Turma ${idClass}\n`;
    });
    // titleMessage += `\nNo pior caso ${surplus} alunos ficam de fora`;
  }

  const hasDemand = classItem.demandaEstimada !== null;
  if (!hasDemand) {
    titleMessage = "Demanda não definida";
    newColor = options.config.colors.conflicts.notSet.demand;
  }

  demandStyle.title = titleMessage;
  demandStyle.style = { backgroundColor: newColor };
  return demandStyle;
}

export { getDemandStyledConflict };
