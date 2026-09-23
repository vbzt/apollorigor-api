import { Body, Controller, Get, Patch, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service.js';
import {
  LoginDto,
  RegisterDto,
  RefreshDto,
  RecoverDto,
  ResetPasswordDto,
  UpdateProfileDto,
} from './dto/auth.dto.js';
import {
  CurrentUser,
  Public,
} from '../../common/decorators/access.decorator.js';
import type { AuthenticatedRequest } from '../../common/decorators/access.decorator.js';
import type { Profile } from '../../generated/prisma/client.js';
@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Public()
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('register')
  register(@Body() data: RegisterDto) {
    return this.service.register(data);
  }
  @Public()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.service.login(data);
  }
  @Public()
  @Post('refresh')
  refresh(@Body() data: RefreshDto) {
    return this.service.refresh(data.refreshToken);
  }
  @Post('logout')
  logout(@Req() req: AuthenticatedRequest) {
    return this.service.logout(req.accessToken);
  }
  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })
  @Post('recover')
  recover(@Body() data: RecoverDto) {
    return this.service.recover(data.email);
  }
  @Post('reset-password')
  reset(@Req() req: AuthenticatedRequest, @Body() data: ResetPasswordDto) {
    return this.service.resetPassword(req.accessToken, data.password);
  }
  @Get('me')
  me(@CurrentUser() user: Profile) {
    return user;
  }
  @Patch('me')
  update(@CurrentUser() user: Profile, @Body() data: UpdateProfileDto) {
    return this.service.updateProfile(user.id, data);
  }
}
