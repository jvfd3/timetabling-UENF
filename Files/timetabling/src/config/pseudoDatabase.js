const pseudoDatabase = {
  courses: [
    {
      id: 1,
      level: "graduação",
      center: "CCH",
      alias: "Adm Pub",
      modality: "presencial",
      category: "bacharelado",
      name: "Administração Pública",
    },
    {
      id: 2,
      level: "graduação",
      center: "CCTA",
      alias: "Agro",
      modality: "presencial",
      category: "bacharelado",
      name: "Agronomia",
    },
    {
      id: 3,
      level: "graduação",
      center: "CCT",
      alias: "CC",
      modality: "presencial",
      category: "bacharelado",
      name: "Ciência da Computação",
    },
    {
      id: 4,
      level: "graduação",
      center: "CBB",
      alias: "Bac Bio",
      modality: "presencial",
      category: "bacharelado",
      name: "Ciências Biológicas",
      // name: "Ciências Biológicas (bacharelado)",
    },
    {
      id: 5,
      level: "graduação",
      center: "CCH",
      alias: "Cien Soci",
      modality: "presencial",
      category: "bacharelado",
      name: "Ciências Sociais",
    },
    {
      id: 6,
      level: "graduação",
      center: "CCT",
      alias: "Eng Civ",
      modality: "presencial",
      category: "bacharelado",
      name: "Engenharia Civil",
    },
    {
      id: 7,
      level: "graduação",
      center: "CCT",
      alias: "Eng Petr",
      modality: "presencial",
      category: "bacharelado",
      name: "Engenharia de Exploração e Produção de Petróleo",
    },
    {
      id: 8,
      level: "graduação",
      center: "CCT",
      alias: "Eng Prod",
      modality: "presencial",
      category: "bacharelado",
      name: "Engenharia de Produção",
    },
    {
      id: 9,
      level: "graduação",
      center: "CCT",
      alias: "Eng Metal",
      modality: "presencial",
      category: "bacharelado",
      name: "Engenharia Metalúrgica (e Materiais)",
    },
    {
      id: 10,
      level: "graduação",
      center: "CCT",
      alias: "Eng Meteo",
      modality: "presencial",
      category: "bacharelado",
      name: "Engenharia Meteorológica",
    },
    {
      id: 11,
      level: "graduação",
      center: "CCTA",
      alias: "Med Vet",
      modality: "presencial",
      category: "bacharelado",
      name: "Medicina Veterinária",
    },
    {
      id: 12,
      level: "graduação",
      center: "CCTA",
      alias: "Zoo",
      modality: "presencial",
      category: "bacharelado",
      name: "Zootecnia",
    },
    {
      id: 13,
      level: "graduação",
      center: "CBB",
      alias: "Lic Bio",
      modality: "presencial",
      category: "licenciatura",
      name: "Biologia",
      // name: "Biologia (Licenciatura)",
    },
    {
      id: 14,
      level: "graduação",
      center: "CCT",
      alias: "Lic Fís",
      modality: "presencial",
      category: "licenciatura",
      name: "Física",
      // name: "Física (licenciatura)",
    },
    {
      id: 15,
      level: "graduação",
      center: "CCT",
      alias: "Lic Mat",
      modality: "presencial",
      category: "licenciatura",
      name: "Matemática",
      // name: "Matemática (Licenciatura)",
    },
    {
      id: 16,
      level: "graduação",
      center: "CCH",
      alias: "Lic Pedag",
      modality: "presencial",
      category: "licenciatura",
      name: "Pedagogia",
      // name: "Pedagogia (Licenciatura)",
    },
    {
      id: 17,
      level: "graduação",
      center: "CCT",
      alias: "Lic Quim",
      modality: "presencial",
      category: "licenciatura",
      name: "Química",
      // name: "Química (Licenciatura)",
    },
    {
      id: 18,
      level: "graduação",
      center: "CBB",
      alias: "Lic EAD Bio",
      modality: "EAD",
      category: "licenciatura",
      name: "Ciências Biológicas",
      // name: "Ciências Biológicas (Licenciatura – EaD)",
    },
    {
      id: 19,
      level: "graduação",
      center: "CCH",
      alias: "Lic EAD Pedag",
      modality: "EAD",
      category: "licenciatura",
      name: "Pedagogia",
      // name: "Pedagogia (Licenciatura – EaD)",
    },
    {
      id: 20,
      level: "graduação",
      center: "CCT",
      alias: "Lic EAD Quim",
      modality: "EAD",
      category: "licenciatura",
      name: "Química",
      // name: "Química (Licenciatura – EaD)",
    },
    {
      id: 21,
      level: "pós-graduação",
      center: "CBB",
      alias: "PGBB",
      modality: null,
      category: null,
      name: "Biociências e Biotecnologia",
    },
    {
      id: 22,
      level: "pós-graduação",
      center: "CBB",
      alias: "PGBV",
      modality: null,
      category: null,
      name: "Biotecnologia Vegetal",
    },
    {
      id: 23,
      level: "pós-graduação",
      center: "CCTA",
      alias: "PGCA",
      modality: null,
      category: null,
      name: "Ciência Animal",
    },
    {
      id: 24,
      level: "pós-graduação",
      center: "CCT",
      alias: "PPGCN",
      modality: null,
      category: null,
      name: "Ciências Naturais",
    },
    {
      id: 25,
      level: "pós-graduação",
      center: "CCT",
      alias: "PPGC&E",
      modality: null,
      category: null,
      name: "Clima e Energia",
    },
    {
      id: 26,
      level: "pós-graduação",
      center: "CCH",
      alias: "PGCL",
      modality: null,
      category: null,
      name: "Cognição e Linguagem",
    },
    {
      id: 27,
      level: "pós-graduação",
      center: "CBB",
      alias: "PPGERN",
      modality: null,
      category: null,
      name: "Ecologia e Recursos Naturais",
    },
    {
      id: 28,
      level: "pós-graduação",
      center: "CCT",
      alias: "PPGEC",
      modality: null,
      category: null,
      name: "Engenharia Civil",
    },
    {
      id: 29,
      level: "pós-graduação",
      center: "CCT",
      alias: "Mes Eng",
      modality: null,
      category: null,
      name: "Engenharia de Reservatório e de Exploração",
    },
    {
      id: 30,
      level: "pós-graduação",
      center: "CCT",
      alias: "PPGECM",
      modality: null,
      category: null,
      name: "Engenharia e Ciência dos Materiais",
    },
    {
      id: 31,
      level: "pós-graduação",
      center: "CCTA",
      alias: "PGMP",
      modality: null,
      category: null,
      name: "Genética e Melhoramento de Plantas",
    },
    {
      id: 32,
      level: "pós-graduação",
      center: "CCT",
      alias: "PROFMAT",
      modality: null,
      category: null,
      name: "Mestrado Profissional em Matemática em Rede Nacional",
    },
    {
      id: 33,
      level: "pós-graduação",
      center: "CCTA",
      alias: "Mes Med",
      modality: null,
      category: null,
      name: "Medicina Veterinária",
    },
    {
      id: 34,
      level: "pós-graduação",
      center: "CCH",
      alias: "PPGPS",
      modality: null,
      category: null,
      name: "Políticas Sociais",
    },
    {
      id: 35,
      level: "pós-graduação",
      center: "CCTA",
      alias: "PGPV",
      modality: null,
      category: null,
      name: "Produção Vegetal",
    },
    {
      id: 36,
      level: "pós-graduação",
      center: "CCH",
      alias: "PPGSP",
      modality: null,
      category: null,
      name: "Sociologia Política",
    },
  ],
  labs: [
    {
      id: 1,
      centro: "CCT",
      apelido: "LCMAT",
      nome: "Laboratório de Ciências Matemáticas",
    },
    {
      id: 2,
      centro: "CCT",
      apelido: "LCFIS",
      nome: "Laboratório de Ciências Físicas",
    },
    {
      id: 3,
      centro: "CCT",
      apelido: "LAMET",
      nome: "Laboratório de Meteorologia",
    },
    {
      id: 4,
      centro: "CCT",
      apelido: "LECIV",
      nome: "Laboratório de Engenharia Civil",
    },
    {
      id: 5,
      centro: "CCT",
      apelido: "LCQUI",
      nome: "Laboratório de Ciências Químicas",
    },
    {
      id: 6,
      centro: "CCT",
      apelido: "LAMAV",
      nome: "Laboratório de Materiais Avançados",
    },
    {
      id: 7,
      centro: "CCT",
      apelido: "LEPROD",
      nome: "Laboratório de Engenharia de Produção",
    },
    {
      id: 8,
      centro: "CCT",
      apelido: "LENEP",
      nome: "Laboratório de Engenharia e Exploração de Petróleo",
    },
    {
      id: 9,
      centro: "CBB",
      apelido: "LBCT",
      nome: "Laboratório de Biologia Celular e Tecidual",
    },
    {
      id: 10,
      centro: "CBB",
      apelido: "LBR",
      nome: "Laboratório de Biologia do Reconhecer",
    },
    {
      id: 11,
      centro: "CBB",
      apelido: "LBT",
      nome: "Laboratório de Biotecnologia",
    },
    {
      id: 12,
      centro: "CBB",
      apelido: "LCA",
      nome: "Laboratório de Ciências Ambientais",
    },
    {
      id: 13,
      centro: "CBB",
      apelido: "LFBM",
      nome: "Laboratório de Fisiologia e Bioquímica de Microorganismos",
    },
    {
      id: 14,
      centro: "CBB",
      apelido: "LQFPP",
      nome: "Laboratório de Química e Função de Proteínas e Peptídeos",
    },
    {
      id: 15,
      centro: "CCH",
      apelido: "LCL",
      nome: "Laboratório de Cognição e Linguagem",
    },
    {
      id: 16,
      centro: "CCH",
      apelido: "LEEL",
      nome: "Laboratório de Estudo da Educação e Linguagem",
    },
    {
      id: 17,
      centro: "CCH",
      apelido: "LESCE",
      nome: "Laboratório de Estudo da Sociedade Civil e do Estado",
    },
    {
      id: 18,
      centro: "CCH",
      apelido: "LEEA",
      nome: "Laboratório de Estudo do Espaço Antrópico",
    },
    {
      id: 19,
      centro: "CCH",
      apelido: "LGPP",
      nome: "Laboratório de Gestão e Políticas Públicas",
    },
    {
      id: 20,
      centro: "CCTA",
      apelido: "LEAG",
      nome: "Laboratório de Engenharia Agrícola",
    },
    {
      id: 21,
      centro: "CCTA",
      apelido: "LEF",
      nome: "Laboratório de Entomologia e Fitopatologia",
    },
    {
      id: 22,
      centro: "CCTA",
      apelido: "LRMGA",
      nome: "Laboratório de Reprodução e Melhoramento Genético Animal",
    },
    {
      id: 23,
      centro: "CCTA",
      apelido: "LSA",
      nome: "Laboratório de Sanidade Animal",
    },
    { id: 24, centro: "CCTA", apelido: "LSOL", nome: "Laboratório de Solos" },
    {
      id: 25,
      centro: "CCTA",
      apelido: "LTA",
      nome: "Laboratório de Tecnologia de Alimentos",
    },
    {
      id: 26,
      centro: "CCTA",
      apelido: "LZO",
      nome: "Laboratório de Zootecnia",
    },
    {
      id: 27,
      centro: "CCTA",
      apelido: "LMGV",
      nome: "Laboratório de Melhoramento Genético Vegetal",
    },
    {
      id: 28,
      centro: "CCTA",
      apelido: "LFIT",
      nome: "Laboratório de Fitotecnia",
    },
  ],
  blocks: [
    {
      id: 1,
      code: "E1",
      alias: "Reitoria",
      name: "Reitoria, Sec. Acadêmica, administrativo e salas de aula",
    },
    {
      id: 2,
      code: "E2",
      alias: "CCH",
      name: "Centro de Ciências do Homem",
    },
    {
      id: 3,
      code: "P1",
      alias: "CCTA",
      name: "Centro de Ciências e Tecnologias Agropecuárias",
    },
    {
      id: 4,
      code: "P2",
      alias: "CBB",
      name: "Centro de Biociências e Biotecnologia",
    },
    {
      id: 5,
      code: "P3",
      alias: "CCT",
      name: "Centro de Ciência e Tecnologia",
    },
    {
      id: 6,
      code: "P4",
      alias: "P4",
      name: "Laboratórios e salas de aula",
    },
    {
      id: 7,
      code: "P5",
      alias: "P5",
      name: "Banco, Laboratório, administrativo e salas de aula",
    },
    {
      id: 8,
      code: "P6",
      alias: "P6",
      name: "1º prédio atrás das oficinas do CCT",
    },
    {
      id: 9,
      code: "P7",
      alias: "P7",
      name: "2º prédio atrás das oficinas do CCT",
    },
    {
      id: 10,
      code: "P8",
      alias: "P8",
      name: "3º prédio atrás das oficinas do CCT",
    },
    {
      id: 11,
      code: "P9",
      alias: "Pró-Reitoria",
      name: "Pró-Reitorias, administrativo e salas de aula",
    },
    {
      id: 12,
      code: "P10",
      alias: "P10",
      name: "5º prédio atrás do hospital veterinário",
    },
    {
      id: 13,
      code: "P11",
      alias: "P11",
      name: "4º prédio atrás do hospital veterinário",
    },
    {
      id: 14,
      code: "P13",
      alias: "P13",
      name: "3º prédio atrás do hospital veterinário",
    },
    {
      id: 15,
      code: "P15",
      alias: "P15",
      name: "2º prédio atrás do hospital veterinário",
    },
    {
      id: 16,
      code: "P17",
      alias: "P17",
      name: "1º prédio atrás do hospital veterinário",
    },
    { id: 17, code: null, alias: "Prefeitura", name: "Prefeitura do Campus" },
    { id: 18, code: null, alias: "RU", name: "Restaurante Universitário" },
    { id: 19, code: null, alias: "Ofic. CCT", name: "Oficinas do CCT" },
    { id: 20, code: null, alias: "Apitão", name: "Centro de Convenções" },
    { id: 21, code: null, alias: "Esp. Ciênc.", name: "Espaço da Ciência" },
    { id: 22, code: null, alias: "Hosp. Vet.", name: "Hospital Veterinário" },
    {
      id: 23,
      code: null,
      alias: "Lanchonete",
      name: "Lanchonete e loja de Conveniências",
    },
    { id: 24, code: null, alias: "Casa Ecológica", name: "Casa Ecológica" },
  ],
  yetUnusedValues: {
    category: [
      { id: 0, description: "Obrigatória" },
      { id: 1, description: "Eletiva optativa" },
      { id: 2, description: "Eletiva Livre" },
    ],
    centros: [
      {
        id: 1,
        code: "CCT",
        name: "Centro de Ciência e Tecnologia",
      },
      {
        id: 2,
        code: "CBB",
        name: "Centro de Biociências e Biotecnologia",
      },
      {
        id: 3,
        code: "CCTA",
        name: "Centro de Ciências e Tecnologias Agropecuárias",
      },
      {
        id: 4,
        code: "CCH",
        name: "Centro de Ciências do Homem",
      },
    ],
  },
};

export default pseudoDatabase;
