# Application Documentation
This is defines the application documentation as it concern the developers or maintainer of this application. The knowledge of <a href="https://docs.nestjs.com/" target="_blank">NestJS </a> is assumed.

## Folder
The initial your-app-name api root folder contains(has) but not limited to the following structure.

<br>
src/<br>
├── config/<br>
│   ├── app.config.ts<br>
│   ├── swagger.config.ts<br>
│   └── database.config.ts<br>
├── database/<br>
│   └── entity.repository.ts<br>
├── auth/<br>
│   ├── auth.controller.ts<br>
│   ├── auth.module.ts<br>
│   ├── auth.service.ts<br>
│   └── dtos/<br>
│       ├── auth.strategy.ts<br>
├── users/<br>
│   ├── user.controller.ts<br>
│   ├── user.module.ts<br>
│   ├── user.service.ts<br>
│   ├── user.repository.ts<br>
│   └── dtos/<br>
├── common/<br>
│   ├── decorators/<br>
│   │   └── ...<br>
│   ├── filters/<br>
│   │   └── ...<br>
│   ├── guards/<br>
│   │   └── ...<br>
│   ├── interceptors/<br>
│   │   └── ...<br>
│   └── pipes/<br>
│       └── ...<br>
├── main.ts<br>
├── app.controller.ts<br>
├── app.module.ts<br>
├── app.service.ts<br>
test/<br>

## Route protection and getting current/loggedIn user
- Use the `@Auth()` decorator to protect any routes and pass the appropriate roles that are required to access the said route
- To allow access to a route for only the admin do this: `@Auth([Roles.ADMIN])`
- To allow access to a route for the admin and user roles do this: `@Auth([Roles.ADMIN, Roles.USER])`
- To get the current user (usually loggedIn user) use the `@currentUser()` decorator
Example:
```javascript
  @Post('/retrieve-world-secret')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for retrieving secretes of the world' })
  @ApiOkResponse({
    description: 'Secrete retrieval was successful',
    type: RetrieveSecretResponseDTO
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  @Auth([Roles.ADMIN])
  async retrieveSecrete(@Body() retrieveSecretDto: RetrieveSecretDto, @CurrentUser() auth: User) {
    // auth._id is the id of the authenticated or loggedIn user
    // if it is only the user email you want you might do this as well on @CurrentUser('email') email: Partial<User>['email'] instead of '@CurrentUser() auth: User' above
    // retrieveSecretDto hold the user's request, that is the body of the request
    return await this.worldSecretService.retrieve(retrieveSecretDto);
  }
```

## API Documentation
The API (swagger) documentation are defined as DTOs (Data Transfer Objects). This DTOs also serve as validators, so therefor no need for validation library like Joi, Zod etc unless needed.<br/>

The DTOs are under modules folders (example `users/`), and `common/decorators/`. The DTOs files ends with the extension `.dto.ts` and maybe inside a folder called `dtos/`.
