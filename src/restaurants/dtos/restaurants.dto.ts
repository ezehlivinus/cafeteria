import { ApiProperty } from '@nestjs/swagger';
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  Validate,
  ValidateIf
} from 'class-validator';

export class RestaurantIdDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  restaurantId: string;
}

export class OptionalRestaurantIdDto {
  @ApiProperty({
    required: false
  })
  @IsMongoId()
  @IsOptional()
  @ValidateIf((o) => o.restaurantId !== undefined)
  restaurantId?: string;
}
