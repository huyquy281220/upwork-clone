import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationType, Prisma } from '@prisma/client';
import { CreateNotificationDto } from './dto/create-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(private prisma: PrismaService) {}

  async createNotification(data: CreateNotificationDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    // Create notification
    return this.prisma.notification.create({
      data: {
        userId: data.userId,
        content: data.content,
        isRead: false,
        type: data.type as NotificationType,
        itemId: data.itemId,
      },
      include: {
        user: { select: { fullName: true, email: true } },
      },
    });
  }

  // Contract-specific notification methods
  async notifyContractCreated(
    freelancerId: string,
    jobTitle: string,
    type: NotificationType,
    tx?: any,
  ) {
    const prisma = tx || this.prisma;
    return prisma.notification.create({
      data: {
        userId: freelancerId,
        content: `You have been hired for the job "${jobTitle}"`,
        isRead: false,
        type: type,
      },
    });
  }

  async notifyContractCompleted(
    freelancerId: string,
    jobTitle: string,
    tx?: any,
  ) {
    const prisma = tx || this.prisma;
    return prisma.notification.create({
      data: {
        userId: freelancerId,
        content: `Contract for job "${jobTitle}" has been completed`,
        isRead: false,
        type: NotificationType.CONTRACT_COMPLETED,
      },
    });
  }

  async notifyContractCancelled(
    freelancerId: string,
    jobTitle: string,
    tx?: any,
  ) {
    const prisma = tx || this.prisma;
    return prisma.notification.create({
      data: {
        userId: freelancerId,
        content: `Contract for job "${jobTitle}" has been cancelled`,
        isRead: false,
        type: NotificationType.CONTRACT_CANCELLED,
      },
    });
  }

  // async notifyContractUpdated(
  //   freelancerId: string,
  //   jobTitle: string,
  //   newStatus: string,
  //   tx?: any,
  // ) {
  //   const prisma = tx || this.prisma;
  //   return prisma.notification.create({
  //     data: {
  //       userId: freelancerId,
  //       content: `Contract for job "${jobTitle}" has been updated to ${newStatus}`,
  //       isRead: false,
  //     },
  //   });
  // }

  // Conversation-specific notification methods
  async notifyConversationCreated(
    participantIds: string[],
    conversationId: string,
    tx?: any,
  ) {
    const prisma = tx || this.prisma;
    return prisma.notification.createMany({
      data: participantIds.map((userId) => ({
        userId,
        content: `You have been added to a new conversation`,
        isRead: false,
      })),
    });
  }

  async notifyConversationDeleted(
    userId: string,
    conversationId: string,
    tx?: any,
  ) {
    const prisma = tx || this.prisma;
    return prisma.notification.create({
      data: {
        userId,
        content: `A conversation has been deleted`,
        isRead: false,
      },
    });
  }

  async notifyNewMessage(recipientId: string, senderName: string, tx?: any) {
    const prisma = tx || this.prisma;
    return prisma.notification.create({
      data: {
        userId: recipientId,
        content: `You have a new message from ${senderName}`,
        isRead: false,
      },
    });
  }

  async findAllNotifications(params: {
    limit?: number;
    page?: number;
    userId: string;
    isRead?: boolean;
  }) {
    const { limit, page, userId, isRead } = params;

    // Check if user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const where: Prisma.NotificationWhereInput = { userId };
    if (isRead !== undefined) where.isRead = isRead;

    return this.prisma.notification.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
      include: {
        user: { select: { id: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findNotificationsOfUser(userId: string) {
    const notifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },
    });

    return notifications;
  }

  async markAsRead(id: string, userId: string) {
    try {
      // Check if notification and ownership
      const notification = await this.prisma.notification.findUnique({
        where: { id },
      });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }
      if (notification.userId !== userId) {
        throw new BadRequestException('User does not own this notification');
      }
      if (notification.isRead) {
        return notification;
      }

      // Update status
      return await this.prisma.notification.update({
        where: { id },
        data: { isRead: true },
        include: {
          user: { select: { id: true, email: true } },
        },
      });
    } catch (error) {
      // Optionally log or handle error
      throw error;
    }
  }

  async markAllAsRead(userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Update all unread notifications
      await tx.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });

      // Return updated notifications
      return tx.notification.findMany({
        where: { userId },
        include: {
          user: { select: { id: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      });
    });
  }

  async deleteNotification(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const notification = await tx.notification.findUnique({ where: { id } });
      if (!notification) {
        throw new NotFoundException(`Notification with ID ${id} not found`);
      }
      if (notification.userId !== userId) {
        throw new BadRequestException('User does not own this notification');
      }

      // Delete notification
      await tx.notification.delete({ where: { id } });

      return { message: `Notification ${id} deleted successfully` };
    });
  }

  async deleteAllNotifications(userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }

      // Delete all notifications
      await tx.notification.deleteMany({ where: { userId } });

      return {
        message: `All notifications for user ${userId} deleted successfully`,
      };
    });
  }
}
