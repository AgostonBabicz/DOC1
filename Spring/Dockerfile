FROM maven:3.9.6-eclipse-temurin-21-alpine AS build
RUN mkdir -p /app
WORKDIR /app
COPY pom.xml /app
COPY src /app/src
RUN mvn -B package --file pom.xml -DskipTests

FROM eclipse-temurin:21-jdk-alpine
EXPOSE 8080
VOLUME /assignment_volume
COPY --from=build /app/target/DOC1_ASSIGNMENT-1.0-SNAPSHOT.jar DOC1_ASSIGNMENT-1.0-SNAPSHOT.jar
ENTRYPOINT ["java", "-jar", "DOC1_ASSIGNMENT-1.0-SNAPSHOT.jar"]


