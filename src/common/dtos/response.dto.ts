import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDTO {
  @ApiProperty({
    example: false
  })
  success: boolean;

  @ApiProperty()
  error: string;

  @ApiProperty({ type: String, isArray: true })
  errors: string[];
}

export class EntityResponseMetadataDto {
  @ApiProperty()
  id: string;

  @ApiProperty({
    type: Date
  })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}
