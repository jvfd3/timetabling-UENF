import "./CRUDButtons.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";

function CreateButton({ receivedFunction, size = "4em" }) {
  return (
    <div className="iconCreate">
      <BsDatabaseFillAdd size={size} onClick={receivedFunction} />
    </div>
  );
}

function ReadButton({ receivedFunction, size = "4em" }) {
  return (
    <div className="iconRead">
      <BsDatabaseDown size={size} onClick={receivedFunction} />
    </div>
  );
}

function UpdateButton({ receivedFunction, size = "4em" }) {
  return (
    <div className="iconUpdate">
      <FaEdit size={size} onClick={receivedFunction} />
    </div>
  );
}

function DeleteButton({ receivedFunction, size = "4em" }) {
  return (
    <div className="iconDelete">
      <FaTrash size={size} onClick={receivedFunction} />
    </div>
  );
}

export { CreateButton, ReadButton, UpdateButton, DeleteButton };
