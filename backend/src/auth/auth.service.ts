import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOne(email);
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async logIn(email: string, pwd: string) {
    try {
      const user = await this.userService.findOne(email);
      if (!user) {
        throw new UnauthorizedException('Wrong Email or Password');
      }

      const verifyPwd = await bcrypt.compare(pwd, user.password);
      if (!verifyPwd) {
        throw new UnauthorizedException('Wrong Email or Password');
      }

      const payload = { sub: user.id, username: user.fullName };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      // Only store the refresh token in the database, not the access token
      await this.userService.updatePartial({
        email: user.email,
        refreshToken,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;

      return {
        user: result,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Wrong Email or Password');
    }
  }

  async logout(id: string, res: Response) {
    try {
      // Only clear the refresh token, no need to clear access token from DB
      await this.userService.updatePartialById({
        id,
        refreshToken: null,
      });

      // ✅ Xóa refresh_token trong cookie
      res.clearCookie('refresh_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      throw new Error('Logout failed');
    }
  }
}
