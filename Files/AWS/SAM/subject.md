# SAM

## Informações base

- Caminho até as subpastas: `B:\timetabling-UENF\Files\AWS\lambdas\subjects`
- ACCOUNT_ID: `375423677214`
- REGION: `us-east-2`
- Roles
  - APIRole: `arn:aws:iam::375423677214:role/APIRole`
  - LambdaRole: `arn:aws:iam::375423677214:role/LambdaRole`
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

### Lambda Function ARNs

| Function Name     | ARN                                                              |
| ----------------- | ---------------------------------------------------------------- |
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
| createSubject     | arn:aws:lambda:us-east-2:375423677214:function:createSubject     |
| readSubject       | arn:aws:lambda:us-east-2:375423677214:function:readSubject       |
| updateSubject     | arn:aws:lambda:us-east-2:375423677214:function:updateSubject     |
| deleteSubject     | arn:aws:lambda:us-east-2:375423677214:function:deleteSubject     |
| createClass       | arn:aws:lambda:us-east-2:375423677214:function:createClass       |
| readClass         | arn:aws:lambda:us-east-2:375423677214:function:readClass         |
| updateClass       | arn:aws:lambda:us-east-2:375423677214:function:updateClass       |
| deleteClass       | arn:aws:lambda:us-east-2:375423677214:function:deleteClass       |
| turmasCRUD        | arn:aws:lambda:us-east-2:375423677214:function:turmasCRUD        |
| manualQuery       | arn:aws:lambda:us-east-2:375423677214:function:manualQuery       |

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

## API Gateway

### Descrição da API Gateway

- O objetivo é utilizar o SAM para criar uma API Gateway
- Desejo ter um arquivo `APIGateway.yml` que contenha a descrição da API Gateway
- A role da API Gateway será `APIRole`
- O stage da API Gateway será `timetableStage`
- O CORS deve estar habilitado para todos os métodos
- O arquivo yml conterá as seguintes informações:
  - A API gateway terá o nome "timetabling"
  - A API gateway terá os recursos
    - /subject
    - /subject/{id}
  - Todos os recursos terão os métodos
    - OPTIONS
    - GET
    - POST
    - PUT
    - DELETE
      - O DELETE será apenas dos recursos que possuem o id
    - Todos os métodos devem estar com o CORS habilitado
    - Todos os métodos terão a integração com a função lambda
    - subject
      - GET: `readSubject`
      - POST: `createSubject`
      - PUT: `updateSubject`
    - subject/{id}
      - DELETE: `deleteSubject`
- As funções lambda terão permissão para acessar a API Gateway
- Os ARNs das funções lambda estão listados na tabela acima

### YML - API Gateway

```yml
AWSTemplateFormatVersion: "2010-09-09"
Transform: AWS::Serverless-2016-10-31
Description: API Gateway for OurClass timetabling project

Resources:
  ApiGateway:
    Type: AWS::Serverless::Api
    Properties:
      Name: timetabling
      StageName: timetableStage
      Cors: "'*'"
      DefinitionBody:
        swagger: "2.0"
        info:
          title: timetabling API
        paths:
          /subject:
            options:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: mock
                responses:
                  default:
                    statusCode: "200"
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: "'OPTIONS,GET,POST,PUT'"
                      method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                      method.response.header.Access-Control-Allow-Origin: "'*'"
            post:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri:
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:${AWS::AccountId}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:createSubject/invocations
              responses: {}
            get:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri:
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:${AWS::AccountId}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:readSubject/invocations
              responses: {}
            put:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri:
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:${AWS::AccountId}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:updateSubject/invocations
              responses: {}
          /subject/{id}:
            options:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: mock
                responses:
                  default:
                    statusCode: "200"
                    responseParameters:
                      method.response.header.Access-Control-Allow-Methods: "'OPTIONS,GET,POST,PUT'"
                      method.response.header.Access-Control-Allow-Headers: "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'"
                      method.response.header.Access-Control-Allow-Origin: "'*'"
            delete:
              x-amazon-apigateway-integration:
                httpMethod: POST
                type: aws_proxy
                uri:
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:${AWS::AccountId}:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-2:375423677214:function:deleteSubject/invocations
              responses: {}

```
