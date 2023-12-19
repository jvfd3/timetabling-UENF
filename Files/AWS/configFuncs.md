# Funções de configuração

## Adicionar variáveis de ambiente AWS Lambda

### Template

```bash
aws lambda update-function-configuration --function-name SuaFuncaoLambda --environment Variables={DB_HOST=seu_host,DB_USER=seu_usuario,DB_PASSWORD=sua_senha}
```

### Minhas

```bash
aws lambda update-function-configuration --function-name createProfessor --environment Variables={DB_HOST=dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com,DB_USER=tang,DB_PASSWORD=annabell,DB_NAME=timetabling}
```

## Criar lambda function

### Template lbfunc

#### Copilot

```bash
aws lambda create-function
--function-name createProfessor
--runtime nodejs12.x
--zip-file fileb://createProfessor.zip
--handler createProfessor.handler
--role arn:aws:iam::123456789012:role/lambda-exemplo
```

#### GPT

```bash
aws lambda create-function \
  --function-name createProfessor \
  --runtime nodejs14.x \
  --role your_execution_role_arn \
  --handler index.handler \
  --zip-file fileb://path/to/your/deployment-package.zip \
  --environment Variables={DB_HOST=a.b-c.d,DB_USER=X,DB_PASSWORD=Y,DB_NAME=Z}
```

#### My Template

```bash
aws lambda create-function \
  --function-name nomeDaFunção \
  --runtime nodejs20.x \
  --role arn:aws:iam::375423677214:role/LambdaRole \
  --handler index.handler \
--zip-file fileb://Files/AWS/lambdas/createProfessor/createProfessor.zip \
  --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
```

### Mine

```bash
aws lambda create-function --function-name createProfessor --runtime nodejs20.x --role arn:aws:iam::375423677214:role/LambdaRole --handler index.handler --zip-file fileb://D:/HDExt/GitHub/UENF/9Semestre/timetabling-UENF/Files/AWS/lambdas/createProfessor/createProfessor.zip --environment "Variables={DB_HOST='dbtimetabling.cgsgwtemx5r8.us-east-2.rds.amazonaws.com',DB_USER='tang',DB_PASSWORD='annabell',DB_NAME='timetabling'}"
```
