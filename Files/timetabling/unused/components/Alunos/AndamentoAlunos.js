function InformacoesDisciplinasAluno() {
  function SelectDisciplinas(props) {
    const { myPlaceHolder, myOptions, current_student, update_student } = props;
    return (
      <Select
        className="manyDisciplinasMultiSelect"
        placeholder={myPlaceHolder}
        options={allLocalJsonData.static.infoDisciplinasCC}
        value={myOptions}
        onChange={(option) => {
          let myStudent = { ...current_student };
          myStudent[myPlaceHolder] = option;
          update_student(myStudent);
        }}
        isMulti={true}
        isClearable={false}
        isSearchable={true}
        getOptionValue={(option) => option.codigo}
        getOptionLabel={(option) => option.nome}
        formatOptionLabel={({ codigo, nome }) => {
          let text = `${codigo}: ${nome}`;
          return text;
        }}
      />
    );
  }

  return (
    <div className="showBasicDataCard">
      <h3>Andamento do Aluno</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>Cursando</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <SelectDisciplinas
                  myPlaceHolder="cursando"
                  myOptions={student.cursando}
                  current_student={student}
                  update_student={change_student}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th>Não Feitas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <SelectDisciplinas
                  myPlaceHolder="naofeitas"
                  myOptions={student.naofeitas}
                  current_student={student}
                  update_student={change_student}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Aprovadas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <SelectDisciplinas
                  myPlaceHolder="aprovadas"
                  myOptions={student.aprovadas}
                  current_student={student}
                  update_student={change_student}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InformacoesDisciplinasAluno;
