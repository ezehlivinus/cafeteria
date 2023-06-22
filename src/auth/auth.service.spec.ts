import { UsersService } from '@/users/users.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, ConfigService, UsersService]
    })
      .overrideProvider(ConfigService)
      .useValue({})
      .overrideProvider(JwtService)
      .useValue({})
      .overrideProvider(UsersService)
      .useValue({})
      .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
