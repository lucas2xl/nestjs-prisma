import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './shared/auth.service';
import { LocalAuthGuard } from './shared/local-auth.guard';

@ApiTags('Auth')
@UseGuards(LocalAuthGuard)
@Controller('auth/login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Request() request: any) {
    return {
      ...request.user,
      access_token: this.authService.login(request.user),
    };
  }
}
