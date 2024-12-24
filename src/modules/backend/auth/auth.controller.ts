import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@/common/decorators/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('core')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Public()
  @Post('refresh_token')
  async refreshToken(@Body() data: any) {
    return this.authService.refreshToken(data.token);
  }
}
