const configInfo = {
  iconButtons: true,
  hasDenseClassSelects: true,
  usesLocalJSON: false,
  isDebugging: false, // Set to false for production
  defaultIndexes: {
    year: 10, // 5: 2019; 10: 2024
    semester: 0, // 0: 1, 1: 2, 2: verão
    professor: 2, // Tang
    student: 38, // João Vítor Fernandes Dias
    subject: 58, // Monografia
    room: 1, // Inf. 1
    classItem: 10,
  },
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
      pageName: "Grade de Horários",
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
    defaultRequestDelay: 200,
  },
  local: {
    fullEndpoint: "http://localhost:8800/api",
    defaultRequestDelay: 200,
  },
  endpoints: {
    classData: "classData",
    classTime: "classTime",
    professor: "professor",
    room: "room",
    student: "student",
    subject: "subject",
  },
};

export default configInfo;
