import "./CRUDButtons.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";

function CreateButton({ receivedFunction }) {
  return (
    <div className="iconCreate">
      <BsDatabaseFillAdd size="4em" onClick={receivedFunction} />
    </div>
  );
}

function ReadButton({ receivedFunction }) {
  return (
    <div className="iconRead">
      <BsDatabaseDown size="4em" onClick={receivedFunction} />
    </div>
  );
}

function UpdateButton({ receivedFunction }) {
  return (
    <div className="iconUpdate">
      <FaEdit size="4em" onClick={receivedFunction} />
    </div>
  );
}

function DeleteButton({ receivedFunction }) {
  return (
    <div className="iconDelete">
      <FaTrash size="4em" onClick={receivedFunction} />
    </div>
  );
}

export { CreateButton, ReadButton, UpdateButton, DeleteButton };
