import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

// export type UserDocument = HydratedDocument<User>;
export type UserDocument = User & Document;
@Schema({ timestamps: true })
export class User {
  @ApiProperty()
  @Prop({ unique: true })
  username: string;

  @ApiProperty()
  @Prop()
  hash: string;

  @ApiProperty({ default: null })
  @Prop({ default: null })
  hashedRt: string;

  @ApiProperty({ default: false })
  @Prop({ default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
