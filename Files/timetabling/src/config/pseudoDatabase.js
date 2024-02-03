const pseudoDatabase = {
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
  labs: [
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
    {
      centro: "CCT",
      apelido: "LAMET",
      nome: "Laboratório de Meteorologia",
    },
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
  ],
  yetUnusedValues: {
    category: [
      { id: 0, description: "Obrigatória" },
      { id: 1, description: "Eletiva optativa" },
      { id: 2, description: "Eletiva Livre" },
    ],
    centros: [
      { code: "CBB", name: "Centro de Biociências e Biotecnologia" },
      { code: "CCH", name: "Centro de Ciências do Homem" },
      { code: "CCT", name: "Centro de Ciência e Tecnologia" },
      {
        code: "CCTA",
        name: "Centro de Ciências e Tecnologias Agropecuárias",
      },
    ],
    otherBlocks: [
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
    otherLabs: [
      {
        centro: "CBB",
        apelido: "LBCT",
        nome: "Laboratório de Biologia Celular e Tecidual",
      },
      {
        centro: "CBB",
        apelido: "LBR",
        nome: "Laboratório de Biologia do Reconhecer",
      },
      { centro: "CBB", apelido: "LBT", nome: "Laboratório de Biotecnologia" },
      {
        centro: "CBB",
        apelido: "LCA",
        nome: "Laboratório de Ciências Ambientais",
      },
      {
        centro: "CBB",
        apelido: "LFBM",
        nome: "Laboratório de Fisiologia e Bioquímica de Microorganismos",
      },
      {
        centro: "CBB",
        apelido: "LQFPP",
        nome: "Laboratório de Química e Função de Proteínas e Peptídeos",
      },
      {
        centro: "CCH",
        apelido: "LCL",
        nome: "Laboratório de Cognição e Linguagem",
      },
      {
        centro: "CCH",
        apelido: "LEEL",
        nome: "Laboratório de Estudo da Educação e Linguagem",
      },
      {
        centro: "CCH",
        apelido: "LESCE",
        nome: "Laboratório de Estudo da Sociedade Civil e do Estado",
      },
      {
        centro: "CCH",
        apelido: "LEEA",
        nome: "Laboratório de Estudo do Espaço Antrópico",
      },
      {
        centro: "CCH",
        apelido: "LGPP",
        nome: "Laboratório de Gestão e Políticas Públicas",
      },
      {
        centro: "CCTA",
        apelido: "LEAG",
        nome: "Laboratório de Engenharia Agrícola",
      },
      {
        centro: "CCTA",
        apelido: "LEF",
        nome: "Laboratório de Entomologia e Fitopatologia",
      },
      {
        centro: "CCTA",
        apelido: "LRMGA",
        nome: "Laboratório de Reprodução e Melhoramento Genético Animal",
      },
      {
        centro: "CCTA",
        apelido: "LSA",
        nome: "Laboratório de Sanidade Animal",
      },
      { centro: "CCTA", apelido: "LSOL", nome: "Laboratório de Solos" },
      {
        centro: "CCTA",
        apelido: "LTA",
        nome: "Laboratório de Tecnologia de Alimentos",
      },
      { centro: "CCTA", apelido: "LZO", nome: "Laboratório de Zootecnia" },
      {
        centro: "CCTA",
        apelido: "LMGV",
        nome: "Laboratório de Melhoramento Genético Vegetal",
      },
      { centro: "CCTA", apelido: "LFIT", nome: "Laboratório de Fitotecnia" },
    ],
  },
};

export default pseudoDatabase;
