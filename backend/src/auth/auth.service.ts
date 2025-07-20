import {
  BadRequestException,
  Injectable,
  NotFoundException,
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
    const user = await this.userService.findByEmail(email);
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
      const user = await this.userService.findByEmail(email);
      if (!user) {
        throw new UnauthorizedException('Wrong Email or Password');
      }

      const verifyPwd = await bcrypt.compare(pwd, user.password);
      if (!verifyPwd) {
        throw new UnauthorizedException('Wrong Email or Password');
      }

      const payload = { sub: user.email, username: user.fullName };

      const accessToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });

      const refreshToken = await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      const updatedUser = await this.userService.updatePartialById(user.id, {
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
    const existingUser = await this.userService.findByEmail(email);

    let user = existingUser;

    if (!existingUser) {
      if (!role) {
        throw new NotFoundException(
          'Account does not exist. Please sign up with role information.',
        );
      }

      const randomPassword = Math.random().toString(36).slice(-10);
      user = await this.userService.create({
        email,
        fullName: name,
        password: randomPassword,
        address: '',
        role: role as Role,
        verified: true,
      });
    }

    const payload = {
      sub: existingUser.email,
      username: existingUser.fullName,
      role: existingUser.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    const updatedUser = await this.userService.updatePartialById(
      existingUser.id,
      {
        refreshToken,
      },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, verificationToken, ...result } = updatedUser;

    return {
      user: result,
      accessToken,
      refreshToken,
    };
  }

  async signout(id: string, res: Response) {
    try {
      await this.userService.updatePartialById(id, {
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
      throw new Error('Signout failed');
    }
  }

  async refreshToken(req: Request, res: Response, email: string) {
    try {
      const refreshToken = req.cookies?.refresh_token;

      if (!refreshToken) {
        throw new BadRequestException('Refresh token not found');
      }

      const user = await this.userService.findByEmail(email);
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

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    try {
      const user = await this.userService.findByIdWithPassword(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isCurrentPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password,
      );
      if (!isCurrentPasswordValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }

      const saltRounds = 10;
      const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

      // Update password in database
      await this.userService.updatePartialById(userId, {
        password: hashedNewPassword,
      });

      return { message: 'Password changed successfully' };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to change password');
    }
  }
}
