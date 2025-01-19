import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/request/auth-login.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserObj } from 'src/decorators/user-obj.decorator';
import { LoginUserResponse, LogoutUserResponse } from 'src/types/auth';
import { Auth } from 'src/decorators/auth.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginData: AuthLoginDto): Promise<LoginUserResponse> {
    return this.authService.login(loginData);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async logout(@UserObj() user: UserEntity): Promise<LogoutUserResponse> {
    return this.authService.logout(user);
  }
}
