import configInfo from "../../../config/configInfo";
import { createClass } from "../../../helpers/CRUDFunctions/classCRUD";
import { filterSubject } from "../../../helpers/filteringFunc";
import {
  getPreFilledClassItem,
  getPreFilledClassTimes,
  getUsualInfo,
} from "../../MultiClasses/NotOfferedSubjects/processInitialValues";

function createPreFilledClass({ classStates, subjects }) {
  const { classItemFilter, classes } = classStates;

  subjects.forEach((iterSubject, index) => {
    const sameSubjectClasses = filterSubject(classes, iterSubject);
    const usualInfo = getUsualInfo(sameSubjectClasses);
    const newClassItem = getPreFilledClassItem(
      classItemFilter,
      iterSubject,
      usualInfo
    );
    newClassItem.horarios = getPreFilledClassTimes(usualInfo.classTime);

    const newLocalStates = { ...classStates, classItemFilter: newClassItem };

    const delayedFunction = () => createClass(newLocalStates);
    const delay = (index + 1) * configInfo.AWS.defaultRequestDelay;
    setTimeout(delayedFunction, delay);
  });
}

export default createPreFilledClass;
