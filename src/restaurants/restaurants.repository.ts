import {
  ConflictException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '@/common/database/entity/entity.repository';
import {
  Restaurant,
  RestaurantDocument,
  RestaurantModel
} from './schemas/restaurants.schema';
import { FilterQuery } from 'mongoose';
import {
  RestaurantMember,
  RestaurantMemberModel
} from './schemas/restaurant-members.schema';
import { User } from '@/users/user.schema';

@Injectable()
export class RestaurantsRepository extends EntityRepository<RestaurantDocument> {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: RestaurantModel,
    @InjectModel(RestaurantMember.name)
    private restaurantMemberModel: RestaurantMemberModel
  ) {
    super(restaurantModel);
  }

  async addNewMember(createMemberDto: Partial<RestaurantMember>) {
    const restaurant = await this.findOneIfNotExistsFail({
      _id: createMemberDto.restaurant
    });

    const member = await this.restaurantMemberModel.create(createMemberDto);

    return member;
  }

  async fineOneMemberIfNotExistsFail(filter: FilterQuery<RestaurantMember>) {
    const restaurant = await this.restaurantMemberModel.findOne(filter);

    if (!restaurant) {
      throw new NotFoundException('Member does not exists on this restaurant');
    }

    return restaurant;
  }

  async findOneIfExistsFail(filter: FilterQuery<Restaurant>) {
    const restaurant = await this.findOne(filter);

    if (restaurant) {
      throw new ConflictException('Restaurant already exists');
    }

    return restaurant;
  }

  async findOneMember(filter: FilterQuery<RestaurantMember>) {
    return await this.restaurantMemberModel.findOne(filter);
  }

  async findOneMemberWithRelations(filter: FilterQuery<RestaurantMember>) {
    return await this.restaurantMemberModel.findOne(filter).populate([
      {
        path: 'member',
        model: User.name
      },
      {
        path: 'restaurant',
        model: Restaurant.name
      }
    ]);
  }

  async findOneIfNotExistsFail(filter: FilterQuery<Restaurant>) {
    const restaurant = await this.findOne(filter);

    if (!restaurant) {
      throw new NotFoundException('Restaurant does exists');
    }

    return restaurant;
  }
}
