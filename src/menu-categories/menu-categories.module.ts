import { Module, forwardRef } from '@nestjs/common';
import { MenuCategoriesService } from './menu-categories.service';
import { MenuCategoriesController } from './menu-categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuCategory, MenuCategorySchema } from './menu-categories.schema';
import { MenuCategoriesRepository } from './menu-categories.repository';
import { UsersModule } from '@/users/users.module';
import { RestaurantsModule } from '@/restaurants/restaurants.module';
import { MenusModule } from '@/menus/menus.module';

@Module({
  imports: [
    UsersModule,
    RestaurantsModule,
    forwardRef(() => MenusModule),
    MongooseModule.forFeature([
      { name: MenuCategory.name, schema: MenuCategorySchema }
    ])
  ],
  providers: [MenuCategoriesService, MenuCategoriesRepository],
  controllers: [MenuCategoriesController],
  exports: [MenuCategoriesService]
})
export class MenuCategoriesModule {}
