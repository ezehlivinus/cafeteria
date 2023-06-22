import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class IdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  id: string;
}

export class StatusMessageDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}
