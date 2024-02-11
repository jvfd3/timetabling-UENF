function Requirements() {
  return (
    <div className="showBasicDataCard">
      <table className="showBasicDataTable">
        <thead>
          <tr>
            <th>Requisitos</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Select
                className="manyDisciplinasMultiSelect"
                placeholder={"Requisitos da disciplina"}
                options={disciplinas} // deveriam ser todas as disciplinas
                value={disciplina.requisitos}
                onChange={(option) => {
                  let myNewValue = { ...disciplina };
                  myNewValue["requisitos"] = option;
                  setDisciplina(myNewValue);
                }}
                isMulti={true}
                isClearable={true}
                isSearchable={true}
                getOptionValue={(option) => option.codigo}
                getOptionLabel={(option) => option.nome}
                formatOptionLabel={({ codigo, nome }) => `${codigo}: ${nome}`}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export { Requirements };
