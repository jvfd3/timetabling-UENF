import "./Dumb.css";
/* Custom Buttons */

function CustomCreateButton({ createFunc, text = "Create" }) {
  return (
    <button className="AdicionarHorario" onClick={createFunc}>
      {text}
    </button>
  );
}

function CustomDeleteButton({ deleteFunc, text = "Delete" }) {
  return (
    <button className="TurmaHorarioRemove" onClick={deleteFunc}>
      {text}
    </button>
  );
}

export { CustomCreateButton, CustomDeleteButton };
