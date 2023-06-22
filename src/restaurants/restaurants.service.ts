import { Injectable } from '@nestjs/common';
import { RestaurantsRepository } from './restaurants.repository';
import { CreateRestaurantDto } from './dtos/create-restaurants.dto';
import { Restaurant } from './restaurants.schema';
import { UsersService } from '@/users/users.service';
import { Roles } from '@/users/user.schema';
import { FilterQuery } from 'mongoose';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    private readonly restaurantsRepository: RestaurantsRepository,
    private readonly usersService: UsersService
  ) {}

  async create(createRestaurantDto: Partial<Restaurant>) {
    await this.restaurantsRepository.findOneIfExistsFail({
      name: createRestaurantDto.name
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

    return newRestaurant;
  }

  async findOrSearch(
    filter: FilterQuery<Restaurant>,
    query: PaginationQueryDTO
  ) {
    return await this.restaurantsRepository.findOrSearch(filter, query);
  }
}
