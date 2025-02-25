# Commands to run

- Go To DB folder:
  - `cd B:\GitHub\UENF\timetabling-UENF\Files\Docker\DB`
- Run on this BD folder:
  - `docker build -t timetabling_db_image .`
- Run the container:
  - `docker run -d -p 3306:3306 --name=timetabling_db_container -e MYSQL_USER=tang -e MYSQL_PASSWORD=annabell -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=timetabling timetabling_db_image`
- Acesso Manual ao Banco:
  - `docker exec -it <container_id> bash`
  - `docker exec -it 38ae53fe8c59f2a221114deb81f80e0d6921408073b24bedb1068549566a2a28 bash`
  - `docker exec -it 2537e446fead bash`
    - Dentro do container:
      - `mysql -uroot -p`
      - `<RootPassword>`
      - `root`
      - `use OurClassDB;` # Database Name
      - `show tables;` # Show Tables
