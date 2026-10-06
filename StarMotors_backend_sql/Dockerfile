# --- Etapa 1: compilar el .jar con Maven ---
FROM maven:3.8.6-eclipse-temurin-8 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn -B -q dependency:go-offline
COPY src ./src
RUN mvn -B -q package -DskipTests

# --- Etapa 2: imagen liviana solo con el JRE ---
FROM eclipse-temurin:8-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 9898
ENTRYPOINT ["java", "-jar", "app.jar"]
