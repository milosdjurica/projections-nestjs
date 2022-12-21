import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from '../dto';
import { Tokens } from '../types';
import { UsersRepository } from '@Src/users/users.repository';
import { User } from '@Src/database/schemas';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UsersRepository,
  ) {}

  async registerLocal(registerDto: RegisterDto): Promise<Tokens> {
    const usernameTaken = await this.userRepository.findOne({
      username: registerDto.username,
    });

    if (usernameTaken)
      throw new HttpException(
        'Username is already taken! Please provide another one.',
        HttpStatus.BAD_REQUEST,
      );

    delete registerDto.confirmPassword;
    const hash = await this.hashData(registerDto.password);
    const newUser = await this.userRepository.create({
      hash,
      ...registerDto,
    });

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshTokenHash(newUser.username, tokens.refresh_token);
    return tokens;
  }

  async loginLocal(loginDto: LoginDto) {
    const username = loginDto.username;
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(loginDto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user);
    await this.updateRefreshTokenHash(user.username, tokens.refresh_token);
    return tokens;
  }

  async logout(userId: ObjectId) {
    const user = await this.userRepository.findOneAndUpdate(
      {
        _id: userId,
        // checks if hashedRt is null
        hashedRt: { $ne: null },
      },
      {
        hashedRt: null,
      },
      { hash: 0, __v: 0 },
    );

    if (!user)
      return {
        success: false,
        msg: 'Something went wrong! User id is not valid or user is already logged out!',
      };

    // !2nd option is to return user object that just logged out
    return {
      success: true,
      msg: `User ${user.username} is successfully logged out!`,
    };
  }

  async refreshTokens(userId: ObjectId, rt: string) {
    const user = await this.userRepository.findOne({
      sub: userId,
    });

    // if i am logged out user.hashedRt will be null
    // need this so program dont break on bcrypt.compare
    if (!user || !user.hashedRt)
      throw new ForbiddenException(
        'Access denied! Wrong user id or you are already logged out',
      );

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Token is not valid');

    const tokens = await this.getTokens(user);
    await this.updateRefreshTokenHash(user.username, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshTokenHash(username: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userRepository.findOneAndUpdate(
      { username },
      { hashedRt: hash },
    );
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(user: Partial<User>): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user['_id'],
          username: user.username,
          isAdmin: user.isAdmin,
        },
        {
          secret: process.env.JWT_AUTH_SECRET,
          expiresIn: '50m',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: user['_id'],
          username: user.username,
          isAdmin: user.isAdmin,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '1d',
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
