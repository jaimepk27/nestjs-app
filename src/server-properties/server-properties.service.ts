import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ServerProperties } from './server-properties.interface';

@Injectable()
export class ServerPropertiesService {
  private readonly port: number;

  constructor(configService: ConfigService) {
    const properties = configService.get<ServerProperties>('server');

    this.port = properties.port || 8080;
  }

  getPort(): number {
    return this.port;
  }
}
