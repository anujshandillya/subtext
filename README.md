# Subtext - Generate subtitles for your reels/shorts

A brief description of what the application does and its purpose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (Ensure Docker is installed and running on your machine)

## Setup and Installation

1. **Clone the Repository and install the dependencies if developing**
   
    ```bash
    git clone https://github.com/anujshandillya/subtext.git
    cd subtext
    yarn install
    ```
2. **Pull the postgres image from Docker hub**

    ```bash
    docker pull postgres
    ```
3. **Create a Container for your postgres server**
    ```js
    docker run --name my-postgres-container -e POSTGRES_USER=myuser -e POSTGRES_PASSWORD=mypassword -e POSTGRES_DB=mydb -p 5432:5432 -d postgres
    ```
    Say, Container Name=postDB, username=xyz, password=abcd, dbname=postgres then it will look like this
    ```js
    docker run --name postDB -e POSTGRES_USER=xyz -e POSTGRES_PASSWORD=abcd -e POSTGRES_DB=postgres -p 5432:5432 -d postgres
    ```

4. **Setup project by building image for the project or compose watch for development environment**
    ```bash
    cd subtext
    ```

    #### Dockerfile looks like this
    ```Dockerfile
    FROM node:22.7.0-alpine

    WORKDIR /usr/src/subtext

    COPY package.json .
    COPY yarn.lock .
    COPY ./prisma .

    RUN yarn install
    RUN npx prisma generate

    COPY . .

    EXPOSE 3000

    CMD [ "yarn", "dev" ]
    ```
    
    ```
    docker build -t <container-name> .
    ```
    ### setup for development environment

    Setup environment variables

    #### .env file looks like this
    ```js
    DATABASE_URL="postgresql://<username>:<password>@localhost:{PORT}/postgres?schema=public"
    GOOGLE_CLIENT_SECRET=""
    GOOGLE_CLIENT_ID=""
    JWT_SECRET=""
    AWS_S3_ACCESS_KEY=""
    AWS_S3_SECRET_ACCESS_KEY=""
    S3_BUCKET_NAME=""
    ```

    #### compose.yaml
    ```yaml
    services:
    app:
        build:
            context: .
            dockerfile: Dockerfile

        ports:
            - 3000:3000

        develop:
            watch:
            - path: ./package.json
              action: rebuild
            - path: ./next.config.mjs
              action: rebuild
            - path: ./yarn.lock
              action: rebuild
            - path: .
              target: /usr/src/subtext
              action: sync

        environment:
          - DATABASE_URL = ${DATABASE_URL}
          - GOOGLE_CLIENT_SECRET = ${GOOGLE_CLIENT_SECRET}
          - GOOGLE_CLIENT_ID = ${GOOGLE_CLIENT_ID}
          - JWT_SECRET = ${JWT_SECRET}
          - AWS_S3_ACCESS_KEY = ${AWS_S3_ACCESS_KEY}
          - AWS_S3_SECRET_ACCESS_KEY = ${AWS_S3_SECRET_ACCESS_KEY}
          - S3_BUCKET_NAME = ${S3_BUCKET_NAME}

    volumes:
        tasked:
    ```

    ```bash
    docker compose watch
    ```