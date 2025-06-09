import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const token = req?.cookies?.refresh_token;
          return token;
        },
      ]),
      secretOrKey: process.env.JWT_REFRESH_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req?.cookies?.refresh_token;

    const user = await this.userService.findByEmail(payload.sub);

    if (!user) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return { id: user.id, username: user.fullName, email: user.email };
  }
}
