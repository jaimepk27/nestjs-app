import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { JwtProperties } from './jwt-properties';

@Injectable()
export class JwtPropertiesService {
  private readonly secret: string;

  private readonly expiresIn: string | number;

  constructor(configService: ConfigService) {
    const properties = configService.get<JwtProperties>('jwt.secret');

    this.secret = properties?.secret || 'test';
    this.expiresIn = properties?.expiresIn || '60s';
  }

  getExpiresIn(): string | number {
    return this.expiresIn;
  }

  getSecret(): string {
    return this.secret;
  }
}
