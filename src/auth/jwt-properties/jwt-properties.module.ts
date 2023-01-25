import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { JwtLoaderService } from '../jwt-loader/jwt-loader.service';
import { JwtPropertiesService } from '../jwt-properties/jwt-properties.service';

@Module({
  imports: [ConfigModule],
  exports: [JwtPropertiesService, JwtLoaderService],
  providers: [JwtPropertiesService, JwtLoaderService],
})
export class JwtPropertiesModule {}
