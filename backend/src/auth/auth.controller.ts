import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { LocalAuthGuard } from './guards/auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async login(@Body() { email, password }: LoginDto, @Res() res: Response) {
    const { accessToken, refreshToken, user } = await this.authService.signIn(
      email,
      password,
    );

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      //   secure: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken, user });
  }

  @Post('google-signin')
  async googleSignin(
    @Body()
    { email, role, name }: { email: string; role: string; name: string },
    @Res() res: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.googleSignin(email, role, name);

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken, user });
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Req() req: Request & { user: { id: string } },
    @Res() res: Response,
  ) {
    const user = req.user;
    res.clearCookie('refresh_token');
    res.clearCookie('role');
    return this.authService.signout(user.id, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(
    @Req() req: Request & { user: { id: string } },
    @Body()
    {
      currentPassword,
      newPassword,
    }: { currentPassword: string; newPassword: string },
    @Res() res: Response,
  ) {
    const user = req.user;
    await this.authService.changePassword(
      user.id,
      currentPassword,
      newPassword,
    );
    res.clearCookie('refresh_token');
    res.clearCookie('role');
    return res.json({ message: 'Password changed successfully' });
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
