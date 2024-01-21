import "./turmas.css";
import React, { useRef, useState } from "react";
import options from "../../../DB/local/options";
import CRUDPageSelection from "../../../components/PageSelect";
import { sqlDataFromJson } from "../../../DB/local/dataFromJSON";
import {
  SelectClassItem,
  SelectClassYear,
  SelectClassSemester,
  SelectClassSubject,
  SelectClassProfessor,
} from "../../../components/mySelects";
import { CRUDButtonsContainer } from "../../../components/CRUDButtons";
import {
  createClass,
  readClass,
  updateClass,
  deleteClass,
} from "../../../helpers/CRUDFunctions/classCRUD";
import {
  TextInputClassExpectedDemand,
  TextInputClassId,
} from "../../../components/MyTextFields";
import ClassTimeTable from "../../../components/ClassTimeTable/ClassTimeTable";

function TurmaSelection(classStates) {
  /* It just contains the selection an maybe allows scrolling selection */
  const turmaCRUDFunctions = {
    createFunc: () => createClass(classStates),
    readFunc: () => readClass(classStates),
    updateFunc: () => updateClass(classStates),
    deleteFunc: () => deleteClass(classStates),
  };
  return (
    <div className="SelectionBar">
      <CRUDButtonsContainer {...turmaCRUDFunctions} />
      <SelectClassItem {...classStates} />
    </div>
  );
}

function ClassData(classesStates) {
  return (
    <div className="showBasicDataCard">
      <h3>INFORMAÇÕES DA TURMA</h3>
      <table className="showBasicDataTable">
        <thead></thead>
        <tbody>
          <tr>
            <th>Ano/Semestre</th>
            <td>
              <div className="SelectAnoSemestre">
                <SelectClassYear {...classesStates} />
                <SelectClassSemester {...classesStates} />
              </div>
            </td>
          </tr>
          <tr>
            <th>Disciplina</th>
            <td>
              <SelectClassSubject {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Professor</th>
            <td>
              <SelectClassProfessor {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Demanda Estimada</th>
            <td>
              <TextInputClassExpectedDemand {...classesStates} />
            </td>
          </tr>
          <tr>
            <th>Id</th>
            <td>
              <TextInputClassId {...classesStates} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function Classes() {
  const classIndex = useRef(sqlDataFromJson.classes.length);
  // let defaultClasses = getFullHorarios();

  const defaultClassItem = {
    ...options.emptyObjects.classItem,
    id: classIndex.current,
    idTurma: classIndex.current,
  };
  const defaultClasses = [defaultClassItem];

  const [classes, setClasses] = useState(defaultClasses);
  const [classItem, setClassItem] = useState(classes[0]);

  const classesStates = { classes, setClasses, classItem, setClassItem };

  /* useEffect(() => {
    updateClass(classesStates);
  }, [
    classItem?.ano,
    classItem?.semestre,
    classItem?.disciplina?.id,
    classItem?.professor?.id,
  ]); */

  return (
    <div className="CRUDContainComponents">
      <TurmaSelection {...classesStates} />
      <div className="infoCard">
        <ClassData {...classesStates} />
        <ClassTimeTable {...classesStates} />
        {/* <Participants {...myTurmaStates} /> */}
      </div>
    </div>
  );
}

function CRUDclass() {
  let defaultPageValue = options.constantValues.pageSelection.classes;
  return (
    <div className="background">
      <CRUDPageSelection defaultValue={defaultPageValue} />
      <Classes />
    </div>
  );
}

export default CRUDclass;
