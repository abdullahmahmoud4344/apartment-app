# Apartment Management Application

This is a full-stack application for managing apartments. It includes a backend API built with NestJS, a frontend built with Next.js, and a PostgreSQL database. The application is containerized using Docker.

## Features

- **Backend API**:

  - Retrieve all apartments.
  - Retrieve a single apartment by ID.
  - Create a new apartment with images.

- **Frontend**:

  - Display a list of all apartments.
  - View detailed information about a specific apartment.
  - Upload new apartments with images.

- **Database**:
  - PostgreSQL database for storing apartment data.

## Architecture

- **Backend**: Runs on port `3001` using NestJS.
- **Frontend**: Runs on port `3000` using Next.js.
- **Database**: PostgreSQL running in a Docker container.

## Prerequisites

- Docker and Docker Compose installed on your machine.

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
docker compose up
```
