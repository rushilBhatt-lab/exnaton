# Exnaton Project

This project is a full-stack application with a **NestJS** backend and a **Next.js 14** frontend. The backend connects to a PostgreSQL database, and both applications are containerized using Docker for easy deployment and development.

## Getting Started

These instructions will help you set up and run the project on your local machine for development and testing purposes.

## Prerequisites

Make sure you have the following installed on your machine:

- **Docker**: [Download Docker](https://www.docker.com/products/docker-desktop)
- **Node.js**: Version 21 (if running without Docker)

## Project Structure

The project has two main directories:

- `exnaton-backend`: NestJS backend application
- `exnaton-frontend`: Next.js frontend application

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/exnaton.git
   cd exnaton
   ```

2. Create an .env file in the exnaton-backend directory with the following variables:
   NODE_ENV=''
   PORT=
   DB_HOST=''
   DB_PORT=
   DB_USERNAME=''
   DB_PASSWORD=''
   DB_NAME=''
3. Use docker-compose up --build to Run the application
   This command will:
   - Build and start the backend, frontend, and database services.
   - Set up a Docker network for the services to communicate with each other.
4. To populate the database use this endpoint in swagger documentation. GET /energy-readings/fetch
5. Accessing the Application
   Frontend: Visit http://localhost:3000 in your browser to view the Next.js application.
   Backend: You can use http://localhost:3001 to access the backend API.
