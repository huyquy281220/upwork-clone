import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class NextAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    // Check if it's a Google OAuth token (starts with ya29)
    if (token.startsWith('ya29.')) {
      // For OAuth tokens, get user from request body or skip verification
      const { id } = request.body;
      if (id) {
        const user = await this.userService.findById(id);
        if (user) {
          request.user = user;
          return true;
        }
      }
      return true;
    }

    // Regular JWT verification for NextAuth tokens
    try {
      const decoded = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      }) as any;

      if (!decoded.sub) {
        throw new UnauthorizedException('Invalid token payload');
      }

      const user = await this.userService.findByEmail(decoded.sub);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      request.user = user;

      console.log('user', user);
      return true;
    } catch (error) {
      console.log('error', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
