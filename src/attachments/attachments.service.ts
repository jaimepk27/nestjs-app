import { Error as MongooseError, Model } from 'mongoose';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Attachment } from './entities/attachment.entity';

@Injectable()
export class AttachmentsService {
  private readonly logger = new Logger(AttachmentsService.name);

  constructor(
    @InjectModel(Attachment.name)
    private readonly attachmentModel: Model<Attachment>,
  ) {}

  async createOne(fileUploaded: Express.Multer.File): Promise<Attachment> {
    const { filename, mimetype, originalname, path, size } = fileUploaded;

    this.logger.log(`Create attachment, name=${originalname}`);

    const attachmentCreated = new this.attachmentModel<Attachment>({
      id: filename,
      mimetype,
      name: originalname,
      path,
      size,
      createdAt: new Date(),
    });

    try {
      await attachmentCreated.save();

      this.logger.debug(`User created, name=${attachmentCreated.name}`);
    } catch (err) {
      const cause: MongooseError = err;

      this.logger.error(
        `Failed to create attachment, name=${attachmentCreated.name}`,
        err,
      );

      if (cause instanceof MongooseError.ValidationError) {
        throw new BadRequestException(cause.message, {
          cause,
        });
      }

      if (cause.message.includes('duplicate key')) {
        throw new BadRequestException(cause.message, {
          cause,
          description: 'Bad Request',
        });
      }

      throw err;
    }

    return attachmentCreated;
  }

  async find(): Promise<Array<Attachment>> {
    this.logger.log('Find attachments');

    // TODO: attachment[].href

    return this.attachmentModel.find(
      {},
      {
        _id: 0,
      },
    );
  }

  async findOne(filter: Partial<Attachment>): Promise<Attachment> {
    return this.attachmentModel.findOne(filter);
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
