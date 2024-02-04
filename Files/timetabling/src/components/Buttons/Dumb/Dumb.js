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
  MdInput as InputSubjectIcon, // Arrow pointing into a box
  MdRefresh as ReadInfoIcon, // Two arrows in a circle
  MdEdit as UpdateInfoIcon, // Pencil
} from "react-icons/md";
import myStyles from "../../../config/myStyles";
// import {
//   AddCircleOutlineIcon as CreateItemIcon,
//   Refresh as ReadInfoIcon,
//   Edit as UpdateInfoIcon,
//   Delete as DeleteItemIcon,
//   AddAlarm as CreateClassTimeIcon,
//   AutoDelete as DeleteClassTimeIcon,
//   LockRounded as LockedPropIcon,
//   LockOpenRounded as UnlockedPropIcon,
//   Input as InputSubjectIcon,
// } from "@mui/icons-material";

const localClassNames = myStyles.classNames.local.component.DumbButtons;

/* Database Buttons */

function CreateDBButton({ createFunc, text = "Create", size = "2em" }) {
  return (
    <CreateDBIcon
      className={localClassNames.create}
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

function ReadDBButton({ readFunc, text = "Read", size = "2em" }) {
  return (
    <ReadDBIcon
      className={localClassNames.read}
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
      className={localClassNames.create}
      onClick={createFunc}
      title={text}
      size={size}
    />
  );
}

function UpdateItem({
  updateFunc,
  text = "Update",
  size = "2em",
  color = "black",
}) {
  return (
    <UpdateItemIcon
      className={localClassNames.update}
      onClick={updateFunc}
      title={text}
      size={size}
      color={color}
    />
  );
}

function DeleteItem({ deleteFunc, text = "Delete", size = "2em" }) {
  return (
    <DeleteItemIcon
      className={localClassNames.delete}
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
      className={localClassNames.read}
      onClick={readFunc}
      title={text}
      size={size}
    />
  );
}

function UpdateInfo({ updateFunc, text = "Update", size = "2em" }) {
  return (
    <UpdateInfoIcon
      className={localClassNames.update}
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
      className={localClassNames.create}
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
      className={localClassNames.update}
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
      className={localClassNames.delete}
      onClick={deleteFunc}
      title={text}
      size={size}
    />
  );
}

function LockedProp({ unlockFunc, text = "Locked", size = "2em" }) {
  return (
    <LockedPropIcon
      className={localClassNames.locked}
      onClick={unlockFunc}
      title={text}
      size={size}
    />
  );
}

function UnlockedProp({ lockFunc, text = "Unlocked", size = "2em" }) {
  return (
    <UnlockedPropIcon
      className={localClassNames.unlocked}
      onClick={lockFunc}
      title={text}
      size={size}
    />
  );
}

function InputSubject({ createFunc, text = "Input", size = "2em" }) {
  return (
    <InputSubjectIcon
      className={localClassNames.inputSubject}
      onClick={createFunc}
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
  InputSubject,
  CreateDBButton,
  ReadDBButton,
  ReadInfo,
  UpdateInfo,
  LockedProp,
  UnlockedProp,
};
