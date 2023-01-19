import { randomUUID } from 'crypto';
import { Model, Error as MongooseError } from 'mongoose';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomDocument, Room } from './schemas/room.schema';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<RoomDocument>,
  ) {}

  async createOne(createRoomDto: CreateRoomDto): Promise<Room> {
    const roomCreated = new this.roomModel(createRoomDto);

    roomCreated.id = randomUUID();
    roomCreated.createdAt = new Date();

    try {
      await roomCreated.save();
    } catch (err) {
      const cause: MongooseError = err;

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

    return roomCreated;
  }

  async find(): Promise<Array<Room>> {
    return this.roomModel.find(
      {},
      {
        _id: 0,
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  async deleteOne(name: string): Promise<void> {
    const res = await this.roomModel.deleteOne({ name });
  }
}
