import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { MulterProperties } from './multer-properties.interface';

@Injectable()
export class MulterPropertiesService {
  private readonly dest: string;

  constructor(configService: ConfigService) {
    const properties = configService.get<MulterProperties>('multer');

    this.dest = properties?.dest || './media';
  }

  getDest(): string {
    return this.dest;
  }
}
