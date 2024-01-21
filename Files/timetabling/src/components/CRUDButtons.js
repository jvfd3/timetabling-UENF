import {
  CreateDBButton,
  ReadDBButton,
  UpdateInfo,
  DeleteItem,
} from "./Buttons/Dumb/Dumb";

function CRUDButtonsContainer(crudFunctions) {
  const { createFunc, readFunc, updateFunc, deleteFunc } = crudFunctions;
  return (
    <div className="CRUDButtonsContainer">
      <CreateDBButton createFunc={createFunc} />
      <ReadDBButton readFunc={readFunc} />
      <UpdateInfo updateFunc={updateFunc} />
      <DeleteItem deleteFunc={deleteFunc} />
    </div>
  );
}

export { CRUDButtonsContainer };
