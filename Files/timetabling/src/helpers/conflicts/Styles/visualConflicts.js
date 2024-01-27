import { getSubjectStyledConflict } from "./styleSubject";
import { getProfessorStyledConflict } from "./styleProfessor";
import { getDemandStyledConflict } from "./styleDemand";
import { getRoomStyledConflict } from "./styleRoom";
import { getDurationStyledConflict } from "./styleDuration";
import { getDayStyledConflict } from "./styleDay";
import { getHourStyledConflict } from "./styleHour";

function getStyledItemConflict(conflicts, classItem, semester) {
  const myClassConflicts = {};

  myClassConflicts.disciplina = getSubjectStyledConflict(classItem, semester);
  myClassConflicts.professor = getProfessorStyledConflict(conflicts, classItem);
  myClassConflicts.demand = getDemandStyledConflict(conflicts, classItem);

  return myClassConflicts;
}

function classTimeConflicts(conflicts, classTime) {
  const conflictStyles = {};

  conflictStyles.room = getRoomStyledConflict(conflicts, classTime);
  conflictStyles.day = getDayStyledConflict(conflictStyles, classTime);
  conflictStyles.hour = getHourStyledConflict(conflictStyles, classTime);
  conflictStyles.duration = getDurationStyledConflict(
    conflictStyles,
    classTime
  );

  return conflictStyles;
}

export { getStyledItemConflict, classTimeConflicts };
