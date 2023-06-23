import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Menu, MenuSchema } from './menus.schema';
import { MenusController } from './menus.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Menu.name, schema: MenuSchema }])
  ],
  providers: [MenusService],
  controllers: [MenusController]
})
export class MenusModule {}
