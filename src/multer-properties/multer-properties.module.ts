import { Module } from '@nestjs/common';
import { MulterPropertiesService } from './multer-properties.service';
import { MulterLoaderService } from './multer-loader/multer-loader.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [MulterPropertiesService, MulterLoaderService],
  exports: [MulterPropertiesService, MulterLoaderService],
})
export class MulterPropertiesModule {}
