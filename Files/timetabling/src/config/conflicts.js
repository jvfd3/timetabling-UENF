const conflicts = {
  subject: {
    parity: {
      weight: 1,
      name: "Paridade de semestre",
    },
  },
  professorAlloc: {
    weight: 1,
    name: "Alocação simultânea de professores",
  },
  roomAlloc: {
    weight: 1,
    name: "Alocação simultânea de Salas",
  },
  roomCapacity: {
    weight: 1,
    name: "Capacidade de sala insuficiente pra demanda",
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