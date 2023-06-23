import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EntityRepository } from '@/common/database/entity/entity.repository';

import { FilterQuery } from 'mongoose';
import { Menu, MenuDocument, MenuModel } from './menus.schema';

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
}
