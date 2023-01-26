import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';

import { AttachmentsService } from './attachments.service';
import { AttachmentsController } from './attachments.controller';
import { MulterPropertiesModule } from '../multer-properties/multer-properties.module';
import { MulterLoaderService } from '../multer-properties/multer-loader/multer-loader.service';
import { Attachment } from './entities/attachment.entity';
import { AttachmentSchema } from './schemas/attachment.schema';

@Module({
  controllers: [AttachmentsController],
  providers: [AttachmentsService],
  imports: [
    MulterModule.registerAsync({
      imports: [MulterPropertiesModule],
      useExisting: MulterLoaderService,
    }),
    MongooseModule.forFeature([
      { name: Attachment.name, schema: AttachmentSchema },
    ]),
  ],
})
export class AttachmentsModule {}
