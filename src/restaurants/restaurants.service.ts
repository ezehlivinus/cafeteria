import { Injectable, NotFoundException } from '@nestjs/common';
import { RestaurantsRepository } from './restaurants.repository';
import { CreateRestaurantDto } from './dtos/create-restaurants.dto';
import { Restaurant } from './schemas/restaurants.schema';
import { UsersService } from '@/users/users.service';
import { Roles } from '@/users/user.schema';
import { FilterQuery } from 'mongoose';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';
import { RestaurantMember } from './schemas/restaurant-members.schema';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsRepository: RestaurantsRepository,
    private readonly usersService: UsersService
  ) {}

  async create(createRestaurantDto: Partial<Restaurant>) {
    await this.restaurantsRepository.findOneIfExistsFail({
      name: createRestaurantDto.name,
      owner: createRestaurantDto.owner
    });

    const owner = await this.usersService.findOneIfNotExistsFail({
      _id: createRestaurantDto.owner
    });

    const newRestaurant = await this.restaurantsRepository.create(
      createRestaurantDto
    );

    if (owner.role !== Roles.RESTAURANT_OWNER) {
      owner.role = Roles.RESTAURANT_OWNER;

      await owner.save();
    }

    const member = await this.restaurantsRepository.findOneMember({
      restaurant: newRestaurant._id,
      member: owner._id
    });

    if (!member) {
      await this.restaurantsRepository.addNewMember({
        restaurant: newRestaurant._id,
        member: owner._id
      });
    }

    return newRestaurant;
  }

  async findOneIfNotExistsFail(filter: FilterQuery<Restaurant>) {
    return await this.restaurantsRepository.findOneIfNotExistsFail(filter);
  }

  async findOrSearch(
    filter: FilterQuery<Restaurant>,
    query: PaginationQueryDTO
  ) {
    return await this.restaurantsRepository.findOrSearch(filter, query);
  }

  async findOneMemberWithRelations(filter: FilterQuery<RestaurantMember>) {
    return await this.restaurantsRepository.findOneMemberWithRelations(filter);
  }

  /**
   * @description if found, return member with relations(restaurant, user(member))
   * @param filter RestaurantMember
   * @returns RestaurantMemberWithRelations
   */
  async findOneMemberWithRelationsIfNotExistsFail(
    filter: FilterQuery<RestaurantMember>
  ) {
    const memberWithRelation =
      await this.restaurantsRepository.findOneMemberWithRelations(filter);

    if (!memberWithRelation) {
      throw new NotFoundException(
        'Access Denied: You are not a member of this this restaurant'
      );
    }

    return memberWithRelation;
  }
}
