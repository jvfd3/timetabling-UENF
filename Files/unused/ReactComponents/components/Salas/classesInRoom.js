function getTurmas(id) {
  let horarios = sqlDataFromJson.classtimes;
  let horariosNestaSala = [];
  for (const chaveTurma in horarios) {
    let horario = horarios[chaveTurma];
    if (horario.idSala === id) {
      horariosNestaSala.push(horario);
    }
  }
  let fullInfoFromTurmasNaSala =
    appendInfoFromTurmasUsingHorarios(horariosNestaSala);

  let dias = options.constantValues.days;

  fullInfoFromTurmasNaSala.sort((a, b) => {
    let diaA = dias.find((dia) => dia.value === a.dia);
    let diaB = dias.find((dia) => dia.value === b.dia);
    if (dias.indexOf(diaA) < dias.indexOf(diaB)) {
      return -1;
    }
    if (dias.indexOf(diaA) > dias.indexOf(diaB)) {
      return 1;
    }
    if (a.horaInicio < b.horaInicio) {
      return -1;
    }
    if (a.horaInicio > b.horaInicio) {
      return 1;
    }
    return 0;
  });
  return fullInfoFromTurmasNaSala;
}

function appendInfoFromTurmasUsingHorarios(horarios) {
  /* This function is used in the page "Turmas" */
  /* Tá mal feito e repetindo propriedades. Deve ser ajustado com o BD */
  let turmas = sqlDataFromJson.classes;
  let professores = sqlDataFromJson.professors;
  let foundTurmas = turmas.filter((turma) =>
    horarios.some((horario) => horario.idTurma === turma.id)
  );

  let updatedHorarios = horarios.map((horario) => {
    let correspondingTurma = foundTurmas.find(
      (turma) => turma.id === horario.idTurma
    );
    return { ...horario, ...correspondingTurma };
  });

  updatedHorarios = updatedHorarios.map((horario) => {
    console.log(horario);
    let correspondingDisciplina = getByIDdisciplina(horario.idDisciplina);
    console.log("correspondingDisciplina", correspondingDisciplina);
    return {
      ...horario,
      ...correspondingDisciplina,
      nomeDisciplina: correspondingDisciplina?.nome,
      apelidoDisciplina: correspondingDisciplina?.apelido,
      codigoDisciplina: correspondingDisciplina?.codigo,
    };
  });

  updatedHorarios = updatedHorarios.map((horario) => {
    let correspondingProfessor = professores.find(
      (professor) => professor.id === horario.idProfessor
    );
    return {
      ...horario,
      ...correspondingProfessor,
      nomeProfessor: correspondingProfessor.nome,
      apelidoProfessor: correspondingProfessor.apelido,
    };
  });
  return updatedHorarios;
}
