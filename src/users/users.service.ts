import { Error as MongooseError, Model } from 'mongoose';

import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserDocument } from './schemas/user.document';
import { PasswordService } from '../password/password.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly passwordService: PasswordService,
  ) {}

  async createOne(user: CreateUserDto): Promise<User> {
    this.logger.log(`Create user, email=${user.email}`);

    const userCreated = new this.userModel(user);

    userCreated.password = await this.passwordService.hashPassword(
      user.password,
    );
    userCreated.createdAt = new Date();

    try {
      await userCreated.save();

      this.logger.debug(`User created, email=${userCreated.email}`);
    } catch (err) {
      const cause: MongooseError = err;

      this.logger.error(
        `Failed to create user, email=${userCreated.email}`,
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

    return userCreated;
  }

  async find(): Promise<Array<User>> {
    this.logger.log('Find users');

    return this.userModel.find(
      {},
      {
        _id: 0,
        password: 0,
      },
    );
  }

  async findOne(username: string): Promise<UserDocument> {
    return this.userModel.findOne({ username });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
