import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '@Src/users/schemas/user.schema';
import { UsersService } from '@Src/users/services/users.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    AuthService,
    UsersService,
    AuthTokenStrategy,
    RefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
