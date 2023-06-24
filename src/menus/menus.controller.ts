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
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { MenusService } from './menus.service';
import { Auth } from '@/common/decorators/http.decorator';
import { CurrentUser } from '@/common/decorators/user.decorator';
import { ErrorResponseDTO } from '@/common/dtos/response.dto';
import { IdDto } from '@/common/dtos/util.dto';
import { CreateMenuCategoryDto } from '@/menu-categories/dtos/create-menu-categories.dto';
import { MenuCategoriesResponseDto } from '@/menu-categories/dtos/menu-categories-response.dto';
import { Roles, User } from '@/users/user.schema';
import { CreateMenuDto, CreateMenuParamsDto } from './dtos/create-menus.dto';
import {
  FindOneMenuWithRelationsResponseTypeDto,
  ListMenuParamsDto,
  ListMenuResponseDto,
  MenuResponseDto
} from './dtos/menus-response.dto';
import { Menu } from './menus.schema';
import { PaginationQueryParams } from '@/common/decorators/pagination.decorator';
import { PaginationQueryDTO } from '@/common/dtos/pagination.dto';
import { FilterQuery } from 'mongoose';

@ApiTags('restaurants')
@Controller('restaurants/:restaurantId/menu-categories/:menuCategoryId/menus')
export class MenusController {
  constructor(private menusService: MenusService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: "Endpoint for creating restaurant's menu"
  })
  @ApiCreatedResponse({
    description: 'Menu creation is successful',
    type: MenuResponseDto
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
    @Body() createMenuDto: CreateMenuDto,
    @Param() params: CreateMenuParamsDto,
    @CurrentUser() auth: Partial<User>
  ) {
    const newMenu = await this.menusService.create({
      menuDto: {
        ...createMenuDto,
        restaurant: params.restaurantId,
        category: params.menuCategoryId
      },
      user: auth
    });
    return {
      data: newMenu
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint for listing or searching for restaurants menus'
  })
  @ApiOkResponse({
    description: 'Restaurants listed successfully',
    type: ListMenuResponseDto
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  @PaginationQueryParams()
  async findOrSearch(
    @Query(new ValidationPipe({ transform: true }))
    query: PaginationQueryDTO,
    @Param() params: ListMenuParamsDto
  ) {
    const filter: FilterQuery<Menu> = {};

    const menus = await this.menusService.findOrSearch(filter, query);
    return menus;
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint for listing or searching for restaurants menus'
  })
  @ApiOkResponse({
    description: 'Restaurants listed successfully',
    type: FindOneMenuWithRelationsResponseTypeDto
  })
  @ApiBadRequestResponse({
    description: 'Credentials is invalid',
    type: ErrorResponseDTO
  })
  async findOne(@Param() params: IdDto) {
    // const filter: FilterQuery<Menu> = {};

    const menus = await this.menusService.findOneWithRelationsIfNotExistsFail({
      _id: params.id
    });
    return { data: menus };
  }
}
