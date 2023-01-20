import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { MongoDbPropertiesService } from '../mongodb-properties/mongodb-properties.service';

@Injectable()
export class MongooseLoaderService implements MongooseOptionsFactory {
  constructor(private readonly mongoDbProperties: MongoDbPropertiesService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongoDbProperties.getUri(),
    };
  }
}
