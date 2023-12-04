# My Monograph's GitHub Page - ROOT/FILES/TIMETABLING/README.MD

## Diário

### 27/11/2023

- [X] Disciplinas
  - [x] Visualização
  - [x] Fazer alterações serem enviadas pro banco de dados
- [ ] Entender o que tá rolando no roteamento do GitHub Pages
- [x] Fazer funções para resetar o DB?
- [ ] Salas
  - [ ] Visualização

#### O que faltou?

- [ ] Visualizações
  - [ ] Disciplinas
    - [ ] Atualizar no BD
    - [ ] Adicionar os professores que ministram a disciplina
      - [ ] Atualizar no BD
  - [ ] Salas
- [ ] Entender o que tá rolando no roteamento do GitHub Pages

### 28/11/2023

- [X] Visualização de turmas
  - [X] Informações
    - [X] ano
    - [X] semestre
    - [X] codigo_disciplina
    - [X] nome_disciplina
    - [X] professor
    - [X] horarios
      - [X] sala
      - [X] dia
      - [X] hora_inicio
      - [X] duracao
    - [ ] alunos
      - [ ] estimativa
      - [ ] demandando
      - [ ] inscritos

#### Detalhamento e sequência

1. Preencher turmas fake
   1. 5 em 2023
      1. 2 em 2023.1
      2. 3 em 2023.2
   2. 10 em 2022
      1. 4 em 2022.1
      2. 6 em 2022.2
   3. 3 em 2021
      1. 1 em 2022.1
      2. 1 em 2022.2
      3. 1 em 2022.3
2. Select de turmas
   1. State de turma
   2. Mostrar todas as opções de turma
3. Select de Ano
   1. State de ano
   <!-- 2. Filtra todas as turmas para apenas mostrar as turmas daquele ano -->
4. Select de Semetres
   1. State de semestre
   <!-- 2. Filtra as turmas para apenas mostrar as turmas daquele semestre -->
5. Select de Disciplinas
   1. State disciplina
   2. Fazer um padrão que lista todas as disciplinas
6. Select de Hora início
   1. Fazer a listagem de horas disponíveis e guardar em options
   2. State de hora
   3. Fazer o select
7. Select de Tempo de duração
   1. Fazer a listagem de tempos possíveis e guardar em options
      - [0.30: 4: 0.30]
   2. Fazer o select atualizar
8. Select de dias da semana
   1. No options, os values são SEG, TER, etc. e os labels são  Segunda, Terça, etc.
   2. Fazer o dia alterar
9. Select Sala
   1. Coletar os dados das salas
   2. atribuir às opções
   3. Alterar o select
   4. Mudar a cor caso a quantidade de alunos seja superior (Later, probably)
10. Card horários
    1. Fazer State de horários
    2. Fazer com que as horas atualizem os horários
11. Card de alunos
    1. Vasculhar a listagem dos alunos e ver quais estão cursando a disciplina escolhida
12. Card turma
    1. Fazer um card bonitinho que tenha:
       1. Ano.Periodo
       2. Disciplina
       3. Professor
       4. Número alunos

### 01/12/2023

- [ ] Trabalhar com conflitos
  - [ ] Converter a página padrão em uma página de testes
  - [ ] Adicionar variáveis globais de ano e semestre
  - [ ] Fazer um outro arquivo só para processar conflitos.
  - [ ] Testar formatação interna no Select
    - [ ] A: padrão
    - [ ] B: na célula
    - [ ] C: em cada uma das células
  - [ ] Testar filtros do Select
  - [ ] Cada aluno deve ter relação com um id de turma e sua situação com a mesma
    - [ ] SituaçõesBurocraticas: lista de situações do extrato
    - [ ] SituacoesDiretas: Mas com foco em aprovada, reprovada, cursando e inscrito

#### Lista dos conflitos

| Categoria | Especificacão | Seriedade              | Informação necessária                                              | Visualização                                                                       | Explicação                                                    |
| --------- | ------------- | ---------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Sala      | Capacidade    | 3: dá para contornar?  | 1. Cód Sala; 1.1. Capac. Sala Atual; 1.2. num. Demandas/inscrições | 1. Número inscritos; 2. Label Seleção de salas; 3. Todas as outras salas           | Há alunos demais na turma                                     |
| Sala      | Alocação      | 4: não pode ocorrer    | 1. Cód Salas; 2. Cód. Sala (dias, inicios, durações)               | 1. Cor da label de sala, Dia, Hora de início, Duração; 2. Labels de todas as salas | Sala já ocupada no mesmo dia e horário                        |
| Professor | Preferência   | 2: Resolver é opcional | 1. Nome Prof; 2. Cód. Sala (dias, inicios, durações)               | 1. Cor da label do professor, Dia, Hora e duração                                  | Professor prefere outro horário                               |
| Professor | Disciplina    | 3: dá para contornar?  | 1. Cód Sala (Nome Prof, disciplina); 2. Preferencias               | 1. Cor da Label do professor, cor da label da disciplina                           | Professor não ministra essa disciplina                        |
| Professor | Alocação      | 4: não pode ocorrer    | 1. Cód Salas; 2. Cód Sala (Nome Prof, dia, inicio, durações)       | 1. Cor da label do Dia, Hora, Duração e Professor                                  | Professor já dá aula nesse horário                            |
| Aluno     | Alocação      | 2: Resolver é opcional | Matrícula, salas, por sala (dia, hora, duracao)                    | 1. Cor do texto do aluno, dia, hora, duracao                                       | Aluno ainda não pode fazer essa disciplina                    |
| Aluno     | Demanda       | 3: dá para contornar?  | (é para checar se o aluno tem os pré-requisitos)                   | 1. Cor do texto do aluno, label disciplina                                         | Aluno tá inscrito em outra turma nesse mesmo período de tempo |

### 02/12/2023

- [X] Ajuste do CSS e padronização do Código
- [ ] Conflitos

#### 1. Um professor em duas aulas ao mesmo tempo

1. Aquisição dos dados
   1. Lista de professores
   2. Lista de aulas
2. Seleção dos valores base
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Selecionar um professor
      1. Criar uma lista com os nomes de todos professores
      2. Selecionar o nome do primeiro professor
3. Filtragem dos dados
   1. Filtrar as aulas do ano e semestre selecionados
   2. Filtrar as aulas do professor selecionado
4. Checar o conflito
   1. Para cada turma, que o professor ministra
      1. Obter dia, início e duração
      2. Preencher tabela de ocupação
         1. Para cada dia
            1. ir na hora de início e marcar como ocupado
            2. Fazer o mesmo para os {duração - 1} próximos horários
         2. Se o horário já estiver ocupado, marcar ambos como conflito
            1. Adiciona a uma lista o conjunto de horários que estão em conflito
5. Mostrar os conflitos
   1. console.log(lista de conflitos)

Observações:

- A lista de professores está presente em `allLocalJsonData.static.infoProfessores`, que é uma lista de objetos.
  - Cada objeto representa um professor com os seguintes valores:
    - `laboratorio`: string
    - `curso`: string
    - `nome`: string
    - `disciplinas`: lista de string
- A lista de aulas está presente em `allLocalJsonData.dynamic.turmasTeste`.
  - Cada objeto representa uma turma com os seguintes valores:
    - `id`: string
    - `ano`: string
    - `semestre`: string
    - `professor`: string
    - `disciplina`: string
    - `horarios`: lista de objetos
      - Cada objeto representa um horário com os seguintes valores:
        - `sala`: string
        - `dia`: string
        - `horaInicio`: string
        - `duracao`: string

#### 2. Uma sala com duas aulas ao mesmo tempo

1. Aquisição dos dados
   1. Lista de salas
   2. Lista de aulas
2. Seleção dos valores base
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Selecionar uma sala
      1. Criar uma lista com os nomes de todas as salas
         1. Obs.: os nomes delas são a propriedade `blocoNome` do objeto
      2. Selecionar o nome da primeira sala
3. Filtragem dos dados
   1. Filtrar as aulas do ano e semestre selecionados
   2. Filtrar as aulas da sala selecionada
4. Checar o conflito
   1. Para cada turma, que terá aula nessa sala
      1. Obter dia, início e duração
      2. Preencher tabela de ocupação
         1. Para cada dia
            1. ir na hora de início e marcar como ocupado
            2. Fazer o mesmo para os {duração - 1} próximos horários
         2. Se o horário já estiver ocupado, marcar ambos como conflito
            1. Adiciona a uma lista o conjunto de horários que estão em conflito
5. Mostrar os conflitos
   1. console.log(lista de conflitos)

#### 3. Um aluno com duas aulas ao mesmo tempo

1. Padrão
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Lista de turmas
   4. Filtrar as turmas do ano e semestre selecionados
2. Aquisição dos dados
   1. Lista de alunos
   2. Selecionar um aluno
      1. Criar uma lista com as matrículas de todos alunos
      2. Selecionar uma das matrículas
3. Filtrar as turmas referentes à matrícula
   1. Atualmente tem duas formas:
      1. tem a lista de disciplinas que o aluno tá cursando
      2. E também tem a lista de alunos que estão na turma
   2. Usarei a primeira
   3. Retorna a lista de códigos de disciplinas que o aluno deseja cursar
4. Preencher tabela de ocupação
   1. Para cada disciplina que o aluno deseja cursar
      1. Procurar se há turma disponível para essa disciplina
      2. Se não houver, adicionar à lista `Demandado mas não ofertado`
      3. Se houver, obter dia, início e duração
         1. Adicionar à matriz de ocupação
5. Checar o conflito
   1. Para cada um dos dias da matriz de ocupação
      1. para cada um dos horários
         1. Se a lista for maior de 1,
            1. Adiciona a uma lista o conjunto de horários que estão em conflito
6. Mostrar os conflitos
   1. console.log(lista de conflitos)

#### Generalização

nos 3 casos:

1. Manda a chave do item selecionado
   1. Professor: Nome
   2. Sala: blocoSala
   3. Aluno: listaDeMaterias
2. compara com a chave respectiva da lista de turmas
   1. Professor: turma.professor
   2. Sala: turma.sala
   3. Aluno: turma.disciplina.codigo
3. adiciona o horario da turma na tabela de ocupacao

### 03/12/2023

- [ ] Conflitos (um arquivo pra cada)
  - [ ] Demanda do aluno
  - [ ] Capacidade da sala
  - [ ] Disciplina do professor
  - [ ] Preferência do professor
- [ ] Fazer a visualização de cada conflito
  - [ ] Tabela de conflitos
  - [ ] Representação visual
- [ ] Juntar o que for igual em um arquivo só e depois só usar os módulos

#### Demandas dos alunos

1. Padrão
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Lista de turmas
   4. Filtrar as turmas do ano e semestre selecionados
2. Aquisição dos dados
   3. Lista de andamento dos alunos
       1. Converter a lista de disciplinas "cursando" em um objeto de listas de demandas por matérias
          1. `codigoDisciplina`
             1. `listaDeAlunos`
   4. Lista de turmas
       1. Criar uma lista com todas as disciplinas que têm turmas
3. Preparação dos dados
   1. Para cada disciplina demandada
      1. procurar quantas turmas dessa disciplina existem
      2. Aloca o valor à `codigoDisciplina`.numeroDeTurmas
   2. Quero por fim ter um objeto de objetos com os seguintes valores
      1. `codigoDisciplina`
         1. `listaDeAlunos`
         2. `numeroDeTurmas`
4. Mostrar os resultados
   1. Para cada disciplina demandada
      1. Adicionar uma linha na tabela
         1. `codigoDisciplina`
         2. `numeroDeTurmas`
         3. `numeroDeAlunos`

#### Capacidade da sala

1. Padrão
   1. Selecionar um ano
   2. Selecionar um semestre
   3. Lista de turmas
   4. Filtrar as turmas do ano e semestre selecionados
2. Aquisição dos dados
   1. Lista de informações das salas
      1. Selecionar uma sala
   2. Selecionar todas as turmas que têm aula nessa sala (splitted)
   3. Para cada turma
      1. Agrupar as turmas por disciplina
         1. Calcular as demandas dos alunos para essas disciplinas
   4. Com isso finalizamos com a seguinte estrutura
      1. `SalaEscolhida`
      2. `turmasDaSala`
      3. `codigoDisciplina`
         1. `listaDeAlunos`
         2. `listaDeTurmas`
         3. `numeroDeAlunos`
         4. `numeroDeTurmas`
3. Checar o conflito
   1. Para cada turma da sala
      1. Se `codigoDisciplina.numeroDeTurmas` == 1:
         1. Se `codigoDisciplina.numeroDeAlunos` > `SalaEscolhida.capacidade`:
            1. Adiciona em uma lista o conjunto de horários que estão em conflito
      2. Se `codigoDisciplina.numeroDeTurmas` != 1:
         1. Se `codigoDisciplina.numeroDeTurmas` > 1:
            1. Para cada turma em `codigoDisciplina.listaDeTurmas`
               1. obter a sala com menor capacidade dentre os horários
               2. somar as menores capacidades
            2. Se a soma for menor que `codigoDisciplina.numeroDeAlunos`:
               1. Adiciona em uma lista o conjunto de horários que estão em conflito
4. Mostrar os conflitos

| Sala             | Disciplina        | Capacidade      | Demanda                           | Número de Turmas                  |
| ---------------- | ----------------- | --------------- | --------------------------------- | --------------------------------- |
| `sala.blocoSala` | `sala.disciplina` | sala.capacidade | `codigoDisciplina.numeroDeAlunos` | `codigoDisciplina.numeroDeTurmas` |

#### Disciplinas ministradas pelo professor

#### Preferências do professor

#### Requisitos do aluno

## Links

- [Root][base-link]
- [Where it should begin][Pages-link]
- [Timetabling UENF][timetabling-uenf-link]

[base-link]: https://jvfd3.github.io/
[Pages-link]: https://jvfd3.github.io/Files/Pages/
[timetabling-uenf-link]: https://jvfd3.github.io/timetabling-UENF/
