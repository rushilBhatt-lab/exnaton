# exnaton-frontend/Dockerfile

# Use a Node image with the required Node version
FROM node:21-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Command to run the application in development mode
CMD ["npm", "run", "dev"]
