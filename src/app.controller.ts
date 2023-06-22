import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Auth } from './common/decorators/http.decorator';
import { Roles } from './users/user.schema';
@ApiTags('App')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get('/ping')
  @ApiOperation({
    summary: 'Endpoint for checking if server is up and running'
  })
  ping() {
    return this.appService.ping();
  }

  @Get('/logs/errors')
  @ApiOperation({
    summary: 'Endpoint for reading error logs',
    description: 'This is accessible using supper admin'
  })
  @Auth([Roles.SUPER_ADMIN])
  async getErrorLogs() {
    return await this.appService.getErrorLogs();
  }
}
