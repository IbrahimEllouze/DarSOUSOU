# Stage 1: Build the Angular app
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all application files
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Stage 2: Serve the Angular app with NGINX
FROM nginx:alpine

# Remove the default NGINX configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the Angular build artifacts to the NGINX serving directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX server
CMD ["nginx", "-g", "daemon off;"]