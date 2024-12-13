# Use OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Copy Maven wrapper and pom.xml
COPY mvnw* pom.xml ./

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw package -DskipTests

# Expose port
EXPOSE 8080

# Start the application
ENTRYPOINT ["java", "-jar", "target/*.jar"]
