import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '@/common/database/entity/entity.repository';

import { FilterQuery } from 'mongoose';
import {
  MenuCategory,
  MenuCategoryDocument,
  MenuCategoryModel
} from './menu-categories.schema';

@Injectable()
export class MenuCategoriesRepository extends EntityRepository<MenuCategoryDocument> {
  constructor(
    @InjectModel(MenuCategory.name) private menuCategoryModel: MenuCategoryModel
  ) {
    super(menuCategoryModel);
  }

  async findOneIfExistsFail(filter: FilterQuery<MenuCategory>) {
    const menuCategory = await this.findOne(filter);

    if (menuCategory) {
      throw new NotFoundException('Menu Category already exists');
    }

    return menuCategory;
  }
}
