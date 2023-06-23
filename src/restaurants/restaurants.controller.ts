import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dtos/create-restaurants.dto';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { User } from '@/users/user.schema';
import { ErrorResponseDTO } from '@/common/dtos/response.dto';
import {
  ListRestaurantResponseDto,
  RestaurantResponseDto
} from './dtos/restaurants-response.dto';
import { Auth } from '@/common/decorators/http.decorator';
import { Restaurant } from './schemas/restaurants.schema';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';
import { FilterQuery } from 'mongoose';
import { PaginationQueryParams } from '@/common/decorators/pagination.decorator';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Endpoint for creating restaurant' })
  @ApiCreatedResponse({
    description: 'Restaurant creation is successful',
    type: RestaurantResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  @ApiConflictResponse({
    description: 'Restaurant already exists',
    type: ErrorResponseDTO
  })
  @Auth([])
  async create(
    @Body() createRestaurantDto: CreateRestaurantDto,
    @CurrentUser() auth: Partial<User>
  ) {
    const newRestaurant = await this.restaurantsService.create({
      ...createRestaurantDto,
      owner: auth._id
    });

    return { data: newRestaurant };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint for listing or searching for restaurants'
  })
  @ApiOkResponse({
    description: 'Restaurants listed successfully',
    type: ListRestaurantResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  @PaginationQueryParams()
  async findOrSearch(
    @Query(new ValidationPipe({ transform: true }))
    query: PaginationQueryDTO
  ) {
    const filter: FilterQuery<Restaurant> = {};

    const restaurants = await this.restaurantsService.findOrSearch(
      filter,
      query
    );
    return restaurants;
  }
}
