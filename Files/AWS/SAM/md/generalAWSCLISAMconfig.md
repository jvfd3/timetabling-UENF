# Comandos

## API Gateway

- O objetivo é utilizar o SAM para criar uma API Gateway
- Desejo ter um arquivo `APIGateway.yml` que contenha a descrição da API Gateway
- O arquivo yml conterá as seguintes informações:
  - A API gateway terá o nome "timetabling"
  - A API gateway terá os recursos
    - /student
    - /student/{id}
    - /professor
    - /professor/{id}
    - /room
    - /room/{id}
    - /subject
    - /subject/{id}
    - /class
    - /class/{id}
    - /classTime
    - /classTime/{id}
  - Todos os recursos terão os métodos
    - OPTIONS
    - GET
    - POST
    - PUT
    - DELETE
      - O DELETE será apenas dos recursos que possuem o id
    - Todos os métodos devem estar com o CORS habilitado
    - Todos os métodos terão a integração com a função lambda
    - student
      - GET: `readStudent`
      - POST: `createStudent`
      - PUT: `updateStudent`
    - student/{id}
      - DELETE: `deleteStudent`
    - professor
      - GET: `readProfessor`
      - POST: `createProfessor`
      - PUT: `updateProfessor`
    - professor/{id}
      - DELETE: `deleteProfessor`
    - room
      - GET: `readRoom`
      - POST: `createRoom`
      - PUT: `updateRoom`
    - room/{id}
      - DELETE: `deleteRoom`
    - subject
      - GET: `readSubject`
      - POST: `createSubject`
      - PUT: `updateSubject`
    - subject/{id}
      - DELETE: `deleteSubject`
    - class
      - GET: `readClass`
      - POST: `createClass`
      - PUT: `updateClass`
    - class/{id}
      - DELETE: `deleteClass`
    - classtime
      - GET: `readClassTime`
      - POST: `createClassTime`
      - PUT: `updateClassTime`
    - classtime/{id}
      - DELETE: `deleteClassTime`
  - Todas as funções lambda devem estar no arquivo `functions.yml`

## SAM

- O objetivo é utilizar o SAM para criar uma API Gateway
- Desejo ter um arquivo `APIGateway.yml` que contenha a descrição da API Gateway
- O arquivo yml conterá as seguintes informações:
  - A API gateway terá o nome "timetabling"
  - A API gateway terá os recursos
    - /student
    - /student/{id}
    - /professor
    - /professor/{id}
    - /room
    - /room/{id}
    - /subject
    - /subject/{id}
    - /class
    - /class/{id}
    - /classTime
    - /classTime/{id}
  - Todos os recursos terão os métodos
    - OPTIONS
    - GET
    - POST
    - PUT
    - DELETE
      - O DELETE será apenas dos recursos que possuem o id
    - Todos os métodos devem estar com o CORS habilitado
    - Todos os métodos terão a integração com a função lambda
    - student
      - GET: `readStudent`
      - POST: `createStudent`
      - PUT: `updateStudent`
    - student/{id}
      - DELETE: `deleteStudent`
    - professor
      - GET: `readProfessor`
      - POST: `createProfessor`
      - PUT: `updateProfessor`
    - professor/{id}
      - DELETE: `deleteProfessor`
    - room
      - GET: `readRoom`
      - POST: `createRoom`
      - PUT: `updateRoom`
    - room/{id}
      - DELETE: `deleteRoom`
    - subject
      - GET: `readSubject`
      - POST: `createSubject`
      - PUT: `updateSubject`
    - subject/{id}
      - DELETE: `deleteSubject`
    - class
      - GET: `readClass`
      - POST: `createClass`
      - PUT: `updateClass`
    - class/{id}
      - DELETE: `deleteClass`
    - classtime
      - GET: `readClassTime`
      - POST: `createClassTime`
      - PUT: `updateClassTime`
    - classtime/{id}
      - DELETE: `deleteClassTime`
  - Todas as funções lambda devem estar no arquivo `functions.yml`
- Meus ARNs das Lambda function são as seguintes:
  - readStudent: `arn:aws:lambda:us-east-2:375423677214:function:readStudent`
  - createStudent: `arn:aws:lambda:us-east-2:375423677214:function:createStudent`
  - updateStudent: `arn:aws:lambda:us-east-2:375423677214:function:updateStudent`
  - deleteStudent: `arn:aws:lambda:us-east-2:375423677214:function:deleteStudent`
  - readProfessor: `arn:aws:lambda:us-east-2:375423677214:function:readProfessor`
  - createProfessor: `arn:aws:lambda:us-east-2:375423677214:function:createProfessor`
  - updateProfessor: `arn:aws:lambda:us-east-2:375423677214:function:updateProfessor`
  - deleteProfessor: `arn:aws:lambda:us-east-2:375423677214:function:deleteProfessor`
  - readRoom: `arn:aws:lambda:us-east-2:375423677214:function:readRoom`
  - createRoom: `arn:aws:lambda:us-east-2:375423677214:function:createRoom`
  - updateRoom: `arn:aws:lambda:us-east-2:375423677214:function:updateRoom`
  - deleteRoom: `arn:aws:lambda:us-east-2:375423677214:function:deleteRoom`
  - readSubject: `arn:aws:lambda:us-east-2:375423677214:function:readSubject`
  - createSubject: `arn:aws:lambda:us-east-2:375423677214:function:createSubject`
  - updateSubject: `arn:aws:lambda:us-east-2:375423677214:function:updateSubject`
  - deleteSubject: `arn:aws:lambda:us-east-2:375423677214:function:deleteSubject`
  - readClass: `arn:aws:lambda:us-east-2:375423677214:function:readClass`
  - createClass: `arn:aws:lambda:us-east-2:375423677214:function:createClass`
  - updateClass: `arn:aws:lambda:us-east-2:375423677214:function:updateClass`
  - deleteClass: `arn:aws:lambda:us-east-2:375423677214:function:deleteClass`
  - readClassTime: `arn:aws:lambda:us-east-2:375423677214:function:readClassTime`
  - createClassTime: `arn:aws:lambda:us-east-2:375423677214:function:createClassTime`
  - updateClassTime: `arn:aws:lambda:us-east-2:375423677214:function:updateClassTime`
  - deleteClassTime: `arn:aws:lambda:us-east-2:375423677214:function:deleteClassTime`

### Arquivos YML

#### APIGateway.yml

```yml
AWSTemplateFormatVersion: '2010-09-09'
Transform: AWS::Serverless-2016-10-31
Description: My AWS API Gateway for the OurClass Project.
Resources:
  MyApi:
    Type: AWS::Serverless::Api
    Properties:
      Name: timetabling
      StageName: prod
      DefinitionBody:
        swagger: '2.0'
        info:
          title: 
            Ref: AWS::StackName
        paths:
          /student:
            get:
              x-amazon-apigateway-integration:
                uri: 
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${readStudent.Arn}/invocations
                httpMethod: GET
                type: aws_proxy
            post:
              x-amazon-apigateway-integration:
                uri: 
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${createStudent.Arn}/invocations
                httpMethod: POST
                type: aws_proxy
            put:
              x-amazon-apigateway-integration:
                uri: 
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${updateStudent.Arn}/invocations
                httpMethod: PUT
                type: aws_proxy
          /student/{id}:
            delete:
              x-amazon-apigateway-integration:
                uri: 
                  Fn::Sub: arn:aws:apigateway:${AWS::Region}:lambda:path/2015-03-31/functions/${deleteStudent.Arn}/invocations
                httpMethod: DELETE
                type: aws_proxy
```

#### lambda.yml

##### Student

```yml
- createStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
```

##### Professor

```yml
- createProfessor
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createProfessor`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readProfessor
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readProfessor`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateProfessor
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateProfessor`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteProfessor
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteProfessor`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
```

##### Room

```yml
- createRoom
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createRoom`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readRoom
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readRoom`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateRoom
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateRoom`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteRoom
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteRoom`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`  
```

##### Subject

```yml
- createSubject
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createSubject`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readSubject
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readSubject`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateSubject
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateSubject`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteSubject
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteSubject`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
```

##### Class

```yml
- createClass
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createClass`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readClass
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readClass`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateClass
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateClass`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteClass
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteClass`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
```

##### ClassTime

```yml
- createClassTime
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createClassTime`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readClassTime
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readClassTime`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateClassTime
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateClassTime`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteClassTime
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteClassTime`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com` 
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`  
```

### Comandos SAM

- Criar API Gateway

```bash
sam local start-api --template APIGateway.yml
```

- Criar função Lambda

```bash
sam local invoke XXX --template functions.yml
```

- Atualizar função Lambda

```bash
sam local invoke XXX --template functions.yml
```

- Deletar função Lambda

```bash
sam local invoke XXX --template functions.yml
```

## Configurando apenas o students como exemplo

### Lambda Functions

#### YML

```yml
- createStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/createStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- readStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/readStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- updateStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/updateStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
- deleteStudent
  - handler: `index.handler`
  - runtime: `nodejs8.10`
  - codeUri: `./lambdas/deleteStudent`
  - environment
    - Variables
      - DB_HOST: `dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com`
      - DB_USER: `tang`
      - DB_PASSWORD: `annabell`
      - DB_NAME: `timetabling`
```

https://4tw2l96f11.execute-api.us-east-2.amazonaws.com
