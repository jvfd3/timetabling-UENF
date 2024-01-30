import { conflictsProfessor } from "./calculations/rawProfessor";
import { getRawConflictsDemand } from "./calculations/rawDemand";
import { getRawConflictsRoom } from "./calculations/rawRoom";

import {
  getStyledConflictSubject,
  getSubjectStyledConflict,
} from "./Styles/styleSubject";
import { getProfessorStyledConflict } from "./Styles/styleProfessor";
import { getStyledConflictDemand } from "./Styles/styleDemand";
import { getRoomStyledConflict } from "./Styles/styleRoom";
import { getStyledConflictDuration } from "./Styles/styleDuration";
import { getStyledConflictDay } from "./Styles/styleDay";
import { getStyledConflictHour } from "./Styles/styleHour";
import { getRawConflictSubject } from "./calculations/rawSubject";

function getRawItemConflicts(classes, classItem) {
  const rawItemConflicts = {};

  rawItemConflicts.subject = getRawConflictSubject(classItem);
  rawItemConflicts.professor = conflictsProfessor(classes, classItem);
  rawItemConflicts.expectedDemand = getRawConflictsDemand(classes, classItem);

  return rawItemConflicts;
}

function getStyledItemConflict(conflicts, classItem) {
  const classConflictStyles = {};

  classConflictStyles.subject = getStyledConflictSubject(conflicts, classItem);
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

function getStyledTimeConflict(conflicts, classTime) {
  const classTimeStyles = { ...conflicts };

  // It's a little messy...
  classTimeStyles.room = getRoomStyledConflict(conflicts, classTime);
  classTimeStyles.day = getStyledConflictDay(classTimeStyles, classTime);
  classTimeStyles.hour = getStyledConflictHour(classTimeStyles, classTime);
  classTimeStyles.duration = getStyledConflictDuration(
    classTimeStyles,
    classTime
  );

  delete classTimeStyles.conflicts;

  return classTimeStyles;
}

function getClassTimeConflicts(classes, classTime, itemConflicts) {
  const conflicts = { timeConflicts: {}, itemConflicts };
  // console.log(itemConflicts);

  conflicts.timeConflicts.raw = getRawTimeConflicts(classes, classTime);
  conflicts.timeConflicts.styled = getStyledTimeConflict(conflicts, classTime);

  return conflicts;
}

export { getClassItemConflicts, getClassTimeConflicts };
