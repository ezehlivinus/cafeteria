import { PaginationMetaDataResponseDto } from '@/common/dtos/pagination.dto';
import { EntityResponseMetadataDto } from '@/common/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RestaurantResponseTypeDto extends EntityResponseMetadataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  owner: string;
}

export class RestaurantResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: RestaurantResponseTypeDto })
  data: RestaurantResponseTypeDto;
}

export class ListRestaurantResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({
    type: PaginationMetaDataResponseDto
  })
  pagination: PaginationMetaDataResponseDto;

  @ApiProperty({ type: [RestaurantResponseTypeDto] })
  data: [RestaurantResponseTypeDto];
}
