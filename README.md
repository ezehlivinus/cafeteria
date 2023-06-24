# Cafeteria

## Description
This is a demo application for a cafeteria. It is a simple application that allows users to order food and drinks from a cafeteria. The application is built with NestJS and uses a MongoDb database. The application is dockerized and can be run with docker-compose or without docker, details are below.

## Toolings
- <a href="https://docs.docker.com/compose/" target="_blank">Docker</a> version 20.10.17, build 100c701
- <a href="https://docs.docker.com/compose/" target="_blank">Docker Compose</a> version v2.6.0 
- <a href="http://nodejs.org" target="_blank">Node.js</a> version 18
- <a href="https://docs.nestjs.com/" target="_blank">NestJS </a> ~ `'cli -- common -- core'` version 9.x.x
- <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> version ^4.9.5 
- <a href="https://yarnpkg.com/getting-started/install" target="_blank">Yarn </a> version 1.22.19
- <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint" target="_blank">ESLint VsCode Extension</a> <sup><small> for development </small></sup>

- <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode" target="_blank">Prettier</a><sup><small> for development </small></sup>

## Installation - without docker
Create and set up a `.env` file using the sample in the `.env.example` file.

```bash
$ yarn install
```

### Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Installation - with docker
Install and set up `docker` according to your OS requirements
### Running the app
You can use all the original docker commands but these few scripts are available for use.

```bash
# development - start a docker in undetached mode - we might not be able to watch file changes
$ yarn run docker:dev:up

# production - start a docker in undetached mode
$ yarn run docker:prod:up

# stop the running container
$ yarn run docker:down

# Remove dev container
$ yarn run docker:dev:rm

# Remove prod container
$ yarn run docker:prod:rm

# Restart dev container
$ docker:dev:restart

# Restart production container
$ docker:prod:restart

# At some point you might want to delete and rebuilt the image
$ docker image rm <image-id or repository-name>
```

## API Documentation (Swagger): localhost
The API documentation is available at `http://localhost:9092/api/v1/docs` when the application is running on localhost. Your `port` can be different from the one above. Check your `.env` file or the server logs on the `terminal` for the `PORT` variable value.

## API Documentation (Swagger): live host
The API documentation is available at `<your-host>/api/v1/docs` when the application is running.

## Test the API
The API can be tested using the swagger documentation.
<br>
<br>
Create a user account and login to get a token. The token is required to access the protected routes.
<br>
<br>
Once you login, copy the accessToken and click on the `Authorize` button on the top right corner of the page. Logout if not already logout. Paste the token in the input field and click on the `Authorize` button. You can now test the API.

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
# Application Code Documentation
[app-code-docs](app-docs.md)