import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema({
  versionKey: false,
})
export class Room {
  @Prop({
    required: true,
    unique: true,
  })
  id: string;

  @Prop({
    required: true,
    unique: true,
  })
  name: string;

  @Prop()
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
