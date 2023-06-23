import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantsRepository } from './restaurants.repository';
import { Restaurant, RestaurantSchema } from './schemas/restaurants.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from '@/users/user.schema';
import { UsersModule } from '@/users/users.module';
import {
  RestaurantMember,
  RestaurantMemberSchema
} from './schemas/restaurant-members.schema';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
      { name: RestaurantMember.name, schema: RestaurantMemberSchema }
    ])
  ],
  providers: [RestaurantsService, RestaurantsRepository],
  controllers: [RestaurantsController],
  exports: [RestaurantsService]
})
export class RestaurantsModule {}
