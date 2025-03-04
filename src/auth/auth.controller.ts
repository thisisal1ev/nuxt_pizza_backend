import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

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

  @Post('register')
  async register(
    @Body() body: { email: string; password: string; fullName: string },
  ) {
    return this.authService.register(body.email, body.password, body.fullName);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // TODO: Implement the `logout` method
  @Post('logout')
  logout() {}
}
