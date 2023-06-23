import { PaginationMetaDataResponseDto } from '@/common/dtos/pagination.dto';
import { EntityResponseMetadataDto } from '@/common/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';

export class MenuCategoriesResponseTypeDto extends EntityResponseMetadataDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  restaurant: string;
}

export class ListMenuCategoriesResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({
    type: PaginationMetaDataResponseDto
  })
  pagination: PaginationMetaDataResponseDto;

  @ApiProperty({ type: [MenuCategoriesResponseTypeDto] })
  data: [MenuCategoriesResponseTypeDto];
}

export class MenuCategoriesResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: MenuCategoriesResponseTypeDto })
  data: MenuCategoriesResponseTypeDto;
}
