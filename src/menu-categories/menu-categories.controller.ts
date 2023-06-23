import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  ValidationPipe
} from '@nestjs/common';
import { MenuCategoriesService } from './menu-categories.service';
import { Auth } from '@/common/decorators/http.decorator';
import { ErrorResponseDTO } from '@/common/dtos/response.dto';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiTags,
  ApiOkResponse
} from '@nestjs/swagger';
import { CreateMenuCategoryDto } from './dtos/create-menu-categories.dto';
import { ListMenuCategoriesResponseDto, MenuCategoriesResponseDto } from './dtos/menu-categories-response.dto';
import { IdDto } from '@/common/dtos/util.dto';
import { Roles, User } from '@/users/user.schema';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { MenuCategory } from './menu-categories.schema';
import { PaginationQueryParams } from '@/common/decorators/pagination.decorator';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';
import { FilterQuery } from 'mongoose';

@ApiTags('restaurants')
@Controller('restaurants/:id/menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Endpoint for creating restaurant's menu categories"
  })
  @ApiCreatedResponse({
    description: 'Menu category creation is successful',
    type: MenuCategoriesResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  @ApiConflictResponse({
    description: 'Menu category already exists',
    type: ErrorResponseDTO
  })
  @Auth([Roles.RESTAURANT_OWNER, Roles.RESTAURANT_EMPLOYEE])
  async create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
    @Param() params: IdDto,
    @CurrentUser() auth: Partial<User>
  ) {
    const newMenuCategory = await this.menuCategoriesService.create({
      menuCategoryDto: { ...createMenuCategoryDto, restaurant: params.id },
      user: auth
    });
    return {
      data: newMenuCategory
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint for listing or searching for restaurant menu categories'
  })
  @ApiOkResponse({
    description: 'Menu categories listed successfully',
    type: ListMenuCategoriesResponseDto
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
    const filter: FilterQuery<MenuCategory> = {};

    const menuCategories = await this.menuCategoriesService.findOrSearch(
      filter,
      query
    );
    return menuCategories;
  }
}
