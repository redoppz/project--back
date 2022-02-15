# Nest back - mentoring project

Source code for mentoring project.

# Running locally

Service can be run locally using the following commands:

1. Install dependencies from npm: `npm install`
2. Postgre up: `docker-compose`
3. Run migrations: `npm run migration:run`
4. Back on `127.0.0.1:3000/api/doc`

Api routes and documentation can be obtained via Swagger, hosted on route `/api/docs`. Swagger documentation is generated automatically running process, triggered by command `npm run start:dev`.
