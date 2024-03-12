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
    newClassItem.horarios = getNewClassTimes(usualInfo.classTime);

    const newLocalStates = { ...classStates, classItemFilter: newClassItem };

    createClass(newLocalStates);
  }

  subjects.forEach((iterSubject, index) => {
    const delayedFunction = () => asyncCreateClassDB(iterSubject);
    const delay = (index + 1) * configInfo.AWS.defaultRequestDelay;
    setTimeout(delayedFunction, delay);
  });
}

export default createPreFilledClass;
