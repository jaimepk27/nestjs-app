import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MongoDbProperties } from './mongodb-properties.interface';

@Injectable()
export class MongoDbPropertiesService {
  private readonly uri: string;

  constructor(configService: ConfigService) {
    const properties = configService.get<MongoDbProperties>('data.mongodb');

    this.uri = properties?.uri || 'mongodb://localhost:27017/test';
  }

  getUri(): string {
    return this.uri;
  }
}
