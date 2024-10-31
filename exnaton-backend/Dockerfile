# exnaton-backend/Dockerfile

# Use a Node image with the required Node version
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port that NestJS will run on
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:dev"]
