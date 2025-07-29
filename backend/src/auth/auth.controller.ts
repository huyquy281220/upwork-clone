import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { LocalAuthGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { Public } from './decorators/public.decorator';
interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('sign-up')
  @Public()
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Post('sign-in')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(
      email,
      password,
    );

    // res.cookie('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: false,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    // });

    return res.json({ accessToken, user, refreshToken });
  }

  @Post('google-signin')
  @Public()
  async googleSignin(
    @Body()
    { email, role, name }: { email: string; role: string; name: string },
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.googleSignin(email, role, name);

    // res.cookie('refresh_token', refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   secure: false,
    //   sameSite: 'lax',
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    // });

    return res.json({ accessToken, user, refreshToken });
  }

  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: Request, @Res() res: Response) {
    const authHeader = req.headers.authorization;
    let userId: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = this.jwtService.verify(token, {
          secret: process.env.JWT_SECRET,
        });
        userId = decoded.sub;
      } catch (error) {
        console.error('Invalid token:', error);
      }
    }

    return this.authService.signout(userId as string, res);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Body()
    {
      currentPassword,
      newPassword,
      userId,
    }: { currentPassword: string; newPassword: string; userId: string },
    @Res() res: Response,
  ) {
    await this.authService.changePassword(userId, currentPassword, newPassword);
    res.clearCookie('refresh_token');
    res.clearCookie('role');
    return res.json({ message: 'Password changed successfully' });
  }

  @Post('verify-session')
  @HttpCode(HttpStatus.OK)
  async verifySession(@Headers('authorization') authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');

    try {
      // Verify NextAuth JWT token
      const decoded = this.jwtService.verify(token, {
        secret: process.env.NEXTAUTH_SECRET,
      }) as any;

      // Get fresh user data from database
      const user = await this.userService.findByEmail(decoded.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return { user };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(
    @Req() req: Request & { user: { email: string } },
    @Res() res: Response,
  ) {
    return this.authService.refreshToken(req, res, req.user.email);
  }
}
