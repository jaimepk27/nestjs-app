import { SchemaFactory } from '@nestjs/mongoose';

import { Attachment } from '../entities/attachment.entity';

export const AttachmentSchema = SchemaFactory.createForClass(Attachment);
