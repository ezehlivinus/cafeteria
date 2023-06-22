import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UpdateUserDto } from './dtos/index.user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/')
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    return {
      data: newUser
    };
  }

  @Get('/')
  async find() {
    const users = await this.usersService.find();

    return { data: users };
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);

    return { data: user };
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.usersService.update(id, updateUserDto);

    return { data: updatedUser };
  }
}
