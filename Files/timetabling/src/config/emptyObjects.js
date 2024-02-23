const emptyObjects = {
  classItem: {
    id: null, //INT
    idTurma: null, //INT
    ano: null, //INT
    semestre: null, //INT
    demandaEstimada: null, //INT
    professor: null, //OBJ
    disciplina: null, //OBJ
    horarios: [], //ARRAY
  },
  classTime: {
    id: null, //INT
    dia: null, //STR
    sala: null, //OBJ
    duracao: null, //INT
    idTurma: null, //INT
    horaInicio: null, //INT
  },
  /* Items Below are still unused */
  professor: {
    apelido: null, //STR
    curso: null, //STR
    id: null, //INT
    laboratorio: null, //STR
    nome: null, //STR
  },
  subject: {
    apelido: null, //STR
    codigo: null, //INT
    id: null, //INT
    nome: null, //STR
    periodo: null, //INT
  },
  room: {
    bloco: null, //STR
    capacidade: null, //INT
    codigo: null, //STR
    descricao: null, //STR
    id: null, //INT
  },
  laboratory: {
    centro: null, //STR
    apelido: null, //STR
    nome: null, //STR
  },
  student: {
    id: null, //INT
    anoEntrada: null, //INT
    curso: null, //STR
    matricula: null, //STR
    nome: null, //STR
  },
  courses: {
    id: null, //INT
    level: null, //STR
    center: null, //STR
    alias: null, //STR
    modality: null, //STR
    category: null, //STR
    name: null, //STR
  },
};

export default emptyObjects;
