const configInfo = {
  iconButtons: true,
  toast: {
    time: 2000,
    position: "bottom-right",
  },
  routing: {
    filePath: "/pages/",
    urlPath: "/timetabling-UENF/",
  },
  pageSelection: {
    main: {
      pageName: "Main",
      url: "main",
    },
    notFound: {
      pageName: "Not Found",
      url: "notFound",
    },
    multiClasses: {
      pageName: "MultiTurmas",
      url: "multiturmas",
    },
    CCTable: {
      pageName: "CCTable",
      url: "cctable",
    },
    classes: {
      pageName: "Turmas",
      url: "turmas",
    },
    professors: {
      pageName: "Professores",
      url: "professores",
    },
    rooms: {
      pageName: "Salas",
      url: "salas",
    },
    subjects: {
      pageName: "Disciplinas",
      url: "disciplinas",
    },
    students: {
      pageName: "Alunos",
      url: "alunos",
    },
  },
  AWS: {
    fullEndpoint:
      "https://ey1h94aard.execute-api.us-east-2.amazonaws.com/timetablingStage/",
  },
  defaultIndexes: {
    year: 10, // 10: 2024
    semester: 0, // 1
    professor: 2, // Tang
    student: 38, // João Vítor Fernandes Dias
    subject: 58, // Monografia
    room: 1, // Inf. 1
    classItem: 10,
  },
};

export default configInfo;
