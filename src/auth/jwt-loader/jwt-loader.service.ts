import { Injectable } from '@nestjs/common';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

import { JwtPropertiesService } from '../jwt-properties/jwt-properties.service';

@Injectable()
export class JwtLoaderService implements JwtOptionsFactory {
  constructor(private readonly jwtProperties: JwtPropertiesService) {}

  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.jwtProperties.getSecret(),
      signOptions: {
        expiresIn: this.jwtProperties.getExpiresIn(),
      },
    };
  }
}
