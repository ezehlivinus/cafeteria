import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  error: string;

  @ApiProperty({ type: String, isArray: true })
  errors: string[];
}
