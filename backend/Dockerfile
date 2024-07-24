FROM --platform=linux/amd64 gradle:8.8-jdk21  as builder
WORKDIR /app
COPY . .
RUN gradle buildFatJar --no-daemon

FROM  --platform=linux/amd64 openjdk:21
WORKDIR /app
COPY --from=builder /app/build/libs/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]