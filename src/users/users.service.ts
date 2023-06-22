import { BadRequestException, Injectable } from '@nestjs/common';
import { FilterQuery } from 'mongoose';
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

  async findOneOrFail(filter: Partial<User>) {
    const user = await this.findOne(filter);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    return user;
  }

  async create(createUserDto: Partial<User>) {
    await this.findOneOrFail({ email: createUserDto.email });
    return await this.usersRepository.create(createUserDto);
  }

  async update(id: Partial<User>['_id'], update: UpdateUserDto): Promise<User> {
    return await this.usersRepository.update(
      {
        _id: id
      },
      update
    );
  }
}
