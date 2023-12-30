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
      multiTurmas: { label: "MultiTurmas", value: "multiturmas" },
      CCTable: { label: "CCTable", value: "cctable" },
      turmas: { label: "Turmas", value: "turmas" },
      professores: { label: "Professores", value: "professores" },
      salas: { label: "Salas", value: "salas" },
      disciplinas: { label: "Disciplinas", value: "disciplinas" },
      alunos: { label: "Alunos", value: "alunos" },
    },
    courses: [
      { apelido: "CC", nome: "Ciência da Computação" },
      { apelido: "Eng Civ", nome: "Engenharia Civil" },
      { apelido: "Lic Fis", nome: "Licenciatura em Física" },
      { apelido: "Lic Qui", nome: "Licenciatura em Química" },
      { apelido: "Eng Prod", nome: "Engenharia de Produção" },
      { apelido: "Eng Met", nome: "Engenharia Meteorológica" },
      { apelido: "Lic Mat", nome: "Licenciatura em Matemática" },
      { apelido: "Eng Mat", nome: "Engenharia Metalúrgica e de Materiais" },
      { apelido: "Lic Qui EAD", nome: "Licenciatura em Química à Distância" },
      {
        apelido: "Eng Petr",
        nome: "Engenharia de Exploração e Produção de Petróleo",
      },
      { apelido: "Outro", nome: "Outro" },
    ],
    laboratorios: [
      {
        centro: "CCT",
        apelido: "LCMAT",
        nome: "Laboratório de Ciências Matemáticas",
      },
      {
        centro: "CCT",
        apelido: "LCFIS",
        nome: "Laboratório de Ciências Físicas",
      },
      { centro: "CCT", apelido: "LAMET", nome: "Laboratório de Meteorologia" },
      {
        centro: "CCT",
        apelido: "LECIV",
        nome: "Laboratório de Engenharia Civil",
      },
      {
        centro: "CCT",
        apelido: "LCQUI",
        nome: "Laboratório de Ciências Químicas",
      },
      {
        centro: "CCT",
        apelido: "LAMAV",
        nome: "Laboratório de Materiais Avançados",
      },
      {
        centro: "CCT",
        apelido: "LEPROD",
        nome: "Laboratório de Engenharia de Produção",
      },
      {
        centro: "CCT",
        apelido: "LENEP",
        nome: "Laboratório de Engenharia e Exploração de Petróleo",
      },
      /*
      { centro: "CBB",  apelido: "LBCT",   nome: "Laboratório de Biologia Celular e Tecidual"},
      { centro: "CBB",  apelido: "LBR",    nome: "Laboratório de Biologia do Reconhecer"},
      { centro: "CBB",  apelido: "LBT",    nome: "Laboratório de Biotecnologia"},
      { centro: "CBB",  apelido: "LCA",    nome: "Laboratório de Ciências Ambientais"},
      { centro: "CBB",  apelido: "LFBM",   nome: "Laboratório de Fisiologia e Bioquímica de Microorganismos"},
      { centro: "CBB",  apelido: "LQFPP",  nome: "Laboratório de Química e Função de Proteínas e Peptídeos"},
      { centro: "CCH",  apelido: "LCL",    nome: "Laboratório de Cognição e Linguagem"},
      { centro: "CCH",  apelido: "LEEL",   nome: "Laboratório de Estudo da Educação e Linguagem"},
      { centro: "CCH",  apelido: "LESCE",  nome: "Laboratório de Estudo da Sociedade Civil e do Estado"},
      { centro: "CCH",  apelido: "LEEA",   nome: "Laboratório de Estudo do Espaço Antrópico"},
      { centro: "CCH",  apelido: "LGPP",   nome: "Laboratório de Gestão e Políticas Públicas"},
      { centro: "CCTA", apelido: "LEAG",   nome: "Laboratório de Engenharia Agrícola"},
      { centro: "CCTA", apelido: "LEF",    nome: "Laboratório de Entomologia e Fitopatologia"},
      { centro: "CCTA", apelido: "LRMGA",  nome: "Laboratório de Reprodução e Melhoramento Genético Animal"},
      { centro: "CCTA", apelido: "LSA",    nome: "Laboratório de Sanidade Animal"},
      { centro: "CCTA", apelido: "LSOL",   nome: "Laboratório de Solos"},
      { centro: "CCTA", apelido: "LTA",    nome: "Laboratório de Tecnologia de Alimentos"},
      { centro: "CCTA", apelido: "LZO",    nome: "Laboratório de Zootecnia"},
      { centro: "CCTA", apelido: "LMGV",   nome: "Laboratório de Melhoramento Genético Vegetal"},
      { centro: "CCTA", apelido: "LFIT",   nome: "Laboratório de Fitotecnia"},
      */
    ],
  },
  emptyObjects: {
    turma: {
      id: null, //INT
      ano: null, //INT
      semestre: null, //INT
      demandaEstimada: null, //INT
      professor: null, //OBJ
      disciplina: null, //OBJ
      horarios: null, //ARRAY
    },
    professor: {
      apelido: null, //STR
      curso: null, //STR
      id: null, //INT
      laboratorio: null, //STR
      nome: null, //STR
    },
    disciplina: {
      apelido: null, //STR
      codigo: null, //INT
      id: null, //INT
      nome: null, //STR
      periodo: null, //INT
    },
    horario: {
      dia: null, //STR
      duracao: null, //INT
      horaInicio: null, //INT
      idHorario: null, //INT
      ordem: null, //INT
      sala: null, //OBJ
    },
    sala: {
      bloco: null, //STR
      capacidade: null, //INT
      codigo: null, //STR
      descricao: null, //STR
      id: null, //INT
    },
    laboratorio: {
      centro: null, //STR
      apelido: null, //STR
      nome: null, //STR
    },
    cursos: {
      apelido: null, //STR
      nome: null, //STR
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
    region: "us-east-2",
    smallEndpoint: "4tw2l96f11.execute-api.us-east-2",
  },
  config: {
    iconButtons: true,
  },
  SelectStyles: {
    fullWidth: {
      menu: ({ width, ...css }) => ({ ...css }),
    },
    fixedWidth: {
      menu: ({ width, ...css }) => ({ ...css, width: 300 }),
    },
    fullItem: {
      control: (css) => ({
        ...css,
        width: "100%",
      }),
      menu: (css) => ({
        ...css,
        minWidth: "max-content",
      }),
      option: (css) => ({
        ...css,
        width: "100%",
      }),
    },
  },
};

export default options;
