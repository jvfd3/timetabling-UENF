import React, { useState, useEffect } from "react";
import Select from "react-select";
import { readData } from "../../functions/CRUD_JSONBIN";
import { allLocalJsonData } from "../../../DB/dataFromJSON";
import options from "../../temp/options";

//  Turma: {
//         ano: number;
//         semestre: number;
//         professor: string;
//         disciplina: {
//             codigo: string;
//             nome: string;
//         };
//         horarios: {
//             sala: string;
//             dia: string;
//             horaInicio: number;
//             duracao: number;
//         }[];
//         alunos: {
//             estimativa: number;
//             demandando: string[];
//             inscritos: string[];
//         };
// }

function Manager() {
  const [turmas, setTurmas] = useState([]);
  const [turmaSelecionada, setTurmaSelecionada] = useState();

  useEffect(() => {
    fetchTurmas();
  }, []);

  const fetchTurmas = () => {
    setTurmas(allLocalJsonData.dynamic.turmasTeste);
  };

  useEffect(() => {}, [turmas]);

  const removerHorario = (id) => {
    let lTurmaSelecionada = turmaSelecionada;

    let horariosFiltrados = lTurmaSelecionada.horarios.filter(
      (horario, i) => i != id
    );
    lTurmaSelecionada.horarios = horariosFiltrados;

    let lTurmas = turmas.filter((turma) => turma.id != lTurmaSelecionada.id);

    lTurmas.push(lTurmaSelecionada);

    let lTurmasSorted = lTurmas.sort((a, b) => a.id - b.id);

    setTurmas([]);
    setTurmas(lTurmasSorted);
  };

  return (
    <div style={{ backgroundColor: "gray", color: "black" }}>
      <Select
        value={turmaSelecionada}
        options={turmas}
        isMulti={false}
        isClearable={false}
        isSearchable={true}
        onChange={(value, e) => {
          setTurmaSelecionada(value);
        }}
        placeholder="Turmas"
        getOptionLabel={(turma) =>
          `ID: ${turma.id} - ${turma?.ano} ${turma?.semestre}`
        }
        getOptionValue={(turma) => turma.id}
        get
      />
      <div>
        <h2>
          Turma selecionada:{" "}
          {`${turmaSelecionada?.ano} - ${turmaSelecionada?.semestre}`}
        </h2>
        {turmaSelecionada?.horarios?.map((horario, i) => {
          return (
            <div style={{ backgroundColor: "lightgray" }}>
              <h3 style={{ color: "black" }}>Dia:{horario.dia}</h3>
              <h3 style={{ color: "black" }}>Sala:{horario.sala}</h3>
              <h3 style={{ color: "black" }}>
                Hora de Início: {horario.horaInicio}{" "}
                {`(Duração ${horario.duracao})`}
              </h3>
              <button onClick={() => removerHorario(i)}>DELETAR</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Manager;
