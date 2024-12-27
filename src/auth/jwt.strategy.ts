import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/users/entities/user.entity';
import { ExtractJwt } from 'passport-jwt';
import { JwtPayload } from 'src/types/auth';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate({ id }: JwtPayload) {
    if (!id) throw new UnauthorizedException();

    const user = await this.usersService.findOneByToken(id);

    if (!user) throw new UnauthorizedException();

    return user;
  }
}
