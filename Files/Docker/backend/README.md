# Inicializar Backend

- Por enquanto vou usar o backend local para acessar o BD no Docker Local.
- Para rodar o backend devo:
  - Abrir o terminal na pasta do backend:
    - `cd B:\GitHub\UENF\timetabling-UENF\Files\Docker\backend`
  - Ligar o projeto node:
    - `npm start`

## Tentando ligar o backend ao banco de dados

```bash
# docker run --name ourclass-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=annabell -e MYSQL_USER=tang -e MYSQL_PASSWORD=annabell -e MYSQL_DATABASE=OurClassDB -v OurClass_Volume:/var/lib/mysql -d mysql/mysql-server:latest
docker run --name ourclass-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=annabell -e MYSQL_USER=tang -e MYSQL_PASSWORD=annabell -e MYSQL_DATABASE=OurClassDB -v OurClass_Volume:/var/lib/mysql -d mysql/mysql-server:latest
```

### Entrando pela linha de comando

`docker exec -it ourclass-mysql bash`

### Acessando o MySQL

```bash
mysql -u root -p
# senha: annabell
```
