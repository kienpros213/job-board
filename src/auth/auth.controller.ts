import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() userData: any) {
    console.log(userData);
    return this.authService.login(userData);
  }

  @Get('hello')
  async hello() {
    return 'fuck off';
  }
}
