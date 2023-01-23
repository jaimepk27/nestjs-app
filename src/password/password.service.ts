import { compare, hash } from 'bcrypt';

import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordService {
  private readonly rounds = 10;

  async checkPassword(password: string, encrypted: string): Promise<boolean> {
    return compare(password, encrypted);
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, this.rounds);
  }
}
