# your-app-name

## Description
This starter repository simplifies the process of starting a NestJS project. It provides configurations in addition to what you get when you run on your terminal '`$ nest new your-new-app-name`' to create a new nestjs project or app.

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