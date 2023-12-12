# Things that I'd like to do

## Other things to do

- [X] Ver sobre BD com tia fabiane
- [ ] Entrar na disciplina de verão
- [ ] O que preciso fazer para finalizar o estágio com Annabell?
- [ ] Conferir com Tang qual é a sequência das ações
- [ ] O que é o mínimo que eu preciso pra poder apresentar?
- [ ] Falar com Tang para pedir pro Rodrigo um CSV do andamento atual dos alunos
- [ ] Chamar Márcia (Professora de petróleo) (nova diretora do CCT) pra banca?

## Visualizar conflitos impeditivos#30

- [ ] Disciplinas de mesmo período
  - [ ] Filtrar todas turmas cuja disciplina seja do mesmo periodo esperado
    - [ ] conferir se o dia e horário são iguais
    - [ ] Se sim, há conflito
- [ ] Retornar um objeto com todos os conflitos encontrados.

- [X] No loop de turmas
  - [X] Enviar para o cálculo de conflitos a turma e as turmas
    - [X] flatten turma and turmas
    - [X] remove turma from turmas
    - [X] get full info from disciplina
    - [X] get periodoEsperado
    - [X] filter all other disciplinas with the same periodoEsperado
    - [X] filter all other turmas with the same periodoEsperado
    - [ ] forEach turma
      - [ ] Se turma1.horaInicio == turma.horaIncio && turma1.dia == turma.dia
        - [ ] conflito = 2
- [ ] retorno esperado:

```json
{
    "conflito": {
        "0": {
            "nivelConflitoHora": 0,
            "nivelConflitoDia": 0
        },
        "1": {
            "nivelConflitoHora": 0,
            "nivelConflitoDia": 0
        },
        "2": {
            "nivelConflitoHora": 0,
            "nivelConflitoDia": 0
        },
    }
}
```
