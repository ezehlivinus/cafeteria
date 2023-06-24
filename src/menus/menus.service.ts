import { Injectable, NotFoundException } from '@nestjs/common';
import { MenusRepository } from './menus.repository';
import { Menu } from './menus.schema';
import { MenuCategoriesService } from '@/menu-categories/menu-categories.service';
import { RestaurantsService } from '@/restaurants/restaurants.service';
import { FilterQuery } from 'mongoose';
import { User } from '@/users/user.schema';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';

@Injectable()
export class MenusService {
  constructor(
    private readonly menusRepository: MenusRepository,
    private readonly restaurantService: RestaurantsService,
    private readonly menuCategoriesService: MenuCategoriesService
  ) {}

  async create(createdMenuDto: {
    menuDto: Partial<Menu>;
    user: Partial<User>;
  }) {
    const { menuDto, user } = createdMenuDto;

    const menuCategory =
      await this.menuCategoriesService.findOneIfNotExistsFail({
        _id: menuDto.category,
        restaurant: menuDto.restaurant
      });

    const restaurant = await this.restaurantService.findOneIfNotExistsFail({
      _id: menuDto.restaurant
    });

    await this.restaurantService.findOneMemberWithRelationsIfNotExistsFail({
      restaurant: menuDto.restaurant,
      member: user._id
    });

    await this.menusRepository.findOneIfExistsFail({
      name: menuDto.name,
      category: menuDto.category,
      restaurant: menuDto.restaurant
    });

    return await this.menusRepository.create(menuDto);
  }

  async findOrSearch(filter: FilterQuery<Menu>, query: PaginationQueryDTO) {
    return await this.menusRepository.findOrSearch(filter);
  }

  async findOneWithRelationsIfNotExistsFail(filter: FilterQuery<Menu>) {
    const menu = await this.menusRepository.findOneWithRelations(filter);

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  async findOneIfNotExistsFail(filter: FilterQuery<Menu>) {
    const menu = await this.menusRepository.findOne(filter);

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  async findOne(filter: FilterQuery<Menu>) {
    return await this.menusRepository.findOne(filter);
  }
}
