# Build stage
FROM node:18 as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies with legacy-peer-deps flag
RUN npm install --legacy-peer-deps

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Install specific dependencies
RUN npm install --legacy-peer-deps \
    @angular/material \
    @angular/cdk \
    @angular/animations

# Copy project files
COPY . .

# Build the app for production
RUN ng build --configuration=production

# Production stage
FROM nginx:alpine

# Copy built files from build stage
COPY --from=build /app/dist/dari-front/* /usr/share/nginx/html/

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]