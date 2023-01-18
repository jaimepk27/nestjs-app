import { randomUUID } from 'crypto';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
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

    return roomCreated.save();
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

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
