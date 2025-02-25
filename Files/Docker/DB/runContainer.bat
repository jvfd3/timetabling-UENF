# Como executar o container:
docker run -d \
-p 3306:3306 \
-e MYSQL_USER=tang \
-e MYSQL_PASSWORD=annabell \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=timetabling \
pets
