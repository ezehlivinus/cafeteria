import { ConfigService } from '@nestjs/config';
import { UsersService } from '@/users/users.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/auth.dto';
import { CreateUserDto } from '@/users/dtos/index.user.dto';
import { User } from '@/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService // private configService: ConfigService
  ) {}

  async validateUser(payload: { email: string }) {
    const user = await this.usersService.findOne({ email: payload.email });

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findOne({ email });

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = this.jwtService.sign({ email });

    return {
      data: user,
      accessToken
    };
  }

  async create(createUserDto: Partial<User>) {
    return await this.usersService.create(createUserDto);
  }

  async createSupperAdmin(createSupperAdminDto: Partial<User>) {
    // this check is valid if we need only one supper admin
    const supperAdminExists = await this.usersService.findOne({
      role: createSupperAdminDto.role
    });

    if (supperAdminExists) {
      throw new ConflictException('A supper admin already exists');
    }

    const newSupperAdmin = await this.create(createSupperAdminDto);

    return newSupperAdmin;
  }
}
