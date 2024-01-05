# [My Monograph's GitHub Page](https://jvfd3.github.io/timetabling-UENF/) - ROOT/FILES/TIMETABLING/README.MD

O mínimo necessário é:

> mostrar que eu tenho uma ferramente que me auxilia na concepção do quadro de horários.

## Casos de análise

- 2028.1: Conflito: alocação múltipla professores
- 2028.2: Conflito: alocação múltipla de salas
- 2028.3: Conflito: demanda x capacidade de salas
- 2029.1: Todas as disciplinas em período ímpar
- 2029.2: Todas as disciplinas em período par
- 2029.3: Todas as disciplinas em período de verão

## Planejamento até dia 9 de janeiro

### 05/01/2024

- Conflito por capacidade da sala #168
- ConflConflito de sala alocada para duas aulas ao mesmo tempo #97

### 06/01/2024

- Conflito por capacidade da sala #168
- ConflConflito de sala alocada para duas aulas ao mesmo tempo #97

### 07/01/2024

- Criar botão para adicionar disciplina direto na lista de turmas #113

### 08/01/2024

- Permitir que informações na turma sejam bloqueáveis, assim impedindo que o select seja selecionado. #53
- Conferir por que não há o refresh dos estados ao resolver um conflito

### 09/01/2024

- Colocar no GitHub Pages

## Brainstorming conflitos

Estou fazendo um sistema em React. Em determinado momento eu tenho uma turma que segue a seguinte estrutura:

turma = {
  ano: 123,
  demandaEstimada: 123,
  professor: "Fulano",
  horarios: [
    {
      sala: "A1",
      dia: "Segunda",
    },
    {
      sala: "A2",
      dia: "Terça",
    },
  ]
}

Eu tenho uma lista contendo várias dessas turmas.

Atualmente estou usando um turmas.map() para percorrer todas as turmas.

O que desejo é que cada item receba um estilo diferente baseado no conceito de "conflitos". Por exemplo: se duas turmas tiverem o mesmo professor, quero que elas fiquem rosas. Caso dois horários tenham o mesmo dia e hora, quero que fiquem azuis. E assim por diante.

Estou cogitando fazer de duas formas, mas aceito sugestões:

1. Processamento individual em cada um dos itens.
    Ex.: para cada sala, eu envio o item "turma" para uma função "obterConflitosDaSala", ela processa e me retorna um objeto de estilos no seguinte formato:

    ```json
    {"backGroundColor": "corDoConflito"}
    ```

2. Processamento individual em cada uma das turmas.
Ex.: para cada sala, eu envio o item "turma" para uma função "obterConflitosDaTurma", e ela me retorna um objeto contendo vários estilos no seguinte formato:

    ```json
    {
      "conflitoProfessor": {"backgroundColor": "corDoConflitoDoProfessor"},
      "conflitoDisciplina": {"backgroundColor": "conflitoDisciplina"},
      "conflitoDemanda": {"backgroundColor": "conflitoDemanda"},
      "conflitoHorarios": [
        {
          "dia": {"backgroundColor": "corDoConflitoDoDia"},
          "hora": {"backgroundColor": "corDoConflitoDaHora"},
          "Sala": {"backgroundColor": "corDoConflitoDaSala"},
        },
        {
          "dia": {"backgroundColor": "corDoConflitoDoDia"},
          "hora": {"backgroundColor": "corDoConflitoDaHora"},
          "Sala": {"backgroundColor": "corDoConflitoDaSala"},
        },
      ]
    }
    ```

3. Processamento em todas as turmas.
Ex. Antes de gerar os componentes, já criar uma lista contendo todos os conflitos de todas as turmas. Então bastando aplicar.

    ```json
    [
      {
      "conflitoProfessor": {"backgroundColor": "corDoConflitoDoProfessor"},
      "conflitoDisciplina": {"backgroundColor": "conflitoDisciplina"},
      "conflitoDemanda": {"backgroundColor": "conflitoDemanda"},
      "conflitoHorarios": [
        {
          "dia": {"backgroundColor": "corDoConflitoDoDia"},
          "hora": {"backgroundColor": "corDoConflitoDaHora"},
          "Sala": {"backgroundColor": "corDoConflitoDaSala"},
        },
        {
          "dia": {"backgroundColor": "corDoConflitoDoDia"},
          "hora": {"backgroundColor": "corDoConflitoDaHora"},
          "Sala": {"backgroundColor": "corDoConflitoDaSala"},
        },
      ]
    },
    {
      "conflitoProfessor": {"backgroundColor": "corDoConflitoDoProfessor"},
      "conflitoDisciplina": {"backgroundColor": "conflitoDisciplina"},
      "conflitoDemanda": {"backgroundColor": "conflitoDemanda"},
      "conflitoHorarios": [
        {
          "dia": {"backgroundColor": "corDoConflitoDoDia"},
          "hora": {"backgroundColor": "corDoConflitoDaHora"},
          "Sala": {"backgroundColor": "corDoConflitoDaSala"},
        },
        {
          "dia": {"backgroundColor": "corDoConflitoDoDia"},
          "hora": {"backgroundColor": "corDoConflitoDaHora"},
          "Sala": {"backgroundColor": "corDoConflitoDaSala"},
        },
      ]
    }
    ]
    ```

## Comentários

<!--
- Identificador da instância de banco de dados
  - dbTimetabling
- Nome do usuário principal
  - tang
- Senha do usuário principal
  - annabell
- Nome do banco de dados inicial
  - timetabling
- Endpoint
  - dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com
- Porta
  - 3306
- ip
  - 3.132.55.100
- [Link](https://us-east-2.console.aws.amazon.com/rds/home?region=us-east-2#database:id=dbtimetabling;is-cluster=false)
- API name
  - timetablingAPI

-->

<!-- 
# Use this code snippet in your app.
# If you need more information about configurations
# or implementing the sample code, visit the AWS docs:
# https://aws.amazon.com/developer/language/python/

import boto3
from botocore.exceptions import ClientError

def get_secret():

    secret_name = "timetablingSecrets"
    region_name = "us-east-2"

    # Create a Secrets Manager client
    session = boto3.session.Session()
    client = session.client(
        service_name='secretsmanager',
        region_name=region_name
    )

    try:
        get_secret_value_response = client.get_secret_value(
            SecretId=secret_name
        )
    except ClientError as e:
        # For a list of exceptions thrown, see
        # https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
        raise e

    # Decrypts secret using the associated KMS key.
    secret = get_secret_value_response['SecretString']

    # Your code goes here.

 -->
