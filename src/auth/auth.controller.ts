import { ErrorResponseDTO } from '@/common/dtos/response.dto';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Logger,
  Post
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { CreateSupperAdminDto, CreateUserDto, LoginDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import {
  CreateSupperAdminResponseDTO,
  CreateUserResponseDto,
  LoginResponseDTO
} from './dtos/auth.response.dto';
import { Roles } from '@/users/user.schema';
import { Auth } from '@/common/decorators/http.decorator';
import { ConfigService } from '@nestjs/config';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Endpoint for login' })
  @ApiOkResponse({
    description: 'Login is successful',
    type: LoginResponseDTO
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  async login(@Body() body: LoginDto) {
    return await this.authService.login(body);
  }

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Endpoint for creating a user account' })
  @ApiCreatedResponse({
    description: 'User creation is successful',
    type: CreateUserResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  @ApiConflictResponse({
    description: 'User already exists',
    type: ErrorResponseDTO
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authService.create(createUserDto);

    return { data: newUser };
  }

  // // create supper admin
  // @Post('/create-supper-admin')
  // @HttpCode(HttpStatus.OK)
  // @ApiOperation({
  //   summary: 'Endpoint for creating supper admin',
  //   description:
  //     'This backend code should be commented after creating an super admin'
  // })
  // @ApiOkResponse({
  //   description: 'Supper admin created is successful',
  //   type: CreateSupperAdminResponseDTO
  // })
  // @ApiBadRequestResponse({
  //   description: 'Credentials is invalid',
  //   type: ErrorResponseDTO
  // })
  // async createSupperAdmin(@Body() createSupperAdminDto: CreateSupperAdminDto) {
  //   const newSupperAdmin = await this.authService.createSupperAdmin({
  //     ...createSupperAdminDto,
  //     role: Roles.SUPER_ADMIN
  //   });
  //   return { data: newSupperAdmin };
  // }
}
