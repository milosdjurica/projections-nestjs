import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from '../types';
import { JwtService } from '@nestjs/jwt';
import { User } from '@Src/users/schemas/user.schema';
import { UsersRepository } from '@Src/users/users.repository';

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

    // just getting user that is created, but without hash
    // because i dont want to put hash(password) into jwt
    const foundUser = await this.userRepository.findOne(
      { username: newUser.username },
      { hash: 0 },
    );

    const tokens = await this.getTokens(foundUser);
    await this.updateRefreshTokenHash(foundUser.username, tokens.refresh_token);
    return tokens;
  }

  async loginLocal(loginDto: LoginDto) {
    const username = loginDto.username;
    const user = await this.userRepository.findOne({ username });
    if (!user) throw new ForbiddenException('Access denied');

    const passwordMatches = await bcrypt.compare(loginDto.password, user.hash);
    if (!passwordMatches) throw new ForbiddenException('Access denied');

    const userWIthoutHash = await this.userRepository.findOne(
      { username },
      { hash: 0, hashedRt: 0 },
    );
    const tokens = await this.getTokens(userWIthoutHash);
    await this.updateRefreshTokenHash(
      userWIthoutHash.username,
      tokens.refresh_token,
    );
    return tokens;
  }

  async updateRefreshTokenHash(username: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.userRepository.findOneAndUpdate(
      { username },
      { hashedRt: hash },
    );
  }

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
