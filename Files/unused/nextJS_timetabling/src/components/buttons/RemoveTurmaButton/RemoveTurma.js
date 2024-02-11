import styles from "./RemoveTurma.module.css";

function RemoveTurmaButton({ turmas, setTurmas, currentTurma }) {
  function removerTurma() {
    let newTurmas = turmas.filter((turma) => turma.id !== currentTurma.id);
    setTurmas(newTurmas);
  }
  return (
    <button
      className={styles.TurmaHorarioRemove}
      key={`${currentTurma.id}-${currentTurma.codigoDisciplina}-${currentTurma.professor}`}
      onClick={removerTurma}
    >
      Remover Turma
    </button>
  );
}

export default RemoveTurmaButton;
