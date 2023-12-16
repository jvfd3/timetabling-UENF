import React, { useEffect, useState } from "react";
import "../CSS/defaultStyle.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getProfessores,
  getDisciplinas,
  getSalas,
  getTurmas,
  addProfessor,
  addDisciplina,
  addSala,
  addTurma,
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
    // const [professores, setProfessores] = useState([]);
    // const [disciplinas, setDisciplinas] = useState([]);
    // const [salas, setSalas] = useState([]);
    // const [turmas, setTurmas] = useState([]);

    const [professor, setProfessor] = useState(options.dbTemplates.professor);
    const [disciplina, setDisciplina] = useState(options.dbTemplates.disciplina);
    const [turma, setTurma] = useState(options.dbTemplates.turma);
    const [sala, setSala] = useState(options.dbTemplates.sala);
/* 
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
 */
    useEffect(()=>{
      // getProfessores().then((data) => setProfessores(data));
      let newProfessor = {
        curso: "B",
        laboratorio: "B",
        nomeProfessor: "B",
        apelidoProfessor: "B",
      }
      setProfessor(newProfessor);
      let newDisciplina = {...disciplina};
      newDisciplina.periodoEsperado = 1234;
      newDisciplina.codigoDisciplina = "B";
      newDisciplina.nomeDisciplina = "B";
      newDisciplina.apelidoDisciplina = "B";
      setDisciplina(newDisciplina);
      let newTurma = {...turma};
      newTurma.ano = 1234;
      newTurma.semestre = 1234;
      newTurma.demandaEstimada = 1234;
      newTurma.nomeProfessor = "B";
      newTurma.codigoDisciplina = "B";
      setTurma(newTurma);
      let newSala = {...sala};
      newSala.blocoSala = "B";
      newSala.capacidade = 1234;
      newSala.bloco = "B";
      newSala.codigoSala = "B";
      newSala.descricaoBloco = "B";
      setSala(newSala);
    }, [])

    return (
      <div className="" style={{display: "flex", flexDirection: "column"}}>
        <button onClick={() => addProfessor(professor)}> Add Professor </button>
        <button onClick={() => addDisciplina(disciplina)}> Add Disciplina</button>
        <button onClick={() => addTurma(turma)}> Add Turma</button>
        <button onClick={() => addSala(sala)}> Add Sala</button>
        {/* <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} /> */}
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
