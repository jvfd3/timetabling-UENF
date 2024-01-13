# SAM

## Informações base

- Caminho até as subpastas: `B:\timetabling-UENF\Files\AWS\lambdas\subjects`
- ACCOUNT_ID: `375423677214`
- REGION: `us-east-2`
- BucketS3
  - AWS Region: `US EAST (Ohio) us-east-2`
  - Amazon Resource Name (ARN): `arn:aws:s3:::ourclassbucket`
- Secrets Manager
  - Encryption key: `aws/secretsmanager`
  - Secret name: `timetablingSecrets`
  - secret ARN: arn:aws:secretsmanager:us-east-2:375423677214:secret:timetablingSecrets-5dR6rH
  - Secret Values:

| Secret key           | Secret value                                            |
| -------------------- | ------------------------------------------------------- |
| username             | tang                                                    |
| password             | annabell                                                |
| englne               | mysql                                                   |
| host                 | ddbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com |
| port                 | 3306                                                    |
| dbname               | timetabling                                             |
| dbInstanceIdentifier | dbtimetabling                                           |

### Roles ARNs

| Role Name  | ARN                                       |
| ---------- | ----------------------------------------- |
| APIRole    | arn:aws:iam::375423677214:role/APIRole    |
| LambdaRole | arn:aws:iam::375423677214:role/LambdaRole |

### Lambda Function ARNs

| Function Name     | ARN                                                              |
| ----------------- | ---------------------------------------------------------------- |
| createSubject     | arn:aws:lambda:us-east-2:375423677214:function:createSubject     |
| readSubject       | arn:aws:lambda:us-east-2:375423677214:function:readSubject       |
| updateSubject     | arn:aws:lambda:us-east-2:375423677214:function:updateSubject     |
| deleteSubject     | arn:aws:lambda:us-east-2:375423677214:function:deleteSubject     |
| createRoom        | arn:aws:lambda:us-east-2:375423677214:function:createRoom        |
| readRoom          | arn:aws:lambda:us-east-2:375423677214:function:readRoom          |
| updateRoom        | arn:aws:lambda:us-east-2:375423677214:function:updateRoom        |
| deleteRoom        | arn:aws:lambda:us-east-2:375423677214:function:deleteRoom        |
| createStudent     | arn:aws:lambda:us-east-2:375423677214:function:createStudent     |
| readStudent       | arn:aws:lambda:us-east-2:375423677214:function:readStudent       |
| updateStudent     | arn:aws:lambda:us-east-2:375423677214:function:updateStudent     |
| deleteStudent     | arn:aws:lambda:us-east-2:375423677214:function:deleteStudent     |
| professoresCreate | arn:aws:lambda:us-east-2:375423677214:function:professoresCreate |
| professoresRead   | arn:aws:lambda:us-east-2:375423677214:function:professoresRead   |
| professoresUpdate | arn:aws:lambda:us-east-2:375423677214:function:professoresUpdate |
| professoresDelete | arn:aws:lambda:us-east-2:375423677214:function:professoresDelete |
| createClassTime   | arn:aws:lambda:us-east-2:375423677214:function:createClassTime   |
| readClassTime     | arn:aws:lambda:us-east-2:375423677214:function:readClassTime     |
| updateClassTime   | arn:aws:lambda:us-east-2:375423677214:function:updateClassTime   |
| deleteClassTime   | arn:aws:lambda:us-east-2:375423677214:function:deleteClassTime   |
| createClass       | arn:aws:lambda:us-east-2:375423677214:function:createClass       |
| readClass         | arn:aws:lambda:us-east-2:375423677214:function:readClass         |
| updateClass       | arn:aws:lambda:us-east-2:375423677214:function:updateClass       |
| deleteClass       | arn:aws:lambda:us-east-2:375423677214:function:deleteClass       |
| turmasCRUD        | arn:aws:lambda:us-east-2:375423677214:function:turmasCRUD        |
| manualQuery       | arn:aws:lambda:us-east-2:375423677214:function:manualQuery       |

## API Gateway

### Descrição da API Gateway

- API REST
- API Name: `timetablingAPI`
- Description: `API Gateway para o projeto de OurClass`
- API endpoint type: `Regional`
- Paths
  - /subject
  - /subject/{id}
  - /room
  - /room/{id}
  - /student
  - /student/{id}
  - /professores
  - /professores/{id}
  - /classTime
  - /classTime/{id}
  - /class
  - /class/{id}
  - Todos os paths terão os métodos
    - GET
    - POST
    - PUT
  - E todos os paths "{id}" terão o método
    - DELETE
  - Todos os paths terão a integração com sua respectiva função lambda cujo ARN está na tabela acima
    - Exemplo
      - subject
        - GET: `readSubject`
        - POST: `createSubject`
        - PUT: `updateSubject`
      - subject/{id}
        - DELETE: `deleteSubject`

### YML - API Gateway

```yaml
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: API Gateway para o projeto de OurClass

Resources:
  TimetablingApi:
    Type: AWS::Serverless::Api
    Properties:
      Name: timetablingAPI
      StageName: timetablingStage
      EndpointConfiguration: REGIONAL
      DefinitionBody:
        swagger: "2.0"
        info:
          title: timetablingAPI
          version: "1.0"
        paths:
          /subject:
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:readSubject/invocations"
              responses: {}
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:createSubject/invocations"
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:updateSubject/invocations"
              responses: {}
          /subject/{id}:
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:deleteSubject/invocations"
              responses: {}
          /professores:
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:professoresRead/invocations"
              responses: {}
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:professoresCreate/invocations"
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:professoresUpdate/invocations"
              responses: {}
          /professores/{id}:
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: "arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:professoresDelete/invocations"
              responses: {}
          /room:
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:readRoom/invocations
              responses: {}
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:createRoom/invocations
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:updateRoom/invocations
              responses: {}
          /room/{id}:
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:deleteRoom/invocations
              responses: {}
          /student:
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:readStudent/invocations
              responses: {}
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:createStudent/invocations
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:updateStudent/invocations
              responses: {}
          /student/{id}:
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:deleteStudent/invocations
              responses: {}
          /classTime:
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:readClassTime/invocations
              responses: {}
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:createClassTime/invocations
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:updateClassTime/invocations
              responses: {}
          /classTime/{id}:
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:deleteClassTime/invocations
              responses: {}
          /class:
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:readclass/invocations
              responses: {}
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:createclass/invocations
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:updateclass/invocations
              responses: {}
          /class/{id}:
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri: arn:aws:apigateway:us-east-2:lambda:path/2015-03-31/functions/arn:aws:lambda:us- east-2:375423677214:function:deleteclass/invocations
              responses: {}
```

### Improvement

- A role da API Gateway será `APIRole`
  - Todos os métodos devem estar com o CORS habilitado
- As funções lambda terão permissão para acessar a API Gateway
- As funções lambda já foram criadas e seus ARNs estão na tabela acima

## Lambdas

### Descrição

- O objetivo é utilizar o SAM para criar as funções lambda
- Desejo ter um arquivo `functions.yml` que contenha a descrição das funções lambda
- Todas funções terão os seguintes valores padrão:
  - `Runtime: nodejs14.x`
  - `Role: LambdaRole`
  - `Handler: index.handler`
  - `CodeUri: ./lambdas/<nome_da_funcao>`
  - environment Variables
    - `DB_HOST: dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
    - `DB_USER: tang`
    - `DB_PASSWORD: annabell`
    - `DB_NAME: timetabling`

### YML

- O arquivo `functions.yml` terá as seguintes funções:
  - createSubject
  - readSubject
  - updateSubject
  - deleteSubject

### Comandos de criação das funções usando o SAM

- `sam build`
- `sam deploy --guided`
