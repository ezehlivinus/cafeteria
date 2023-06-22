import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

export class UserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class UserDtoWithoutPassword extends UserDto {
  constructor(dto: UserDto) {
    super();
    Object.assign(this, dto);
    delete this.password;
  }
}

export { CreateUserDto, UpdateUserDto };
