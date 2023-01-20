import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { LoggerMiddleware } from './middlewares/logger/logger.middleware';
import { ServerPropertiesService } from './server-properties/server-properties.service';
import { ConfigFileLoader } from './config/configuration';
import { MongooseLoaderService } from './mongoose-loader/mongoose-loader.service';
import { MongoDbPropertiesModule } from './mongodb-properties/mongodb-properties.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ConfigFileLoader],
    }),
    MongooseModule.forRootAsync({
      imports: [MongoDbPropertiesModule],
      useClass: MongooseLoaderService,
    }),
    UsersModule,
    RoomsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ServerPropertiesService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
