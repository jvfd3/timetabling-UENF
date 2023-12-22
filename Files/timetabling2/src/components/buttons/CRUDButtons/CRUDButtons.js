import styles from "./CRUDButtons.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { BsDatabaseDown, BsDatabaseFillAdd } from "react-icons/bs";

function CreateButton({ createFunction, size = "4em" }) {
  return (
    <div className={styles.iconCreate}>
      <BsDatabaseFillAdd size={size} onClick={createFunction} />
    </div>
  );
}

function ReadButton({ readFunction, size = "4em" }) {
  return (
    <div className={styles.iconRead}>
      <BsDatabaseDown size={size} onClick={readFunction} />
    </div>
  );
}

function UpdateButton({ updateFunction, size = "4em" }) {
  return (
    <div className={styles.iconUpdate}>
      <FaEdit size={size} onClick={updateFunction} />
    </div>
  );
}

function DeleteButton({ deleteFunction, size = "4em" }) {
  return (
    <div className={styles.iconDelete}>
      <FaTrash size={size} onClick={deleteFunction} />
    </div>
  );
}

export { CreateButton, ReadButton, UpdateButton, DeleteButton };
