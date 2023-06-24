import { Module, Res, forwardRef } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './menus.schema';
import { MenusController } from './menus.controller';
import { MenusRepository } from './menus.repository';
import { RestaurantsModule } from '@/restaurants/restaurants.module';
import { MenuCategoriesModule } from '@/menu-categories/menu-categories.module';

@Module({
  imports: [
    RestaurantsModule,
    MenuCategoriesModule,
    forwardRef(() => MenuCategoriesModule),
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])
  ],
  providers: [MenusService, MenusRepository],
  controllers: [MenusController],
  exports: [MenusService]
})
export class MenusModule {}
