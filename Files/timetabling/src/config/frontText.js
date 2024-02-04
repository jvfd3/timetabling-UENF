const text = {
  page: {
    rooms: {
      title: "INFORMAÇÕES DA SALA",
      tableTitles: {
        block: "Bloco",
        description: "Descrição",
        code: "Código",
        capacity: "Capacidade",
        id: "ID",
      },
    },
    students: {
      title: "INFORMAÇÕES DO ALUNO",
      tableTitles: {
        year: "Ano de entrada",
        course: "Curso",
        enrollment: "Matrícula",
        name: "Nome",
        id: "ID",
      },
    },
    subjects: {
      title: "INFORMAÇÕES DA DISCIPLINA",
      tableTitles: {
        code: "Código",
        name: "Nome",
        alias: "Apelido",
        expectedSemester: "Período Esperado",
        id: "ID",
      },
    },
    professors: {
      title: "INFORMAÇÕES DO PROFESSOR",
      tableTitles: {
        lab: "laboratório",
        course: "curso",
        name: "nome",
        alias: "apelido",
        id: "ID",
      },
    },
    main: {
      instructions: {
        header: "Instruções",
        subHeaders: [
          {
            key: 1,
            title: "Objetivo:",
            description:
              "O objetivo desta aplicação é facilitar a visualização e manipulação de dados de horários de aulas.",
          },
          {
            key: 2,
            title: "Como usar:",
            description:
              "Adicione as informações de disciplina, salas, professores, turmas e horários. Veja os conflitos que surgem na página MultiTurmas e resolva-os. A grade final criada pode ser visualizada na página ccTable.",
          },
        ],
      },
      shortcuts: {
        header: "Atalhos",
        infoList: [
          {
            key: 1,
            title: "Mudar páginas:",
            description:
              "passar o mouse por cima do menu no canto superior esquerdo da tela e usar o scroll do mouse",
          },
          {
            key: 2,
            title: "Selecionar um item:",
            description:
              "passar o mouse por cima da seleção de itens e usar o scroll do mouse",
          },
        ],
      },
    },
    classes: {
      title: "INFORMAÇÕES DA TURMA",
      tableTitles: {
        yearSemester: "Ano/Semestre",
        subject: "Disciplina",
        professor: "Professor",
        expectedDemand: "Demanda Estimada",
        id: "ID",
      },
      classTimeTitles: {
        classTimes: "Horários",
        addClassTime: "Adicionar Horário",
      },
    },
    notFound: {
      title: "Is this a 404 page?",
      message: "I guess not. 💠",
    },
    multiClasses: {
      title: "MultiTurmas",
    },
    ccTable: {},
  },
  component: {
    unexpectedPlaceholder: "Isso não deveria estar vazio. 😅",
    ccTable: {},
    classTimes: {},
    SelectPlaceholder: {
      room: "Sala",
      student: "Aluno",
      classItem: "Turma",
      subject: "Disciplina",
      professor: "Professor",
      // classTime: "Horário",

      year: "Ano",
      semester: "Semestre",
      expectedSemester: "Período Esperado",

      block: "Bloco",
      lab: "Laboratório",
      duration: "Duração",
      day: "Dia da semana",
      hour: "Hora de início",
      course: "Curso relacionado",
    },
    textInputPlaceholder: {
      id: "ID",
      name: "Nome",
      code: "Código",
      alias: "Apelido",
      comment: "Descrição",
      capacity: "Capacidade",
      enrollment: "Matrícula",
      expectedDemand: "Demanda Estimada",
    },
  },
};

export default text;
