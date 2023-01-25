import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtPropertiesService } from '../jwt-properties/jwt-properties.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(jwtProperties: JwtPropertiesService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtProperties.getSecret(),
    });
  }

  async validate(payload: any) {
    return { username: payload.sub };
  }
}
