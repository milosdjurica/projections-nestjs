import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { LoginDto, RegisterDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { Tokens } from '../types';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from '@Src/common/decorators';
import { AdminGuard, RtGuard } from '@Src/common/guards';
import { PasswordValidationPipe } from '@Src/common/pipes';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthOperations } from '@Src/common/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation(AuthOperations.register)
  @UseGuards(AdminGuard)
  @Post('local/register')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new PasswordValidationPipe())
  registerLocal(@Body() registerDto: RegisterDto): Promise<Tokens> {
    return this.authService.registerLocal(registerDto);
  }

  @ApiOperation(AuthOperations.login)
  @Public()
  @Post('local/login')
  @HttpCode(HttpStatus.OK)
  async loginLocal(@Body() loginDto: LoginDto): Promise<Tokens> {
    return this.authService.loginLocal(loginDto);
  }

  @ApiBearerAuth()
  @ApiOperation(AuthOperations.logout)
  @Post('local/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: ObjectId) {
    // should redirect to login route
    return this.authService.logout(userId);
  }

  // dont need AtGuard so its overriden with Public(), need only RtGuard
  // fix ApiBearerAuth to be refresh token a ne jwt
  @ApiBearerAuth()
  @ApiOperation(AuthOperations.refresh)
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
