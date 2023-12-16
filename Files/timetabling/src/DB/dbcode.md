# Code

```sql
CREATE TABLE `timetabling`.`usuarios` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `fone` VARCHAR(45) NOT NULL,
    `data_nascimento` DATE NOT NULL,
    PRIMARY KEY (`id`));
```

```sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'timetabling';
```
