import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsOptional,
  IsArray
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  email?: string;
}
