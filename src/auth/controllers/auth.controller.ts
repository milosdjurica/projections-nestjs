import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser, GetCurrentUserId, Public } from '@Src/common/decorators';
import { RtGuard } from '@Src/common/guards';
import { ObjectId } from 'mongoose';
import { LoginDto, RegisterDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { Tokens } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  registerLocal(@Body() registerDto: RegisterDto): Promise<Tokens> {
    return this.authService.registerLocal(registerDto);
  }

  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async loginLocal(@Body() loginDto: LoginDto) {
    return this.authService.loginLocal(loginDto);
  }

  @Post('local/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: ObjectId) {
    // should redirect to login route
    return this.authService.logout(userId);
  }

  // dont need AtGuard so its overriden with Public(), need only RtGuard
  @Public()
  @UseGuards(RtGuard)
  @Post('local/refresh')
  @HttpCode(HttpStatus.OK)
  refreshtokens(
    @GetCurrentUserId() userId: ObjectId,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    // refreshToken is how it is named in refresh-token.strategy.ts
    return this.authService.refreshTokens(userId, refreshToken);
  }
}
