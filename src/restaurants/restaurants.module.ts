import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { Restaurant, RestaurantSchema } from './restaurants.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '@/users/user.schema';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema }
    ])
  ],
  providers: [RestaurantsService, RestaurantsRepository],
  controllers: [RestaurantsController],
  exports: [RestaurantsRepository]
})
export class RestaurantsModule {}
