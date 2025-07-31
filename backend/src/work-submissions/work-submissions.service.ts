import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from 'src/config/aws-s3.config';
import { CreateWorkSubmissionDto } from './dto/create-work-submissions.dto';
import { UpdateWorkSubmissionDto } from './dto/update-work-submissions.dto';

@Injectable()
export class WorkSubmissionsService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = `${Date.now()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        ACL: 'public-read',
        ContentType: file.mimetype,
      });

      await s3Client.send(command);

      const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      return {
        url: fileUrl,
        key: key,
        originalName: file.originalname,
        size: file.size,
      };
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async create(data: CreateWorkSubmissionDto, file?: Express.Multer.File) {
    try {
      let fileUrl = null;

      // Upload file if provided
      if (file) {
        const uploadResult = await this.uploadFile(file);
        fileUrl = uploadResult.url;
      }

      // Create work submission with file URL
      const workSubmission = await this.prisma.workSubmission.create({
        data: {
          ...data,
          fileUrl: fileUrl,
        },
        include: { workLog: true },
      });

      return workSubmission;
    } catch (error) {
      throw new BadRequestException(
        `Failed to create work submission: ${error.message}`,
      );
    }
  }

  async findAll() {
    try {
      const workSubmissions = await this.prisma.workSubmission.findMany({
        include: { workLog: true },
        orderBy: { createdAt: 'desc' },
      });

      return workSubmissions;
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch work submissions: ${error.message}`,
      );
    }
  }

  async findOne(id: string) {
    try {
      const workSubmission = await this.prisma.workSubmission.findUnique({
        where: { id },
        include: { workLog: true },
      });

      if (!workSubmission) {
        throw new NotFoundException(`Work submission with ID ${id} not found`);
      }

      return workSubmission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to fetch work submission: ${error.message}`,
      );
    }
  }

  async update(
    id: string,
    data: UpdateWorkSubmissionDto,
    file?: Express.Multer.File,
  ) {
    try {
      // Check if work submission exists
      const existingSubmission = await this.prisma.workSubmission.findUnique({
        where: { id },
      });

      if (!existingSubmission) {
        throw new NotFoundException(`Work submission with ID ${id} not found`);
      }

      let fileUrl = existingSubmission.fileUrl;

      // Upload new file if provided
      if (file) {
        const uploadResult = await this.uploadFile(file);
        fileUrl = uploadResult.url;
      }

      // Update work submission
      const updatedSubmission = await this.prisma.workSubmission.update({
        where: { id },
        data: {
          ...data,
          fileUrl: fileUrl,
        },
        include: { workLog: true },
      });

      return updatedSubmission;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to update work submission: ${error.message}`,
      );
    }
  }

  async remove(id: string) {
    try {
      // Check if work submission exists
      const existingSubmission = await this.prisma.workSubmission.findUnique({
        where: { id },
      });

      if (!existingSubmission) {
        throw new NotFoundException(`Work submission with ID ${id} not found`);
      }

      // Delete from database
      await this.prisma.workSubmission.delete({ where: { id } });

      return { message: 'Work submission deleted successfully' };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(
        `Failed to delete work submission: ${error.message}`,
      );
    }
  }
}
