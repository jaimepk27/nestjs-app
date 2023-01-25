import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthLocalStrategyService } from './auth-local-strategy.service';
import { UsersModule } from '../users/users.module';
import { PasswordModule } from '../password/password.module';
import { JwtLoaderService } from './jwt-loader/jwt-loader.service';
import { JwtPropertiesModule } from './jwt-properties/jwt-properties.module';
import { JwtStrategyService } from './jwt-strategy/jwt-strategy.service';

@Module({
  providers: [AuthService, AuthLocalStrategyService, JwtStrategyService],
  controllers: [AuthController],
  imports: [
    UsersModule,
    PasswordModule,
    PassportModule,
    JwtPropertiesModule,
    JwtModule.registerAsync({
      imports: [JwtPropertiesModule],
      useExisting: JwtLoaderService,
    }),
  ],
})
export class AuthModule {}
