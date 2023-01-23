import { SchemaFactory } from '@nestjs/mongoose';

import { User } from '../entities/user.entity';

export const UserSchema = SchemaFactory.createForClass(User);
