import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('register')
  async register(@Body() body: { email: string; password: string }) {
    return this.auth.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.auth.validateUser(body.email, body.password);
    return this.auth.login(user);
  }

  // src/auth/auth.controller.ts
  @Post('register-admin')
  async registerAdmin(@Body() body: { email: string; password: string }) {
    return this.auth.registerAdmin(body.email, body.password);
  }
}