import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateRestaurantDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  address?: string;

  @ApiProperty({
    required: false
  })
  @IsOptional()
  description?: string;
}
