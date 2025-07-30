import { Module } from '@nestjs/common';
import { WorkSubmissionsService } from './work-submissions.service';
import { WorkSubmissionsController } from './work-submissions.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MulterModule } from '@nestjs/platform-express';
import { s3Client } from 'src/config/aws-s3.config';
import { multerS3 } from 'multer-s3';

@Module({
  imports: [
    PrismaModule,
    MulterModule.register({
      storage: multerS3({
        s3: s3Client,
        bucket: process.env.AWS_S3_BUCKET_NAME!,
        acl: 'public-read',
        key: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
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
