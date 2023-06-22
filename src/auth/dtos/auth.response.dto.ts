import { UserDto, UserDtoWithoutPassword } from '@/users/dtos/index.user.dto';
import { Roles } from '@/users/user.schema';
import { ApiProperty } from '@nestjs/swagger';

class LoginResponseTypeDto extends UserDtoWithoutPassword {
  @ApiProperty()
  accessToken: string;
}

export class LoginResponseDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: LoginResponseTypeDto })
  data: LoginResponseTypeDto;
}

export class ForgotPasswordResponseDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;
}

export class ResetPasswordResponseDTO extends ForgotPasswordResponseDTO {}

export class MiniUserResponseDTO {
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ enum: Roles })
  role: string;
}

export class CreateSupperAdminResponseDTO {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ type: MiniUserResponseDTO })
  data: MiniUserResponseDTO;
}
