# Things that I'd like to do

- [ ] Criar uma página com uma tabela que ordene as disciplinas por nome, código, professor, conflitos, demanda e demanda estimada
- [x] Usar um banco de dados simples para armazenar as informações das disciplinas
- [ ] Definir paletas de cores
  - [ ] Definir os códigos de cores como:
    - [ ] Verde: sem conflitos
      - [ ] Ex.: Turma de quantidade correta, sem conflitos, professor no horário de preferência, ministrando a disciplina que deseja
    - [ ] Amarelo: não ideal, mas sem conflitos
      - [ ] Professor não tá no horário de preferência || Existem conflitos
    - [ ] Vermelho: é fortemente recomendável que não ocorra
      - [ ] Turma maior do que a disponível na sala || Professor está em horário que não deseja || Professor está ministrando disciplina que não deseja
    - [ ] Preto: não é possível
      - [ ] Professor alocado em duas turmas ao mesmo tempo || Sala alocada para duas turmas ao mesmo tempo
- [ ] Limar disciplinas precisando de salas
- [ ] Usar Schema de Daniel Brito
- [ ] Na visualização de alunos, mostrar a listagem exata de disciplinas demandadas
- [ ] Na página de alunos, ao adicionar uma disciplina em uma das listas, atualizar as outras listas.
  - Exemplos:
    - Se adiciono disciplina como cursando e ela antes estava como não feita, remover ela dessa lista.
    - Se eu remover ela de cursando, adicionar a não feita.
    - Se eu adicionar como feita, remover de cursando e não feita.
- [ ] Cada item em cada propriedade poderia ter seu próprio link
  - Dessa forma, eu poderia fazer hiperlinks nas seleções, de disciplinas por exemplo, para que o usuário pudesse ir direto até a disciplina referida para alterar o que desejasse.
- [ ] Usar o componente async para carregar mais fluidamente os dados
  - [ ] Usar o JSON base como opções temporárias enquanto não carregam os dados async
  - [ ] Retornar um JSON base em caso de falha de conexão
- [ ] Reformular o Options para um JSON que não esteja restrito a Value e Label
  - [ ] Separar também o que é option fixa
- [ ] Ajustar o GitHub Pages
  - [ ] Refatorar todo o sistema de rotas para encaminhamento de rotas individuais para todos os itens
- [ ] Padronizar o visual do código
- [ ] Estou tentando deixar tudo com o seguinte Layout, então provavelmente o CRUDPageSelection poderá ser externalizado.

```javascript
    <div className="background">
      <CRUDPageSelection defaultValue={options.CRUD.crud_disciplinas} />
      <div className="CRUDContainComponents">
        <Disciplinas />
      </div>
    </div>
```

- [ ] Make all multiselect only display one item per line: Professores
- [ ] Fazer com que o hover da seleção de itens se apresente exatamente quando a possíbilidade de scroll for ativada

## Other things to do

### Conflitos

- [ ] Quantidade de pessoas na disciplina por limite da sala.
- [ ] Horários conflitando na mesma sala.
- [ ] Fazer console.log() de todos os conflitos.
- [ ] Professor em horário que não deseja
- [ ] Professor ministrando matéria que não pode
- [ ] Turma mostrando a quantidade de conflitos de cada nível
- [ ] Aluno fazendo matéria que não tem requisito.
- [ ] Alunos que estão em matérias no mesmo horário.

### Visualizações

- [ ] Falta fazer a adição e remoção de algumas informações.
- [X] Tabela que apresenta a preferência dos professores
- [ ] Tabela de andamento das disciplinas dos alunos. Será que consigo botar ela por cima de uma imagem da grade?
- [ ] Em cada disciplina, mostrar a lista dos professores que a ministram.

### Reformulação do DB

- [ ] Deveria fazer todas as turmas desde o aluno mais antigo para configurar que ele estava inscrito e foi aprovado. Mas seria um trampo enorme... Na verdade dá pra tentar algo assim com o código de python...
- [ ] Ao invés de só dividir em 3 (feita, fazendo e não feita), dividir em mais. Pega pelo ano e vai pegando gradativo.

## Bugs to fix

- Turmas
  - [ ] Ao tentar remover o primeiro horário da disciplina, ele remove algum lá pra baixo, e os valores dos que estão em baixo parecem ser arrastados para cima.
  - [ ] Ao colocar o mesmo professor para várias turmas, ao abrir a seleção de turmas, se a turma selecionada for ministrada pelo professor X, todas as outras turmas também ministradas pelo professor X ficam selecionadas
