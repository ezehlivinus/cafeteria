import { UserDto } from '@/users/dtos/index.user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  password: string;
}

export class ForgotPasswordDTO {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class CreateSupperAdminDto {
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

export class ResetPasswordDTO {
  @ApiProperty()
  @IsString()
  @MinLength(10)
  token: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  password: string;
}
