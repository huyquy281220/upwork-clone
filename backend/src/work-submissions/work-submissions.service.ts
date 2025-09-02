import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from 'src/config/aws-s3.config';
import { CreateWorkSubmissionDto } from './dto/create-work-submissions.dto';
import { UpdateWorkSubmissionDto } from './dto/update-work-submissions.dto';
import { Express } from 'express';
import { NotificationType } from '@prisma/client';
import { NotificationsGateway } from 'src/socket/socket.gateway';

@Injectable()
export class WorkSubmissionsService {
  constructor(
    private prisma: PrismaService,
    private readonly notificationGateway: NotificationsGateway,
  ) {}

  async getDownloadUrl(fileKey: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: fileKey,
    });

    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }

  async uploadFile(file: Express.Multer.File) {
    try {
      const key = `${Date.now()}-${file.originalname}`;

      const command = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME!,
        Key: key,
        Body: file.buffer,
        // ACL: 'public-read',
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
    let fileUrl = null;
    let fileName = null;
    let fileSize = null;
    let fileKey = null;
    // Upload file if provided
    if (file) {
      const uploadResult = await this.uploadFile(file);
      fileUrl = uploadResult.url;
      fileName = uploadResult.originalName;
      fileSize = uploadResult.size;
      fileKey = uploadResult.key;
    }

    if (!!data.workLogId === !!data.milestoneId) {
      throw new BadRequestException(
        'Provide either workLogId or milestoneId, not both.',
      );
    }

    const contract = await this.prisma.contract.findUnique({
      where: { id: data.contractId },
      include: { client: true },
    });

    if (!contract) {
      throw new NotFoundException(
        `Contract with ID ${data.contractId} not found`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      if (data.workLogId) {
        const wl = await tx.workLog.findUnique({
          where: { id: data.workLogId },
        });
        if (!wl) throw new BadRequestException('Invalid workLogId');
      } else {
        const ms = await tx.milestone.findUnique({
          where: { id: data.milestoneId! },
        });
        if (!ms) throw new BadRequestException('Invalid milestoneId');
      }

      const workSubmission = await tx.workSubmission.create({
        data: {
          title: data.title,
          description: data.description,
          contractId: data.contractId,
          workLogId: data.workLogId || null,
          milestoneId: data.milestoneId || null,
          fileUrl: fileUrl,
          fileName: fileName,
          fileSize: fileSize,
          fileKey: fileKey,
        },
      });

      const notification = await tx.notification.create({
        data: {
          userId: contract.client.userId,
          content: `A freelancer has submitted a work submission to your job "${data.title}"`,
          type: NotificationType.WORK_SUBMISSION,
          itemId: workSubmission.id,
        },
      });

      this.notificationGateway.sendNotificationToUser(
        contract.client.userId,
        notification,
      );

      return workSubmission;
    });

    // try {
    //   let fileUrl = null;
    //   let fileName = null;
    //   let fileSize = null;
    //   let fileKey = null;
    //   // Upload file if provided
    //   if (file) {
    //     const uploadResult = await this.uploadFile(file);
    //     fileUrl = uploadResult.url;
    //     fileName = uploadResult.originalName;
    //     fileSize = uploadResult.size;
    //     fileKey = uploadResult.key;
    //   }
    //   // Create work submission with file URL
    //   const workSubmission = await this.prisma.workSubmission.create({
    //     data: {
    //       title: data.title,
    //       description: data.description,
    //       contractId: data.contractId,
    //       workLogId: data.workLogId || null,
    //       milestoneId: data.milestoneId || null,
    //       fileUrl: fileUrl,
    //       fileName: fileName,
    //       fileSize: fileSize,
    //       fileKey: fileKey,
    //     },
    //   });
    //   const contract = await this.prisma.contract.findUnique({
    //     where: { id: data.contractId },
    //     include: {
    //       client: true,
    //     },
    //   });
    //   const notification = await this.prisma.notification.create({
    //     data: {
    //       userId: contract.client.userId,
    //       content: `A freelancer has submitted a work submission to your job "${data.title}"`,
    //       type: NotificationType.WORK_SUBMISSION,
    //       itemId: workSubmission.id,
    //     },
    //   });
    //   this.notificationGateway.sendNotificationToUser(
    //     contract.client.userId,
    //     notification,
    //   );
    //   return workSubmission;
    // } catch (error) {
    //   console.log(error);
    //   throw new BadRequestException(
    //     `Failed to create work submission: ${error.message}`,
    //   );
    // }
  }

  async findByWorkLogIdAndContractId(workLogId: string, contractId: string) {
    try {
      const workSubmissions = await this.prisma.workSubmission.findMany({
        where: { workLogId, contractId },
        // include: { contract: true },
        orderBy: { createdAt: 'desc' },
      });

      return workSubmissions;
    } catch (error) {
      throw new BadRequestException(
        `Failed to fetch work submissions: ${error.message}`,
      );
    }
  }

  async findAllByContractId(contractId: string) {
    try {
      const workSubmissions = await this.prisma.workSubmission.findMany({
        where: { contractId },
        include: { contract: true },
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
        include: { contract: true },
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
        include: { contract: true },
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
