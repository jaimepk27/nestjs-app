import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret['_id'];
      delete ret['path'];

      return ret;
    },
  },
  versionKey: false,
})
export class Attachment {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  path: string;

  @Prop({
    required: true,
  })
  mimetype: string;

  @Prop({
    required: true,
  })
  size: number;

  @Prop()
  createdAt: Date;
}
