import { Prop, Schema } from '@nestjs/mongoose';

@Schema({
  toJSON: {
    transform: (doc, ret) => {
      delete ret['_id'];
      delete ret['password'];

      return ret;
    },
  },
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop()
  createdAt: Date;
}
