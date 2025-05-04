import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid refresh token');
    }
    return user;
  }
}
