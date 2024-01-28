import { conflictsProfessor } from "./calculations/rawProfessor";
import { getRawConflictsDemand } from "./calculations/rawDemand";
import { getRawConflictsRoom } from "./calculations/rawRoom";

import { getSubjectStyledConflict } from "./Styles/styleSubject";
import { getProfessorStyledConflict } from "./Styles/styleProfessor";
import { getStyledConflictDemand } from "./Styles/styleDemand";
import { getRoomStyledConflict } from "./Styles/styleRoom";
import { getDurationStyledConflict } from "./Styles/styleDuration";
import { getDayStyledConflict } from "./Styles/styleDay";
import { getHourStyledConflict } from "./Styles/styleHour";

function getRawItemConflicts(classes, classItem) {
  const rawItemConflicts = {};

  rawItemConflicts.professor = conflictsProfessor(classes, classItem);
  rawItemConflicts.expectedDemand = getRawConflictsDemand(classes, classItem);

  return rawItemConflicts;
}

function getStyledItemConflict(conflicts, classItem) {
  const classConflictStyles = {};

  classConflictStyles.subject = getSubjectStyledConflict(classItem);
  classConflictStyles.professor = getProfessorStyledConflict(
    conflicts,
    classItem
  );
  classConflictStyles.expectedDemand = getStyledConflictDemand(
    conflicts,
    classItem
  );

  return classConflictStyles;
}

function getClassItemConflicts(classes, classItem) {
  const itemConflicts = {};

  itemConflicts.raw = getRawItemConflicts(classes, classItem);
  itemConflicts.styled = getStyledItemConflict(itemConflicts, classItem);

  return itemConflicts;
}

function getRawTimeConflicts(classes, classTime) {
  const rawTimeConflicts = {};

  rawTimeConflicts.room = getRawConflictsRoom(classes, classTime);

  return rawTimeConflicts;
}

function getStyledTimeConflict(timeConflicts, classTime) {
  const classTimeStyles = {};
  console.log(classTime);
  classTimeStyles.room = getRoomStyledConflict(timeConflicts, classTime);

  classTimeStyles.day = getDayStyledConflict(classTimeStyles, classTime);
  classTimeStyles.hour = getHourStyledConflict(classTimeStyles, classTime);

  classTimeStyles.duration = getDurationStyledConflict(
    classTimeStyles,
    classTime
  );

  return classTimeStyles;
}

function getClassTimeConflicts(classes, classTime, conflicts) {
  const timeConflicts = {};

  timeConflicts.itemConflicts = conflicts;
  timeConflicts.raw = getRawTimeConflicts(classes, classTime);
  timeConflicts.styled = getStyledTimeConflict(timeConflicts, classTime);

  return timeConflicts;
}

export { getClassItemConflicts, getClassTimeConflicts };
