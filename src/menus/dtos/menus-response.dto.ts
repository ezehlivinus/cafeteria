import { PaginationMetaDataResponseDto } from '@/common/dtos/pagination.dto';
import { EntityResponseMetadataDto } from '@/common/dtos/response.dto';
import { MenuCategoriesResponseTypeDto } from '@/menu-categories/dtos/menu-categories-response.dto';
import { RestaurantResponseTypeDto } from '@/restaurants/dtos/restaurants-response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class MenuResponseTypeDto extends EntityResponseMetadataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  restaurant: string;

  @ApiProperty()
  price: number;
}

export class FindOneMenuWithRelationsResponseTypeDto extends EntityResponseMetadataDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    type: MenuCategoriesResponseTypeDto
  })
  category: string;

  @ApiProperty({
    type: RestaurantResponseTypeDto
  })
  restaurant: string;

  @ApiProperty()
  price: number;
}

export class MenuResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: MenuResponseTypeDto })
  data: MenuResponseTypeDto;
}

export class ListMenuResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({
    type: PaginationMetaDataResponseDto
  })
  pagination: PaginationMetaDataResponseDto;

  @ApiProperty({ type: [MenuResponseTypeDto] })
  data: [MenuResponseTypeDto];
}

export class ListMenuParamsDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  restaurantId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  categoryId: string;
}
