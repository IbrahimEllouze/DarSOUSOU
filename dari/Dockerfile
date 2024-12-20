FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy Maven files
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Make mvnw executable and download dependencies
RUN chmod +x mvnw && ./mvnw dependency:go-offline

# Copy source code
COPY src src

# Build the application
RUN ./mvnw package -DskipTests

# Run the application
# Change this line to use the actual JAR file name
ENTRYPOINT ["java", "-jar", "target/dari-0.0.1-SNAPSHOT.jar"]