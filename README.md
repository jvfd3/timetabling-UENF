# My Monograph's GitHub Page - ROOT/FILES/TIMETABLING/README.MD

## Lista dos conflitos

| Categoria | Especificacão | Seriedade              | Informação necessária                                              | Visualização                                                                       | Explicação                                                    |
| --------- | ------------- | ---------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Sala      | Alocação      | 4: não pode ocorrer    | 1. Cód Salas; 2. Cód. Sala (dias, inicios, durações)               | 1. Cor da label de sala, Dia, Hora de início, Duração; 2. Labels de todas as salas | Sala já ocupada no mesmo dia e horário                        |
| Sala      | Capacidade    | 3: dá para contornar?  | 1. Cód Sala; 1.1. Capac. Sala Atual; 1.2. num. Demandas/inscrições | 1. Número inscritos; 2. Label Seleção de salas; 3. Todas as outras salas           | Há alunos demais na turma                                     |
| Professor | Alocação      | 4: não pode ocorrer    | 1. Cód Salas; 2. Cód Sala (Nome Prof, dia, inicio, durações)       | 1. Cor da label do Dia, Hora, Duração e Professor                                  | Professor já dá aula nesse horário                            |
| Professor | Disciplina    | 3: dá para contornar?  | 1. Cód Sala (Nome Prof, disciplina); 2. Preferencias               | 1. Cor da Label do professor, cor da label da disciplina                           | Professor não ministra essa disciplina                        |
| Professor | Preferência   | 2: Resolver é opcional | 1. Nome Prof; 2. Cód. Sala (dias, inicios, durações)               | 1. Cor da label do professor, Dia, Hora e duração                                  | Professor prefere outro horário                               |
| Aluno     | Requisitos    | 3: dá para contornar?  | ...                                                                | 1. Cor do texto do aluno, label disciplina                                         | Aluno não tem os requisitos necessários                       |
| Aluno     | Demanda       | 3: dá para contornar?  | ...                                                                | 1. Cor do texto do aluno, label disciplina                                         | Quais disciplinas mais demandadas não foram ofertadas         |
| Aluno     | Alocação      | 2: Resolver é opcional | Matrícula, salas, por sala (dia, hora, duracao)                    | 1. Cor do texto do aluno, dia, hora, duracao                                       | Aluno tá inscrito em outra turma nesse mesmo período de tempo |

## Links

- [Root][base-link]
- [Where it should begin][Pages-link]
- [Timetabling UENF][timetabling-uenf-link]

[base-link]: https://jvfd3.github.io/
[Pages-link]: https://jvfd3.github.io/Files/Pages/
[timetabling-uenf-link]: https://jvfd3.github.io/timetabling-UENF/
