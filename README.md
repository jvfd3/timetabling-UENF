# [My Monograph's GitHub Page](https://jvfd3.github.io/timetabling-UENF/) - ROOT/FILES/TIMETABLING/README.MD

O mínimo necessário é:

> mostrar que eu tenho uma ferramente que me auxilia na concepção do quadro de horários.

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