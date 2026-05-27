import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from 'src/models/auth.model';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { auth }: { auth: Auth }) {
    return this.authService.login(auth);
  }

  @Post('register')
  async register(
    @Body()  { auth }: { auth: Auth },
  ) {
    return this.authService.register(auth);
  }
}