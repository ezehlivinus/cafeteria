import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './user.schema';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findById(id: string): Promise<User> {
    return await this.usersRepository.findOne({ _id: id });
  }

  async find(filter?: FilterQuery<User>): Promise<User[]> {
    return await this.usersRepository.find(filter);
  }

  async findOne(filter?: FilterQuery<User>): Promise<UserDocument> {
    return await this.usersRepository.findOne(filter);
  }

  async findOneIfNotExistsFail(filter: Partial<User>) {
    const user = await this.findOne(filter);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findOneIfExistsFail(filter: Partial<User>) {
    const user = await this.findOne(filter);
    if (user) {
      throw new ConflictException('User already exists');
    }
    return user;
  }

  async create(createUserDto: Partial<User>) {
    await this.findOneIfExistsFail({ email: createUserDto.email });
    return await this.usersRepository.create(createUserDto);
  }

  async update(
    filter: FilterQuery<User>,
    update: UpdateQuery<User>
  ): Promise<User> {
    return await this.usersRepository.update(filter, update, {
      runValidators: true
    });
  }
}
