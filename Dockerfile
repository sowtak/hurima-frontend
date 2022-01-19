FROM openjdk:17-jdk-alpine

VOLUME /tmp

ARG JAR_FILE

COPY target/${JAR_FILE} flema-api-server.jar

RUN apk add --no-cache openssl

ENV DOCKERIZE_VERSION v0.6.1
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-alpine-linux-amd64-$DOCKERIZE_VERSION.tar.gz

CMD ./dockerize -wait tcp://flemadb:5432 -timeout 15m java -Djava.security.egd=file:/dev/./urandom -jar /flema-api-server.jar