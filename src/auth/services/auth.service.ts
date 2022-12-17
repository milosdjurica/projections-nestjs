import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Src/users/schemas/user.schema';
import { UsersRepository } from '@Src/users/users.repository';
import { ObjectId } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UsersRepository,
  ) {}

  async registerLocal(registerDto: RegisterDto): Promise<Tokens> {
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
    return this.userRepository.findOneAndUpdate(
      {
        _id: userId,
        // checks if hashedRt is null
        hashedRt: { $ne: null },
      },
      {
        hashedRt: null,
      },
    );
  }

  async refreshTokens(userId: ObjectId, rt: string) {
    const user = await this.userRepository.findOne({
      sub: userId,
    });

    // if i am logged out user.hashedRt will be null
    if (!user || user.hashedRt)
      throw new ForbiddenException('Access denied');

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
          role: user.role,
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
          role: user.role,
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
