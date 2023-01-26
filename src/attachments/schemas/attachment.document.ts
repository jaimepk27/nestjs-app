import { HydratedDocument } from 'mongoose';

import { Attachment } from '../entities/attachment.entity';

export type AttachmentDocument = HydratedDocument<Attachment>;
