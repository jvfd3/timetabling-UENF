const configInfo = {
  iconButtons: true,
  toast: {
    autoClose: 2000,
    position: "bottom-right",
    // closeOnClick
    // draggable
    // pauseOnHover
    // hideProgressBar={false}
    // newestOnTop={false}
    // pauseOnFocusLoss
    // theme="light"
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
      "https://mckwruc3w1.execute-api.us-east-2.amazonaws.com/timetablingStage",
  },
  defaultIndexes: {
    year: 6, // 10: 2024
    semester: 1, // 1
    professor: 2, // Tang
    student: 38, // João Vítor Fernandes Dias
    subject: 58, // Monografia
    room: 1, // Inf. 1
    classItem: 10,
  },
};

export default configInfo;
