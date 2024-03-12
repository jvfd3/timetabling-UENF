import configInfo from "../../../config/configInfo";
import { createClass } from "../../../helpers/CRUDFunctions/classCRUD";
import { filterSubject } from "../../../helpers/filteringFunc";
import {
  getNewClassItem,
  getNewClassTimes,
  getUsualInfo,
} from "../../MultiClasses/NotOfferedSubjects/processInitialValues";

function createPreFilledClass({ classStates, subjects }) {
  const { classItemFilter, classes } = classStates;

  function asyncCreateClassDB(iterSubject) {
    const sameSubjectClasses = filterSubject(classes, iterSubject);
    const usualInfo = getUsualInfo(sameSubjectClasses);

    const newClassItem = getNewClassItem(
      classItemFilter,
      iterSubject,
      usualInfo
    );
    newClassItem.horarios = getNewClassTimes(usualInfo);

    const newLocalStates = { ...classStates, classItem: newClassItem };

    createClass(newLocalStates);
  }

  subjects.forEach((iterSubject, index) => {
    setTimeout(
      () => asyncCreateClassDB(iterSubject),
      (index + 1) * configInfo.AWS.defaultRequestDelay
    );
  });
}

export default createPreFilledClass;
