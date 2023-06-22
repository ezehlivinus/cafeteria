import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, QueryOptions } from 'mongoose';
import { User, UserDocument, UserModel } from './user.schema';
import { EntityRepository } from '@/common/database/entity/entity.repository';

@Injectable()
export class UsersRepository extends EntityRepository<UserDocument> {
  constructor(@InjectModel(User.name) private userModel: UserModel) {
    super(userModel);
  }
}
