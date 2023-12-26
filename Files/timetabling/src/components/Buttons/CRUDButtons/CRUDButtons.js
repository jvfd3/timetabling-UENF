import "./CRUDButtons.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";

function CreateButton({ createFunction, size = "4em", title = "Create" }) {
  return (
    <div className="iconCreate">
      <BsDatabaseFillAdd size={size} onClick={createFunction} title={title} />
    </div>
  );
}

function ReadButton({ readFunction, size = "4em", title = "Read" }) {
  return (
    <div className="iconRead">
      <BsDatabaseDown size={size} onClick={readFunction} title={title} />
    </div>
  );
}

function UpdateButton({ updateFunction, size = "4em", title = "Update" }) {
  return (
    <div className="iconUpdate">
      <FaEdit size={size} onClick={updateFunction} title={title} />
    </div>
  );
}

function DeleteButton({ deleteFunction, size = "4em", title = "Delete" }) {
  return (
    <div className="iconDelete">
      <FaTrash size={size} onClick={deleteFunction} title={title} />
    </div>
  );
}

export { CreateButton, ReadButton, UpdateButton, DeleteButton };
