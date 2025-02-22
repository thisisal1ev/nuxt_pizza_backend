import { Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // TODO: Implement the `verify` method
  @Get('verify')
  verify() {}

  // TODO: Implement the `me` method
  @Get('me')
  me() {}

  // TODO: Implement the `update` method
  @Patch('me')
  updatePassword() {}

  @Post('login')
  login(@Req() req: Request) {
    return this.authService.login(req);
  }

  @Post('register')
  register(@Req() req: Request) {
    return this.authService.register(req);
  }

  // TODO: Implement the `logout` method
  @Post('logout')
  logout() {}
}
