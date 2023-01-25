import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { PasswordService } from '../password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOne(username);

    if (user) {
      const matched = await this.passwordService.checkPassword(
        password,
        user.password,
      );

      if (matched) {
        return user;
      }
    }

    throw new Error('');
  }

  async login(user: User) {
    const { username } = user;

    return {
      access_token: this.jwtService.sign({ sub: username }),
    };
  }
}
