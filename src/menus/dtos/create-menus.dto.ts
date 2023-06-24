import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, Min, MinLength } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(3)
  name: string;
}

export class CreateMenuParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  menuCategoryId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  restaurantId: string;
}

