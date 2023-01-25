import { Strategy } from 'passport-local';

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthLocalStrategyService extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<User> {
    try {
      const user = await this.authService.validateUser(username, password);

      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }
}
