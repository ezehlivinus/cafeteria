import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumberString, IsString } from 'class-validator';

export class PaginationQueryDTO {
  @IsOptional()
  @IsNumberString()
  page: number;

  @IsOptional()
  @IsNumberString()
  limit: number;

  @IsOptional()
  @IsString()
  search: string;
}

export class PaginationMetaDataResponseDto {
  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty({
    description: 'The number of possible pages'
  })
  totalPages: number;

  @ApiProperty({
    description: 'number of docs or search results found'
  })
  totalCount: number;

  @ApiProperty()
  nextPage: number;

  @ApiProperty()
  hasPreviousPage: boolean;
}
