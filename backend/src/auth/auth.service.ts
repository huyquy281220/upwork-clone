import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { Role } from '@prisma/client';

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

  async signIn(email: string, pwd: string) {
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

      const updatedUser = await this.userService.updatePartial({
        email: user.email,
        refreshToken,
      });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, verificationToken, ...result } = updatedUser;

      return {
        user: result,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Wrong Email or Password');
    }
  }

  async googleSignin(email: string, role: string, name: string) {
    try {
      // Check if user exists with this email
      let user;
      try {
        user = await this.userService.findOne(email);
      } catch (error) {
        // User doesn't exist, create a new one
        // Generate a random password for the user
        const randomPassword = Math.random().toString(36).slice(-10);

        user = await this.userService.create({
          email,
          fullName: name,
          password: randomPassword,
          address: '', // Required field but empty for Google users initially
          role: role as Role,
        });
      }

      // Generate tokens
      const payload = {
        sub: user.id,
        username: user.fullName,
        role: user.role,
      };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      // Store refresh token
      const updatedUser = await this.userService.updatePartial({
        email: user.email,
        refreshToken,
      });

      // Remove password from user object
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, verificationToken, ...result } = updatedUser;

      // Return user info and tokens
      return {
        user: result,
        accessToken,
        refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Google authentication failed');
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

  async refreshToken(req: Request, res: Response, email: string) {
    try {
      const refreshToken = req.cookies?.refresh_token;

      if (!refreshToken) {
        throw new BadRequestException('Refresh token not found');
      }

      const user = await this.userService.findOne(email);
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const payload = { sub: user.id, name: user.fullName };
      const newAccessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      throw new UnauthorizedException('Token refresh failed');
    }
  }
}
