import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// export type UserDocument = HydratedDocument<User>;
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop()
  hash: string;

  @Prop({default: null})
  hashedRt: string;

  @Prop({default: 'basic user'})
  role?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
