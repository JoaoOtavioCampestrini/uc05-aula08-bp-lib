# UC05 - Trabalhando com banco de dados em aplicação Node.js + Biblioteca PG Promise


## Configurando o Banco de dados

Para inicializar um novo banco de dados, execute no seu terminal o seguinte comando:


```sh
docker run --name pg-17 --restart always -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres:17
```
