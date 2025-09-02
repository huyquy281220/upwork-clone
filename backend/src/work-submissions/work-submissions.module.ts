import { Module } from '@nestjs/common';
import { WorkSubmissionsService } from './work-submissions.service';
import { WorkSubmissionsController } from './work-submissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { SocketModule } from 'src/socket/socket.module';

@Module({
  imports: [
    PrismaModule,
    NotificationsModule,
    SocketModule,
    MulterModule.register({
      storage: memoryStorage(), // Store file in memory instead of S3
      limits: {
        fileSize: 10 * 1024 * 1024, // 10MB
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(zip|rar|7z)$/)) {
          return cb(new Error('Only archive files allowed!'), false);
        }
        cb(null, true);
      },
    }),
  ],
  controllers: [WorkSubmissionsController],
  providers: [WorkSubmissionsService],
})
export class WorkSubmissionsModule {}
