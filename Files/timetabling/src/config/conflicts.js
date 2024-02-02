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
};

export default conflicts;
