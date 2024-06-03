import { Controller, Post, UseGuards, Body, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guard/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { LoginUserDto } from 'src/dto/login.user.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth('JWT-auth')
  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('login')
  async login(@Body() userData: LoginUserDto) {
    console.log(userData);
    return this.authService.login(userData);
  }

  @Get('hello')
  async hello() {
    return 'bye';
  }
}
