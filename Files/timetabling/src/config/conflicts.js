const conflicts = {
  subject: {
    parity: {
      weight: 0,
      name: "Disciplina não oferecida no semestre correto",
    },
    rightParityNotOffered: {
      weight: 1,
      name: "Disciplina do semestre não foi oferecida",
      description:
        "Calculado baseado em: quantidade de disciplinas em que ela é requisito e a quantidade de alunos que requerem a disciplina",
    },
  },
  roomCapacity: {
    weight: 2,
    name: "Capacidade de sala insuficiente pra demanda",
    description: "Calculado por unidade de aluno excedente",
  },
  roomAlloc: {
    weight: 2,
    name: "Alocação simultânea de Salas",
    description:
      "Calculado pelo total de alunos excedentes de todas as turmas dessa sala nesse horário",
  },
  professorAlloc: {
    weight: 10,
    name: "Alocação simultânea de professores",
    description:
      "Calculado relacionado com a quantidade de alunos da menor turma afetada; Relacionar com a paridade?",
  },
  professorPreferences: {
    weight: 1,
    name: "Preferência de Dia/Horário não atendida",
  },
  professorSubjectPreferences: {
    weight: 1,
    name: "Preferência de disciplina não atendida",
  },
  preferenceLevels: [
    { weight: 0, description: "A preferência não foi coletada" },
    { weight: 1, description: "Prefere dar aula nesse horário" },
    { weight: 2, description: "Não se importa" },
    { weight: 3, description: "Prefere não dar aula neste horário" },
    { weight: 4, description: "Não pode dar aula neste horário" },
  ],
};

export default conflicts;
