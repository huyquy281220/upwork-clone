import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Transporter, createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PWD,
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    try {
      const verificationLink = `http://localhost:3001/verify-email?token=${token}`;

      await this.transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: 'xaolozcongtu3@gmail.com',
        subject: 'Xác thực tài khoản',
        text: `Nhấn vào liên kết sau để xác thực tài khoản: ${verificationLink}`,
        html: `<p>Nhấn vào liên kết sau để xác thực tài khoản:</p>
               <a href="${verificationLink}">${verificationLink}</a>`,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Can not send email.');
    }
  }
}
