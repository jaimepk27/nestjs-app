import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

import { MongodbProperties } from '../mongodb-properties/mongodb-properties.interface';

@Injectable()
export class MongodbConfigService implements MongooseOptionsFactory {
  private readonly mongodbProperties: MongodbProperties;

  constructor(private readonly configService: ConfigService) {
    this.mongodbProperties =
      this.configService.get<MongodbProperties>('db.mongodb');
  }

  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.mongodbProperties.uri,
    };
  }
}
