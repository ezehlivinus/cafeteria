import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '@/common/database/entity/entity.repository';
import {
  Restaurant,
  RestaurantDocument,
  RestaurantModel
} from './restaurants.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class RestaurantsRepository extends EntityRepository<RestaurantDocument> {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: RestaurantModel
  ) {
    super(restaurantModel);
  }

  async findOneIfExistsFail(filter: FilterQuery<Restaurant>) {
    const restaurant = await this.findOne(filter);

    if (restaurant) {
      throw new NotFoundException('Restaurant already exists');
    }

    return restaurant;
  }
}
