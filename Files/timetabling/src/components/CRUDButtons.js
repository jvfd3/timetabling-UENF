import myStyles from "../config/myStyles";
import {
  CreateDBButton,
  ReadDBButton,
  UpdateInfo,
  DeleteItem,
} from "./Buttons/Dumb/Dumb";

const localClassNames = myStyles.classNames.local.component.CRUDButtons;

function CRUDButtonsContainer(crudFunctions) {
  const { createFunc, readFunc, updateFunc, deleteFunc } = crudFunctions;
  return (
    <div className={localClassNames.container}>
      <CreateDBButton createFunc={createFunc} />
      <ReadDBButton readFunc={readFunc} />
      <UpdateInfo updateFunc={updateFunc} />
      <DeleteItem deleteFunc={deleteFunc} />
    </div>
  );
}

export { CRUDButtonsContainer };
