const options = {
  constantValues: {
    preferenceLevels: [
      { nivel: 0, cor: "#747474", descricao: "A preferência não foi coletada" },
      { nivel: 1, cor: "#489B14", descricao: "Prefere dar aula nesse horário" },
      { nivel: 2, cor: "#EEDF58", descricao: "Não se importa" },
      {
        nivel: 3,
        cor: "#DC8324",
        descricao: "Prefere não dar aula neste horário",
      },
      {
        nivel: 4,
        cor: "#B70000",
        descricao: "Não pode dar aula neste horário",
      },
    ],
    years: [
      { value: 2014, label: 2014 },
      { value: 2015, label: 2015 },
      { value: 2016, label: 2016 },
      { value: 2017, label: 2017 },
      { value: 2018, label: 2018 },
      { value: 2019, label: 2019 },
      { value: 2020, label: 2020 },
      { value: 2021, label: 2021 },
      { value: 2022, label: 2022 },
      { value: 2023, label: 2023 },
      { value: 2024, label: 2024 },
      { value: 2025, label: 2025 },
      { value: 2026, label: 2026 },
      { value: 2027, label: 2027 },
      { value: 2028, label: 2028 },
      { value: 2029, label: 2029 },
    ],
    semesters: [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "Verão" },
    ],
    days: [
      { value: "SEG", label: "Segunda" },
      { value: "TER", label: "Terça" },
      { value: "QUA", label: "Quarta" },
      { value: "QUI", label: "Quinta" },
      { value: "SEX", label: "Sexta" },
    ],
    hours: [
      { hora: 7, turno: "Manhã" },
      { hora: 8, turno: "Manhã" },
      { hora: 9, turno: "Manhã" },
      { hora: 10, turno: "Manhã" },
      { hora: 11, turno: "Manhã" },
      { hora: 12, turno: "Tarde" },
      { hora: 13, turno: "Tarde" },
      { hora: 14, turno: "Tarde" },
      { hora: 15, turno: "Tarde" },
      { hora: 16, turno: "Tarde" },
      { hora: 17, turno: "Tarde" },
      { hora: 18, turno: "Noite" },
      { hora: 19, turno: "Noite" },
      { hora: 20, turno: "Noite" },
      { hora: 21, turno: "Noite" },
    ],
    hoursTang: [
      { hora: 8, turno: "Manhã" },
      { hora: 10, turno: "Manhã" },
      { hora: 14, turno: "Tarde" },
      { hora: 16, turno: "Tarde" },
      { hora: 18, turno: "Noite" },
      { hora: 20, turno: "Noite" },
    ],
    expectedSemester: [
      { label: 0, value: 0 },
      { label: 1, value: 1 },
      { label: 2, value: 2 },
      { label: 3, value: 3 },
      { label: 4, value: 4 },
      { label: 5, value: 5 },
      { label: 6, value: 6 },
      { label: 7, value: 7 },
      { label: 8, value: 8 },
      { label: 9, value: 9 },
      { label: 10, value: 10 },
    ],
    durations: [
      { value: 0, label: "sem aula" },
      { value: 1, label: "1 hora" },
      { value: 2, label: "2 horas" },
      { value: 3, label: "3 horas" },
      { value: 4, label: "4 horas" },
      { value: 5, label: "5 horas" },
      // { value: 6, label: "6 hora" },
    ],
    routing: {
      filePath: "/pages/",
      urlPath: "/timetabling-UENF/",
    },
    pageSelection: {
      main: { label: "Main", value: "main" },
      notFound: { label: "Not Found", value: "notFound" },
      professoresDB: { label: "Professores DB", value: "professoresdb" },
      multiTurmas: { label: "MultiTurmas", value: "multiturmas" },
      CCTable: { label: "CCTable", value: "cctable" },
      turmas: { label: "Turmas", value: "turmas" },
      professores: { label: "Professores", value: "professores" },
      salas: { label: "Salas", value: "salas" },
      disciplinas: { label: "Disciplinas", value: "disciplinas" },
      alunos: { label: "Alunos", value: "alunos" },
    },
    courses: [
      { value: "CC", label: "Ciência da Computação" },
      { value: "Eng Civ", label: "Engenharia Civil" },
      { value: "Lic Fis", label: "Licenciatura em Física" },
      { value: "Lic Qui", label: "Licenciatura em Química" },
      { value: "Eng Prod", label: "Engenharia de Produção" },
      { value: "Eng Met", label: "Engenharia Meteorológica" },
      { value: "Lic Mat", label: "Licenciatura em Matemática" },
      { value: "Lic Qui EAD", label: "Licenciatura em Química à Distância" },
      { value: "Eng Mat", label: "Engenharia Metalúrgica e de Materiais" },
      {
        value: "Eng Petr",
        label: "Engenharia de Exploração e Produção de Petróleo",
      },
      { value: "Outro", label: "Outro" },
    ],
    laboratorios: [
      {
        centro: "CCT",
        value: "LCMAT",
        label: "Laboratório de Ciências Matemáticas",
      },
      {
        centro: "CCT",
        value: "LCFIS",
        label: "Laboratório de Ciências Físicas",
      },
      { centro: "CCT", value: "LAMET", label: "Laboratório de Meteorologia" },
      {
        centro: "CCT",
        value: "LECIV",
        label: "Laboratório de Engenharia Civil",
      },
      {
        centro: "CCT",
        value: "LCQUI",
        label: "Laboratório de Ciências Químicas",
      },
      {
        centro: "CCT",
        value: "LAMAV",
        label: "Laboratório de Materiais Avançados",
      },
      {
        centro: "CCT",
        value: "LEPROD",
        label: "Laboratório de Engenharia de Produção",
      },
      {
        centro: "CCT",
        value: "LENEP",
        label: "Laboratório de Engenharia e Exploração de Petróleo",
      },
      /*
      { centro: "CBB",  value: "LBCT",   label: "Laboratório de Biologia Celular e Tecidual"},
      { centro: "CBB",  value: "LBR",    label: "Laboratório de Biologia do Reconhecer"},
      { centro: "CBB",  value: "LBT",    label: "Laboratório de Biotecnologia"},
      { centro: "CBB",  value: "LCA",    label: "Laboratório de Ciências Ambientais"},
      { centro: "CBB",  value: "LFBM",   label: "Laboratório de Fisiologia e Bioquímica de Microorganismos"},
      { centro: "CBB",  value: "LQFPP",  label: "Laboratório de Química e Função de Proteínas e Peptídeos"},
      { centro: "CCH",  value: "LCL",    label: "Laboratório de Cognição e Linguagem"},
      { centro: "CCH",  value: "LEEL",   label: "Laboratório de Estudo da Educação e Linguagem"},
      { centro: "CCH",  value: "LESCE",  label: "Laboratório de Estudo da Sociedade Civil e do Estado"},
      { centro: "CCH",  value: "LEEA",   label: "Laboratório de Estudo do Espaço Antrópico"},
      { centro: "CCH",  value: "LGPP",   label: "Laboratório de Gestão e Políticas Públicas"},
      { centro: "CCTA", value: "LEAG",   label: "Laboratório de Engenharia Agrícola"},
      { centro: "CCTA", value: "LEF",    label: "Laboratório de Entomologia e Fitopatologia"},
      { centro: "CCTA", value: "LRMGA",  label: "Laboratório de Reprodução e Melhoramento Genético Animal"},
      { centro: "CCTA", value: "LSA",    label: "Laboratório de Sanidade Animal"},
      { centro: "CCTA", value: "LSOL",   label: "Laboratório de Solos"},
      { centro: "CCTA", value: "LTA",    label: "Laboratório de Tecnologia de Alimentos"},
      { centro: "CCTA", value: "LZO",    label: "Laboratório de Zootecnia"},
      { centro: "CCTA", value: "LMGV",   label: "Laboratório de Melhoramento Genético Vegetal"},
      { centro: "CCTA", value: "LFIT",   label: "Laboratório de Fitotecnia"},
      */
    ],
  },
  dbTemplates: {
    professor: {
      idprofessor: null,
      laboratorio: null,
      curso: null,
      apelidoProfessor: null,
      nomeProfessor: null,
    },
    disciplina: {
      iddisciplina: null,
      periodoEsperado: null,
      codigoDisciplina: null,
      nomeDisciplina: null,
      apelidoDisciplina: null,
    },
    sala: {
      idsala: null,
      blocoSala: null,
      capacidade: null,
      bloco: null,
      codigoSala: null,
      descricaoBloco: null,
    },
    turma: {
      idturma: null,
      ano: null,
      semestre: null,
      demandaEstimada: null,
      nomeProfessor: null,
      codigoDisciplina: null,
    },
  },
  yetUnusedValues: {
    centros: [
      { value: "CBB", label: "Centro de Biociências e Biotecnologia" },
      { value: "CCH", label: "Centro de Ciências do Homem" },
      { value: "CCT", label: "Centro de Ciência e Tecnologia" },
      {
        value: "CCTA",
        label: "Centro de Ciências e Tecnologias Agropecuárias",
      },
    ],
    category: [
      { value: "Obrigatória", label: "Obrigatória" },
      { value: "Eletiva optativa", label: "Eletiva optativa" },
      { value: "Eletiva Livre", label: "Eletiva Livre" },
      { value: "Serviço", label: "Serviço" },
      { value: "Par", label: "Par" },
      { value: "Ímpar", label: "Ímpar" },
    ],
  },
  AWS: {
    fullEndpoint:
      "https://4tw2l96f11.execute-api.us-east-2.amazonaws.com/timetabling/",
    endpoint: "https://4tw2l96f11.execute-api.us-east-2.amazonaws.com",
    stage: "timetabling",
    smallEndpoint: "4tw2l96f11.execute-api.us-east-2",
    dbConfig: {
      host: "dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com",
      user: "tang",
      password: "annabell",
      database: "timetabling",
    },
    KeyAPI: "ifaJUbNoR99ZgqS7g7zOL3nNbBuAi2Un3rbZFsu3",
  },
  JBVars: {
    //Json Bin Variables
    BaseLink: "https://api.jsonbin.io/v3/b/",
    headerKey: {
      contentType: "Content-Type",
      masterKey: "X-Master-Key",
      accessKey: "X-Access-Key",
      binVersioning: "X-Bin-Versioning",
    },
    headerVal: {
      contentType: "application/json",
      masterKey: "$2a$10$ZRJif54XslBOlG.SvdaIVevb21oEDFsnyH0LjnovkwFK7vy.RvIt6",
      accessKey: "$2a$10$vQ0860DgxubMR6AngRg3AOLE5mXONyBc0BFmo.wLkIIBr8m/YTgTO",
      binVersioning: false, // "<true / false>"
    },
    bins: {
      testing: "6563a5660574da7622cc69f6",
      infoSalas: "6563f31512a5d376599f5c09",
      infoProfessores: "6563f2ff54105e766fd5e2fe",
      infoDisciplinasCC: "6563ef690574da7622cc82d0",
      infoAlunos: "6563ed5a54105e766fd5e0e8",
      preferenciasProfessores: "6563ed1654105e766fd5e0d4",
      andamentoAlunos: "6563ece40574da7622cc821e",
    },
  },
};

export default options;
