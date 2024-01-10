import {
  CreateDBButton,
  ReadDBButton,
  UpdateInfo,
  DeleteInfo,
} from "./Buttons/Dumb/Dumb";

function CRUDButtonsContainer(crudFunctions) {
  const { createFunc, readFunc, updateFunc, deleteFunc } = crudFunctions;
  return (
    <div className="CRUDButtonsContainer">
      <CreateDBButton createFunc={createFunc} />
      <ReadDBButton readFunc={readFunc} />
      <UpdateInfo updateFunc={updateFunc} />
      <DeleteInfo deleteFunc={deleteFunc} />
    </div>
  );
}

export { CRUDButtonsContainer };
