import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/request/auth-login.dto';
import { v4 as uuid } from 'uuid';
import { sign } from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { hashText } from 'src/utils/hash-text/hash-text';
import {
  CreateTokenResult,
  GenerateTokenResult,
  JwtPayload,
  LoginUserResponse,
  LogoutUserResponse,
} from 'src/types/auth';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  private async generateToken(user: UserEntity): Promise<GenerateTokenResult> {
    let token: string;
    let userWithThisToken: UserEntity;
    do {
      token = uuid();
      userWithThisToken = await this.usersService.findOneByToken(token);
    } while (!!userWithThisToken);
    user.currentTokenId = token;
    await user.save();
    return token;
  }

  private async createToken(user: UserEntity): Promise<CreateTokenResult> {
    const payload: JwtPayload = { id: await this.generateToken(user) };
    return { accessToken: sign(payload, process.env.JWT_SECRET_KEY) };
  }

  async login({ email, password }: AuthLoginDto): Promise<LoginUserResponse> {
    const user = await UserEntity.findOneBy({ email });
    if (!user) throw new NotFoundException('User not found');
    if ((await hashText(password)) !== user.password)
      throw new UnauthorizedException('Wrong password');
    return await this.createToken(user);
  }

  async logout(user: UserEntity): Promise<LogoutUserResponse> {
    user.currentTokenId = null;
    await user.save();
    return {
      message: 'Logged out successfully',
    };
  }
}
