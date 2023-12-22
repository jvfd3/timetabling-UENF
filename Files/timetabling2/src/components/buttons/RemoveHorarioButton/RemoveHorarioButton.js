// import styles from "./RemoveHorarioButton.module.css";
import { DeleteButton } from "../CRUDButtons/CRUDButtons";

function RemoveHorarioButton({ lTurma, setLTurma, indexHorario }) {
  let horarios = lTurma.horarios;
  function removeHorarioFromTurma() {
    let novosHorarios = [...horarios];
    novosHorarios.splice(indexHorario, 1);
    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };
    setLTurma(novaTurma);
  }
  return <DeleteButton receivedFunction={removeHorarioFromTurma} size="2em" />;
}

export default RemoveHorarioButton;
