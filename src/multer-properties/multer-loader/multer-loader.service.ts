import { Injectable } from '@nestjs/common';
import {
  MulterOptionsFactory,
  MulterModuleOptions,
} from '@nestjs/platform-express';

import { MulterPropertiesService } from '../multer-properties.service';

@Injectable()
export class MulterLoaderService implements MulterOptionsFactory {
  constructor(private readonly multerProperties: MulterPropertiesService) {}

  createMulterOptions(): MulterModuleOptions {
    return {
      dest: this.multerProperties.getDest(),
      limits: {
        fileSize: 1_000,
      },
    };
  }
}
