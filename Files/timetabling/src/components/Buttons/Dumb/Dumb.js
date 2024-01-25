import "./Dumb.css";
import {
  BsDatabaseFillAdd as CreateDBIcon,
  BsDatabaseDown as ReadDBIcon,
} from "react-icons/bs";
import {
  MdAddCircleOutline as CreateItemIcon, // Plus sign with circle around it
  MdOutlineRefresh as UpdateItemIcon, // Circle arrow
  MdDelete as DeleteItemIcon, // Trash can
  MdAddAlarm as CreateClassTimeIcon, // Clock with plus sign
  MdOutlineUpdate as UpdateClassTimeIcon, // Circle arrow with clock hands
  MdAutoDelete as DeleteClassTimeIcon, // Trash Can with clock
  MdLockOutline as LockedPropIcon, // Lock
  MdLockOpen as UnlockedPropIcon, // Unlocked lock
  MdInput as InputDisciplinaIcon, // Arrow pointing into a box
  MdRefresh as ReadInfoIcon, // Two arrows in a circle
  MdEdit as UpdateInfoIcon, // Pencil
} from "react-icons/md";
// import {
//   AddCircleOutlineIcon as CreateItemIcon,
//   Refresh as ReadInfoIcon,
//   Edit as UpdateInfoIcon,
//   Delete as DeleteItemIcon,
//   AddAlarm as CreateClassTimeIcon,
//   AutoDelete as DeleteClassTimeIcon,
//   LockRounded as LockedPropIcon,
//   LockOpenRounded as UnlockedPropIcon,
//   Input as InputDisciplinaIcon,
// } from "@mui/icons-material";

/* Database Buttons */

function CreateDBButton({ createFunc, text = "Create", size = "2em" }) {
  return (
    <CreateDBIcon
      className="iconCreate"
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

function ReadDBButton({ readFunc, text = "Read", size = "2em" }) {
  return (
    <ReadDBIcon
      className="iconRead"
      onClick={readFunc}
      title={text}
      size={size}
    />
  );
}

/* Default CRUD ClassItem Buttons */

function CreateItem({ createFunc, text = "Create", size = "2em" }) {
  return (
    <CreateItemIcon
      className="iconCreate"
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

function UpdateItem({ updateFunc, text = "Update", size = "2em" }) {
  return (
    <UpdateItemIcon
      className="iconUpdate"
      onClick={updateFunc}
      title={text}
      size={size}
    />
  );
}

function DeleteItem({ deleteFunc, text = "Delete", size = "2em" }) {
  return (
    <DeleteItemIcon
      className="iconDelete"
      onClick={deleteFunc}
      title={text}
      size={size}
    />
  );
}

/* Default Info Buttons */

function ReadInfo({ readFunc, text = "Read", size = "2em" }) {
  return (
    <ReadInfoIcon
      className="iconRead"
      onClick={readFunc}
      title={text}
      size={size}
    />
  );
}

function UpdateInfo({ updateFunc, text = "Update", size = "2em" }) {
  return (
    <UpdateInfoIcon
      className="iconUpdate"
      onClick={updateFunc}
      title={text}
      size={size}
    />
  );
}

/* Specific Icon buttons */

function CreateClassTime({ createFunc, text = "Create", size = "2em" }) {
  return (
    <CreateClassTimeIcon
      className="iconCreate"
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

function UpdateClassTime({
  updateFunc,
  text = "Update",
  size = "2em",
  color = "black",
}) {
  return (
    <UpdateClassTimeIcon
      className="iconUpdate"
      onClick={updateFunc}
      title={text}
      size={size}
      color={color}
    />
  );
}

function DeleteClassTime({ deleteFunc, text = "Delete", size = "2em" }) {
  return (
    <DeleteClassTimeIcon
      className="iconDelete"
      onClick={deleteFunc}
      title={text}
      size={size}
    />
  );
}

function LockedProp({ unlockFunc, text = "Locked", size = "2em" }) {
  return (
    <LockedPropIcon
      className="iconLocked"
      onClick={unlockFunc}
      title={text}
      size={size}
    />
  );
}

function UnlockedProp({ lockFunc, text = "Unlocked", size = "2em" }) {
  return (
    <UnlockedPropIcon
      className="iconUnlocked"
      onClick={lockFunc}
      title={text}
      size={size}
    />
  );
}

function InputDisciplina({ insertDiscFunc, text = "Input", size = "2em" }) {
  return (
    <InputDisciplinaIcon
      className="iconInputDisciplina"
      onClick={insertDiscFunc}
      title={text}
      size={size}
    />
  );
}

export {
  CreateItem,
  UpdateItem,
  DeleteItem,
  CreateClassTime,
  UpdateClassTime,
  DeleteClassTime,
  LockedProp,
  UnlockedProp,
  InputDisciplina,
  CreateDBButton,
  ReadDBButton,
  ReadInfo,
  UpdateInfo,
};
