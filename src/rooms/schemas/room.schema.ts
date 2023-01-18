import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type RoomDocument = HydratedDocument<Room>;

@Schema()
export class Room {
  @Prop({
    required: true,
  })
  name: string;

  @Prop()
  createdAt: Date;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
