import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  hash: string;

  @Prop()
  hashedRt?: string;

  @Prop()
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
