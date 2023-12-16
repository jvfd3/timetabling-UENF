import React, { useEffect, useState } from "react";
import "../CSS/defaultStyle.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import {
  createDisciplina,
  createProfessor,
  createTurma,
  createSala,
  readDisciplinas,
  readProfessores,
  readTurmas,
  readSalas,
  deleteDisciplina,
} from "../../DB/dataFromDB";
import options from "../temp/options";

const Grid = ({ users, setUsers, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = users.filter((user) => user.id !== id);

        setUsers(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>email</th>
          <th>Fone</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        {users.map((item, i) => (
          <tr key={i}>
            <td width="30%">{item.nome}</td>
            <td width="30%">{item.email}</td>
            <td width="20%" onlyWeb>
              {item.fone}
            </td>
            <td alignCenter width="5%">
              <button onClick={() => handleEdit(item)}>Editar</button>
            </td>
            <td alignCenter width="5%">
              <button onClick={() => handleDelete(item.id)}>Deletar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

function Workbench(props) {
  function Workbench2() {
    let dummyDisciplina = { ...options.dbTemplates.disciplina };
    dummyDisciplina.iddisciplina = 1234;
    dummyDisciplina.periodoEsperado = 1234;
    dummyDisciplina.codigoDisciplina = "B";
    dummyDisciplina.nomeDisciplina = "B";
    dummyDisciplina.apelidoDisciplina = "B";

    const [disciplinas, setDisciplinas] = useState([dummyDisciplina]);

    useEffect(() => {
      readDisciplinas().then((data) => setDisciplinas(data));
    }, []);

    const [disciplina, setDisciplina] = useState(
      disciplinas[disciplinas.length - 1]
    );

    useEffect(() => {
      setDisciplina(disciplinas[disciplinas.length - 1]);
    }, [disciplinas]);

    console.log("disciplinas", disciplinas);
    console.log("disciplina", disciplina.iddisciplina);

    return (
      <div className="" style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => createDisciplina(disciplina)}>
          Create Disciplina
        </button>
        <button
          onClick={() => readDisciplinas().then((data) => setDisciplinas(data))}
        >
          Read Disciplinas
        </button>
        <button
          onClick={() =>
            deleteDisciplina(
              disciplinas,
              setDisciplinas,
              disciplina.iddisciplina
            )
          }
        >
          Delete Disciplina
        </button>
      </div>
    );
  }

  return (
    <div className="showBasicDataCard">
      <Workbench2 />
    </div>
  );
}

export default Workbench;
