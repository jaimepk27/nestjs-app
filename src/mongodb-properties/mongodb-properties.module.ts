import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongoDbPropertiesService } from './mongodb-properties.service';
import { MongooseLoaderService } from '../mongoose-loader/mongoose-loader.service';

@Module({
  imports: [ConfigModule],
  exports: [MongoDbPropertiesService],
  providers: [MongoDbPropertiesService, MongooseLoaderService],
})
export class MongoDbPropertiesModule {}
