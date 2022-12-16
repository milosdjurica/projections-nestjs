import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto, RegisterDto } from '../dto';
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
  async loginLocal(@Body() loginDto: LoginDto) {
    return this.authService.loginLocal(loginDto);
  }

  @Post('local/logout')
  logout() {
    return this.authService.logout();
  }

  @Post('local/refresh')
  refreshtokens() {
    return this.authService.refreshTokens();
  }
}
