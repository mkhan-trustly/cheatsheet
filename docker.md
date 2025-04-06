# Docker 

```

docker container ls
 
docker build -t <app> .

docker images

docker run <app>

docker ps -q

docker kill $(docker ps -q)

docker rm $(docker ps -a -q)

docker run -e SPRING_PROFILES_ACTIVE=local -p 8081:8081 <app>>-image:my-<app>

// network related commands

docker network create my-network

docker run  --network=my-network --name wmock -p 8089:8080 -v $(pwd)/wiremock-mappings.json:/home/wiremock/mappings/mappings.json nexus:8082/wiremock/wiremock:latest

docker run --network=my-network --name <app> -p 8081:8081 -e SPRING_PROFILES_ACTIVE=dev nexus:8082/sales/<app>:latest

docker run --network=my-network --name <app> -p 8081:8081 -e SPRING_PROFILES_ACTIVE=dev -e INTEGRATIONS_BASE-URL=http://wmock:8089  nexus:8082/sales/<app>:latest

docker run --network=my-network --name <app> -p 8080:8080 -e USER=admin -e PASSWORD=admin -e APP_URL=http://<app>:8081 -e ENVIRONMENT=dev nexus:8082/<app>:0.1.0-b472

docker run --rm -d -p 8080:8080 -e USER=admin -e PASSWORD=admin -e PORT=8080 -e APP_URL="http://host.docker.internal:8081" -e X_HOST="..." --name <app> nexus:8082/sales/<app>:0.1.0-latest

docker network ls

docker network rm my-network

docker network inspect my-network

docker network create xx-network

```