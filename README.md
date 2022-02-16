# Nest back - mentoring project

Source code for mentoring project.

# Running locally

Service can be run locally using the following commands:

1. Install dependencies from npm: `npm install`
2. Then Postgre up: `docker-compose`
3. Then `npm run start:dev`
4. Then back on `127.0.0.1:3000/api/doc`

Api routes and documentation can be obtained via Swagger, hosted on route `/api/doc`. Swagger documentation is generated automatically running process, triggered by command `npm run start:dev`.
