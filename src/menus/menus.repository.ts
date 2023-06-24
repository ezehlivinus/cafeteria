import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '@/common/database/entity/entity.repository';

import { FilterQuery } from 'mongoose';
import { Menu, MenuDocument, MenuModel } from './menus.schema';
import { MenuCategory } from '@/menu-categories/menu-categories.schema';
import { Restaurant } from '@/restaurants/schemas/restaurants.schema';

@Injectable()
export class MenusRepository extends EntityRepository<MenuDocument> {
  constructor(@InjectModel(Menu.name) private menuModel: MenuModel) {
    super(menuModel);
  }

  async findOneIfExistsFail(filter: FilterQuery<Menu>) {
    const menuModel = await this.findOne(filter);

    if (menuModel) {
      throw new NotFoundException('Menu already exists');
    }

    return menuModel;
  }

  async findOneWithRelations(filter: FilterQuery<Menu>) {
    const menu = await this.menuModel.findOne(filter).populate([
      {
        path: 'category',
        model: MenuCategory.name
      },
      {
        path: 'restaurant',
        model: Restaurant.name
      }
    ]);

    return menu;
  }
}
