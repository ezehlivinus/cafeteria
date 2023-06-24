import { BadRequestException, Injectable } from '@nestjs/common';
import { MenuCategoriesRepository } from './menu-categories.repository';
import { MenuCategory } from './menu-categories.schema';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { User } from '@/users/user.schema';
import { UsersService } from '@/users/users.service';
import { RestaurantsService } from '@/restaurants/restaurants.service';
import { Restaurant } from '@/restaurants/schemas/restaurants.schema';

@Injectable()
export class MenuCategoriesService {
  constructor(
    private readonly menuCategoriesRepository: MenuCategoriesRepository,
    private readonly usersService: UsersService,
    private readonly restaurantsService: RestaurantsService
  ) {}

  async create(createMenuCategoryDto: {
    menuCategoryDto: Partial<MenuCategory>;
    user: Partial<User>;
  }) {
    const { menuCategoryDto, user } = createMenuCategoryDto;

    const memberWithRelation =
      await this.restaurantsService.findOneMemberWithRelationsIfNotExistsFail({
        restaurant: menuCategoryDto.restaurant,
        member: user._id
      });

    const restaurant = memberWithRelation.restaurant as unknown as Restaurant;
    const member = memberWithRelation.member as unknown as User;

    if (restaurant._id.toString() !== menuCategoryDto.restaurant) {
      throw new BadRequestException('Invalid restaurant');
    }

    await this.menuCategoriesRepository.findOneIfExistsFail({
      name: menuCategoryDto.name,
      restaurant: menuCategoryDto.restaurant
    });

    return await this.menuCategoriesRepository.create(menuCategoryDto);
  }

  findOneUserOrFail(filter: FilterQuery<User>) {
    return this.usersService.findOneIfNotExistsFail(filter);
  }

  async findOneIfNotExistsFail(filter: FilterQuery<MenuCategory>) {
    return await this.menuCategoriesRepository.findOneIfNotExistsFail(filter);
  }

  async findOrSearch(
    filter: FilterQuery<MenuCategory>,
    query: PaginationQueryDTO
  ) {
    return await this.menuCategoriesRepository.findOrSearch(filter, query);
  }

  async findOne(filter: FilterQuery<MenuCategory>) {
    return await this.menuCategoriesRepository.findOne(filter);
  }

  async update(
    filter: FilterQuery<MenuCategory>,
    update: UpdateQuery<MenuCategory>
  ) {
    return await this.menuCategoriesRepository.update(filter, update, {
      runValidators: true
    });
  }
}
