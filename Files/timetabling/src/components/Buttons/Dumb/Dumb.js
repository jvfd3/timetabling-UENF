import "./Dumb.css";
import {
  BsDatabaseFillAdd as CreateDBIcon,
  BsDatabaseDown as ReadDBIcon,
} from "react-icons/bs";
import {
  MdOutlineUpdate as UpdateClassTimeIcon, // Circle arrow with clock hands
  MdAddCircleOutline as CreateInfoIcon, // Plus sign with circle around it
  MdRefresh as ReadInfoIcon, // Two arrows in a circle
  MdEdit as UpdateInfoIcon, // Pencil
  MdDelete as DeleteInfoIcon, // Trash can
  MdAddAlarm as CreateHoraIcon, // Clock with plus sign
  MdAutoDelete as DeleteHoraIcon, // Trash Can with clock
  MdLockOutline as LockedPropIcon, // Lock
  MdLockOpen as UnlockedPropIcon, // Unlocked lock
  MdInput as InputDisciplinaIcon, // Arrow pointing into a box
} from "react-icons/md";
// import {
//   AddCircleOutlineIcon as CreateInfoIcon,
//   Refresh as ReadInfoIcon,
//   Edit as UpdateInfoIcon,
//   Delete as DeleteInfoIcon,
//   AddAlarm as CreateHoraIcon,
//   AutoDelete as DeleteHoraIcon,
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

/* Default Info Buttons */

function CreateInfo({ createFunc, text = "Create", size = "2em" }) {
  return (
    <CreateInfoIcon
      className="iconCreate"
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

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

function DeleteInfo({ deleteFunc, text = "Delete", size = "2em" }) {
  return (
    <DeleteInfoIcon
      className="iconDelete"
      onClick={deleteFunc}
      title={text}
      size={size}
    />
  );
}

/* Specific Icon buttons */

function CreateHora({ createFunc, text = "Create", size = "2em" }) {
  return (
    <CreateHoraIcon
      className="iconCreate"
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

function UpdateClassTime({ updateFunc, text = "Update", size = "2em" }) {
  return (
    <UpdateClassTimeIcon
      className="iconUpdate"
      onClick={updateFunc}
      title={text}
      size={size}
    />
  );
}

function DeleteHora({ deleteFunc, text = "Delete", size = "2em" }) {
  return (
    <DeleteHoraIcon
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

export {
  UpdateClassTime,
  CreateDBButton,
  ReadDBButton,
  CreateInfo,
  ReadInfo,
  UpdateInfo,
  DeleteInfo,
  CreateHora,
  DeleteHora,
  LockedProp,
  UnlockedProp,
  InputDisciplina,
  CustomCreateButton,
  CustomDeleteButton,
};
