import { Injectable } from '@nestjs/common';
import { UsersService } from '@Src/users/services/users.service';
import { RegisterDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Src/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async registerLocal(registerDto: RegisterDto): Promise<Tokens> {
    const hash = await this.hashData(registerDto.password);
    const newUser = await this.userService.createUser({
      username: registerDto.username,
      hash,
    });

    // if i deconstruct it, jwt is not valid
    // const {hash, ...proba} = newUser

    // i have to put it on null
    // because for some reason it doesnt delete hash property
    newUser.hash = null;
    delete newUser.hash;

    const tokens = await this.getTokens(newUser);
    await this.updateRefreshTokenHash(newUser.username, tokens.refresh_token);
    return tokens;
  }

  // here passing only username
  // because newUser.hash === null so it wont match with obj in db
  async updateRefreshTokenHash(username: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userService.findOneAndUpdate({ username }, { hashedRt: hash });
  }

  loginLocal() {}
  logout(): void {}
  refreshTokens() {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(user: User): Promise<Tokens> {
    console.log('LOGGING USER ID IN GET TOKENS IN AUTH SERVICE');
    console.log(user);

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          user,
        },
        {
          secret: process.env.JWT_AUTH_SECRET,
          expiresIn: '50m',
        },
      ),
      this.jwtService.signAsync(
        {
          user,
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
