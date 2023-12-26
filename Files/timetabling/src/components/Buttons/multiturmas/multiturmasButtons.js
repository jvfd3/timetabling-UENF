import "./multiturmas.css";
import { DeleteButton } from "../CRUDButtons/CRUDButtons";

function RemoveTurmaButton({ turmas, setTurmas, currentTurma }) {
  function removerTurma() {
    let newTurmas = turmas.filter((turma) => turma.id !== currentTurma.id);
    setTurmas(newTurmas);
  }
  return (
    <button
      className="TurmaHorarioRemove"
      key={`${currentTurma.id}-${currentTurma.codigoDisciplina}-${currentTurma.professor}`}
      onClick={removerTurma}
    >
      Remover Turma
    </button>
  );
}

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

function AdicionarTurma({ addTurma }) {
  return (
    <button className="AdicionarHorario" onClick={addTurma}>
      Nova Turma
    </button>
  );
}

function AdicionarHorario({ setLTurmas, lTurmas, lTurma }) {
  function adicionarHorarioNaTurma() {
    let novosHorarios = [...lTurma.horarios];
    let newId = lTurma.id + "_";
    if (novosHorarios.length === 0) {
      newId += "1";
    } else {
      let ultimoHorario = novosHorarios[novosHorarios.length - 1];
      let lastId = ultimoHorario.id;
      let partes = lastId.split("_");
      let ultimaParte = parseInt(partes[partes.length - 1]);
      let resultado = ultimaParte + 1;
      // console.log("novosHorarios", novosHorarios[novosHorarios.length-1])
      newId += resultado;
    }
    // console.log("newId", newId)
    let newHorario = {
      id: newId,
      sala: null,
      dia: null,
      horaInicio: null,
      duracao: 2,
    };
    novosHorarios.push(newHorario);
    let novaTurma = {
      ...lTurma,
      horarios: novosHorarios,
    };

    // Encontre o índice da turma que você deseja atualizar
    const index = lTurmas.findIndex((turma) => turma.id === lTurma.id);

    // Crie uma cópia da lista de turmas
    let novasTurmas = [...lTurmas];

    // Remova a turma antiga e insira a nova turma na mesma posição
    novasTurmas.splice(index, 1, novaTurma);

    // Atualize o estado da lista de turmas
    setLTurmas(novasTurmas);
  }
  return (
    <button className="AdicionarHorario" onClick={adicionarHorarioNaTurma}>
      Novo Horário
    </button>
  );
}

export {
  RemoveTurmaButton,
  RemoveHorarioButton,
  AdicionarTurma,
  AdicionarHorario,
};
