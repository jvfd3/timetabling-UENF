import "./CRUDButtons.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";

function CreateButton({ createFunction, size = "4em" }) {
  return (
    <div className="iconCreate">
      <BsDatabaseFillAdd size={size} onClick={createFunction} />
    </div>
  );
}

function ReadButton({ readFunction, size = "4em" }) {
  return (
    <div className="iconRead">
      <BsDatabaseDown size={size} onClick={readFunction} />
    </div>
  );
}

function UpdateButton({ updateFunction, size = "4em" }) {
  return (
    <div className="iconUpdate">
      <FaEdit size={size} onClick={updateFunction} />
    </div>
  );
}

function DeleteButton({ deleteFunction, size = "4em" }) {
  return (
    <div className="iconDelete">
      <FaTrash size={size} onClick={deleteFunction} />
    </div>
  );
}

export { CreateButton, ReadButton, UpdateButton, DeleteButton };
