# Full Stack Notes Application

This project is a full-stack application for managing notes, built with a NestJS backend and a React frontend.

## Project Structure
. ├── .env \
  ├── .gitignore \
  ├── backend/ \
  │ ├── .dockerignore \
  │ ├── .env \
  │ ├── .eslintrc.js \
  │ ├── .gitignore \
  │ ├── .prettierrc \
  │ ├── Dockerfile \
  │ ├── nest-cli.json \
  │ ├── package.json \
  │ ├── README.md\
  | ├── src/\
  │ | ├── app.controller.spec.ts \
  │ │ ├── app.controller.ts \
  │ │ ├── app.module.ts \
  │ │ ├── app.service.ts \
  │ │ ├── categories/ \
  │ │ ├── main.ts \
  │ │ ├── notes/ \
  │ ├── test/ \
  │ │ ├── app.e2e-spec.ts \
  │ │ ├── jest-e2e.json \
  │ ├── tsconfig.build.json \
  ├── tsconfig.json \
  ├── docker-compose.yml\
  ├── frontend/ \
  │ ├── .dockerignore \
  │ ├── .env \
  │ ├── .gitignore \
  │ ├── Dockerfile \
  │ ├── package.json\ 
  │ ├── public/ \
  │ │ ├── index.html \
  │ │ ├── manifest.json \
  │ │ ├── robots.txt \
  │ ├── README.md \
  │ ├── src/ \
  ├── package.json \
  ├── READ.ME\

## Backend

The backend is built with [NestJS](https://nestjs.com/), a progressive Node.js framework for building efficient and scalable server-side applications.

### Setup

1. Install dependencies:

    ```bash
    cd backend
    npm install
    ```

2. Create a `.env` file in the `backend` directory with the following content:

    ```env
    POSTGRES_USER=your_postgres_user\
    POSTGRES_PASSWORD=your_postgres_password\
    POSTGRES_DB=your_postgres_db\
    POSTGRES_TYPE=postgres\
    POSTGRES_HOST=your_postgres_host\
    POSTGRES_PORT=5432\
    ```

3. Run the application:

    ```bash
    # development
    npm run start

    # watch mode
    npm run start:dev

    # production mode
    npm run start:prod
    ```


## Frontend
The frontend is built with React and Material-UI.

Setup
Install dependencies: npm i

Create a .env file in the frontend directory with the following content:
REACT_APP_USER=username\
REACT_APP_PASSWORD=password\

## Docker Compose
To run both the backend and frontend using Docker Compose: docker-compose up --build

Create a .env file in the root directory with the following content:
POSTGRES_USER=user\
POSTGRES_PASSWORD=password\
POSTGRES_DB=dbname\
POSTGRES_TYPE=postgres\
POSTGRES_HOST=hostname\
POSTGRES_PORT=port\

Run Docker Compose:

License
This project is licensed under the MIT License.
