import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from '../dto';
import { AuthService } from '../services/auth.service';
import { Tokens } from '../types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('local/register')
  registerLocal(@Body() registerDto: RegisterDto): Promise<Tokens> {
    return this.authService.registerLocal(registerDto);
  }

  @Post('local/login')
  loginLocal() {
    this.authService.loginLocal();
  }

  @Post('local/logout')
  logout() {
    this.authService.logout();
  }

  @Post('local/refresh')
  refreshtokens() {
    this.authService.refreshTokens();
  }
}
