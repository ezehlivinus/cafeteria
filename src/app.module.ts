import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { paginatePlugin, searchPlugin } from './common/database/plugins';
import { Connection } from 'mongoose';
import { MenusModule } from './menus/menus.module';
import { MenuCategoriesModule } from './menu-categories/menu-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, jwtConfig]
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],

      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('database.url'),
        connectionFactory: (connection: Connection) => {
          connection.plugin(paginatePlugin);
          connection.plugin(searchPlugin);
          return connection;
        }
      })
    }),
    AuthModule,
    UsersModule,
    RestaurantsModule,
    MenusModule,
    MenuCategoriesModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})
export class AppModule {}
