# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the Vite project
RUN npm run build

# Expose the port the app runs on
EXPOSE 9001

CMD ["npm", "run", "preview"]
