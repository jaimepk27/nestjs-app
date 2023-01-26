import { Response } from 'express';
import { createReadStream } from 'fs';
import { resolve } from 'path';

import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Res,
  NotFoundException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AttachmentsService } from './attachments.service';
import { AttachmentsPipe } from './attachments.pipe';
import { Attachment } from './entities/attachment.entity';

@Controller('/api/rooms/:roomId/attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('attachment'))
  async createOne(
    @UploadedFile(AttachmentsPipe) file: Express.Multer.File,
  ): Promise<Attachment> {
    const attachment = await this.attachmentsService.createOne(file);

    return attachment;
  }

  @Get()
  async find(): Promise<Array<Attachment>> {
    return this.attachmentsService.find();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const attachment = await this.attachmentsService.findOne({ id });

    if (!attachment) {
      throw new NotFoundException('Attachment not found');
    }

    const filepath = resolve(attachment.path);

    const file = createReadStream(filepath);

    res.set({
      'Content-Type': attachment.mimetype,
      'Content-Disposition': `attachment; filename="${attachment.name}"`,
    });

    return new StreamableFile(file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.attachmentsService.remove(+id);
  }
}
