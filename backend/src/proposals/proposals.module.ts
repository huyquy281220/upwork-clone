import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProposalsController } from './proposals.controller';
import { ProposalsService } from './proposals.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const originalName = file.originalname.replace(/\s+/g, '_'); // replace space = "_"
          cb(null, originalName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.pdf$/)) {
          return cb(new Error('Only PDF files are allowed!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 2 * 1024 * 1024, // 2MB
      },
    }),
    SocketModule,
  ],
  controllers: [ProposalsController],
  providers: [ProposalsService],
})
export class ProposalsModule {}
