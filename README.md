# Subtext - Generate subtitles for your reels/shorts

A brief description of what the application does and its purpose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (Ensure Docker is installed and running on your machine)
- [PgAdmin](https://www.pgadmin.org/) (optional) Install this to view your database.

## Setup and Installation

1. **Clone the Repository and install the dependencies if developing**
   
    ```bash
    git clone https://github.com/anujshandillya/subtext.git
    cd subtext
    yarn install
    ```
2. **Pull the postgres:14-alpine(lightweight) image from Docker hub**

    ```bash
    docker pull postgres:14-alpine
    ```

3. **Create a Volume persisting db data**
    ```bash
    docker volume create <volume_name>
    ```

4. **Create a Container for your postgres server attaching volume and all environment variables**
    ```js
    docker run -v <volume_name>:/var/lib/postgresql/data --name <container_name> -e POSTGRES_USER=<username> -e POSTGRES_PASSWORD=<password> -e POSTGRES_DB=<db_name> -p <machine_port>:<container_port> -d postgres:14-alpine
    ```
    **Say, container_name=postDB, POSTGRES_USER=xyz, POSTGRES_PASSWORD=abcd, POSTGRES_DB=postgres, volume_name=test then it will look like this if you map your machine port(say 5432) to container port(5432).**
    ```js
    docker run -v test:/var/lib/postgresql/data --name postDB -e POSTGRES_USER=xyz -e POSTGRES_PASSWORD=abcd -e POSTGRES_DB=postgres -p 5432:5432 -d postgres:14-alpine
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
