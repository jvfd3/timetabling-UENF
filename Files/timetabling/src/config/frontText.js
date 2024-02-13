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
    nonOfferedSubjects: {
      mainTitle: "Todas as disciplinas do período ímpar foram oferecidas 👍",
      subtitle: "Isso é mesmo possível? Ou o código bugou em algum lugar? 🤔",
      baseMessage: "Disciplinas ainda não oferecidas ",
      headerText: "Período - (Código) Nome",
    },
    filters: {
      year: "Ano:",
      semester: "Semestre:",
      day: "Dia:",
      hour: "Hora:",
      expectedSemester: "Período Esperado:",
      subject: "Disciplina:",
      professor: "Professor:",
      room: "Sala:",
    },
    classItemTable: {
      tableTitles: {
        subject: "Disciplina",
        professor: "Professor",
        expectedDemand: "Demanda Estimada",
        classTimes: "Horários",
      },
    },
    classTimeViewTable: {
      specificTexts: {
        room: {
          headerTitle: "Turmas nesta sala: ",
          noClassesTitle: "Não há turmas nesta sala",
        },
        professor: {
          headerTitle: "Turmas desse professor: ",
          noClassesTitle: "Não há turmas para este professor",
        },
        subject: {
          headerTitle: "Turmas desta disciplina: ",
          noClassesTitle: "Não há turmas para esta disciplina",
        },
      },
      tableTitles: {
        idTurma: "idTurma",
        yearSemester: "Ano.Semestre",
        subject: "Disciplina",
        professor: "Professor",
        demand: "Demanda Estimada",
        idHorario: "idHorario",
        room: "Sala",
        day: "Dia",
        startHour: "Hora Início",
        duration: "Duração",
      },
    },
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
  conflicts: {
    subject: {
      base: "Conflitos de disciplina avaliados:\n",
      isSet: "✅ Disciplina está definida\n",
      notSetSubject: "❌ Conflito: disciplina não está definida\n",
      notSetExpectedSemester:
        "⚠️ Alerta: o período esperado da disciplina não está definido\n",
      optional: "mas não é obrigatória",
      CSSubject: "✅👨‍💻 Disciplina de Ciência da Computação\n",
      parity: "✅ Disciplina está na paridade correta. ",
      parityConflict: "❌ Conflito: disciplina não está na paridade correta. ",
      summer: "🌞 Não há necessidade de paridade no verão\n",
      noParity: "⚠️ Disciplina não tem uma paridade especificada\n",
      mandatoryCSSubject: "✅👨‍💻 Disciplina obrigatória\n",
      notCSSubject:
        "⚠️👷 Alerta: Esta disciplina não é de Ciência da Computação\n",
      optionalCS: "✅👨‍💻🎓 Disciplina eletiva optativa\n",
      optionalFree: "✅👨‍💻🌍 Disciplina eletiva livre\n",
    },
    professor: {
      base: "Conflitos de professor avaliados:\n",
      notSetted: "✅ Sem conflitos de professor não definido\n",
      notSettedConflict: "❌ Conflito: professor não definido\n",
      alloc: "✅ Sem conflitos de alocação de professor\n",
      allocConflict: "❌ Conflito: Alocação de professor\n",
    },
    demand: {
      base: `Conflitos de demanda avaliados:\n`,
      notSetted: `✅ Sem conflitos de demanda não definida\n`,
      notSettedConflict: `❌ Conflito: demanda não definida\n`,
      singleCapacity: `✅ Todas as salas desta turma comportam a demanda estimada\n`,
      singleCapacityConflict: `❌ Conflito: há sala que não comporta a demanda\n`,
    },
    room: {
      base: "Conflitos de alocação de sala avaliados:\n",
      alloc: "✅ Sem conflitos de alocação de sala\n",
      demand: "✅ Sem conflitos de demanda de sala\n",
      demandConflict: "❌ Conflito: Demanda de sala\n",
      notSetted: "✅ Sem conflitos de sala não definida\n",
      notSettedConflict: "❌ Conflito: Sala não definida\n",
    },
    day: {
      base: "Conflitos de dia avaliados:\n",
      roomAlloc: "✅ Sem conflitos de alocação de sala\n",
      professorAlloc: "✅ Sem conflitos de alocação de professor\n",
      notSetted: "✅ Sem conflitos de dia não definido\n",
      notSettedConflict: "❌ Conflito: dia não definido\n",
    },
    hour: {
      base: "Conflitos de hora avaliados:\n",
      roomAlloc: "✅ Sem conflitos de alocação de sala\n",
      professorAlloc: "✅ Sem conflitos de alocação de professor\n",
      notSetted: "✅ Sem conflitos de hora não definida\n",
      notSettedConflict: "❌ Conflito: hora não definida\n",
    },
    duration: {
      base: "Conflitos de duração avaliados:\n",
      roomAlloc: "✅ Sem conflitos de alocação de sala\n",
      professorAlloc: "✅ Sem conflitos de alocação de professor\n",
      notSetted: "✅ Sem conflitos de duração não definida\n",
      notSettedConflict: "❌ Conflito: duração não definida\n",
    },
  },
};

export default text;
