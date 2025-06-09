import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageStatusDto } from './dto/update-message-status.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class MessagesService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async createMessage(senderId: string, data: CreateMessageDto) {
    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findUnique({
        where: { id: data.conversationId },
        include: {
          participant1: { select: { id: true, fullName: true } },
          participant2: { select: { id: true, fullName: true } },
          job: { select: { id: true, title: true } },
        },
      });
      if (!conversation) {
        throw new NotFoundException(
          `Conversation with ID ${data.conversationId} not found`,
        );
      }
      const participantIds = [
        conversation.participant1Id,
        conversation.participant2Id,
      ];
      if (!participantIds.includes(senderId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }

      // Get recipient ID (the other participant)
      const recipientId = participantIds.find((id) => id !== senderId);

      // Create message with delivery timestamp
      const message = await tx.message.create({
        data: {
          conversationId: data.conversationId,
          senderId,
          recipientId,
          content: data.content,
          isRead: false,
          deliveredAt: new Date(), // Mark as delivered immediately
        },
      });

      // Create notification for recipient using notifications service
      if (recipientId) {
        const senderName =
          senderId === conversation.participant1Id
            ? conversation.participant1.fullName || 'User'
            : conversation.participant2.fullName || 'User';

        await this.notificationsService.notifyNewMessage(
          recipientId,
          senderName,
          tx,
        );
      }

      // Update conversation updatedAt
      await tx.conversation.update({
        where: { id: data.conversationId },
        data: { updatedAt: new Date() },
      });

      return tx.message.findUnique({
        where: { id: message.id },
        include: {
          sender: { select: { id: true, email: true, fullName: true } },
          conversation: {
            select: {
              id: true,
              job: { select: { id: true, title: true } },
            },
          },
        },
      });
    });
  }

  async findAllMessages(params: {
    skip?: number;
    take?: number;
    conversationId: string;
    userId: string;
    isRead?: boolean;
  }) {
    const { skip, take, conversationId, userId, isRead } = params;

    // Check conversation and access
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participant1: true, participant2: true },
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`,
      );
    }
    const participantIds = [
      conversation.participant1Id,
      conversation.participant2Id,
    ];
    if (!participantIds.includes(userId)) {
      throw new BadRequestException(
        'User is not a participant in this conversation',
      );
    }

    const where: Prisma.MessageWhereInput = { conversationId };
    if (isRead !== undefined) where.isRead = isRead;

    const messages = await this.prisma.message.findMany({
      skip,
      take,
      where,
      include: {
        sender: { select: { id: true, email: true, fullName: true } },
        conversation: {
          select: {
            id: true,
            job: { select: { id: true, title: true } },
          },
        },
      },
      orderBy: { sentAt: 'asc' },
    });

    // Get total count for pagination
    const totalCount = await this.prisma.message.count({ where });

    return {
      messages,
      pagination: {
        total: totalCount,
        skip: skip || 0,
        take: take || totalCount,
      },
    };
  }

  async findOneMessage(id: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: { select: { id: true, email: true, fullName: true } },
        conversation: {
          select: {
            id: true,
            participant1: true,
            participant2: true,
            job: { select: { id: true, title: true } },
          },
        },
      },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    const participantIds = [
      message.conversation.participant1.id,
      message.conversation.participant2.id,
    ];
    if (!participantIds.includes(userId)) {
      throw new BadRequestException(
        'User is not a participant in this conversation',
      );
    }

    return message;
  }

  async markAsRead(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Check message and access
      const message = await tx.message.findUnique({
        where: { id },
        include: {
          conversation: {
            select: { participant1: true, participant2: true },
          },
        },
      });
      if (!message) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }
      const participantIds = [
        message.conversation.participant1.id,
        message.conversation.participant2.id,
      ];
      if (!participantIds.includes(userId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }
      if (message.senderId === userId) {
        throw new BadRequestException(
          'Sender cannot mark their own message as read',
        );
      }
      if (message.isRead) {
        throw new BadRequestException('Message is already read');
      }

      // Update status
      return tx.message.update({
        where: { id },
        data: {
          isRead: true,
          readAt: new Date(),
        },
        include: {
          sender: { select: { id: true, email: true, fullName: true } },
          conversation: {
            select: {
              id: true,
              job: { select: { id: true, title: true } },
            },
          },
        },
      });
    });
  }

  async markAllAsRead(conversationId: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Check conversation and access
      const conversation = await tx.conversation.findUnique({
        where: { id: conversationId },
        include: { participant1: true, participant2: true },
      });
      if (!conversation) {
        throw new NotFoundException(
          `Conversation with ID ${conversationId} not found`,
        );
      }
      const participantIds = [
        conversation.participant1.id,
        conversation.participant2.id,
      ];
      if (!participantIds.includes(userId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }

      // Update all unread messages from other senders
      const updateResult = await tx.message.updateMany({
        where: {
          conversationId,
          senderId: { not: userId },
          isRead: false,
        },
        data: {
          isRead: true,
          readAt: new Date(),
        },
      });

      // Return updated message list
      const messages = await tx.message.findMany({
        where: { conversationId },
        include: {
          sender: { select: { id: true, email: true, fullName: true } },
          conversation: {
            select: {
              id: true,
              job: { select: { id: true, title: true } },
            },
          },
        },
        orderBy: { sentAt: 'asc' },
      });

      return {
        updatedCount: updateResult.count,
        messages,
      };
    });
  }

  async updateMessageStatus(
    id: string,
    userId: string,
    data: UpdateMessageStatusDto,
  ) {
    return this.prisma.$transaction(async (tx) => {
      // Check message and access
      const message = await tx.message.findUnique({
        where: { id },
        include: {
          conversation: {
            select: { participant1: true, participant2: true },
          },
        },
      });
      if (!message) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }
      const participantIds = [
        message.conversation.participant1.id,
        message.conversation.participant2.id,
      ];
      if (!participantIds.includes(userId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }

      // Only recipient can mark as read, but sender can update delivery status
      if (data.isRead !== undefined || data.readAt !== undefined) {
        if (message.senderId === userId) {
          throw new BadRequestException(
            'Sender cannot mark their own message as read',
          );
        }
      }

      const updateData: any = {};
      if (data.isRead !== undefined) updateData.isRead = data.isRead;
      if (data.readAt !== undefined) updateData.readAt = new Date(data.readAt);
      if (data.deliveredAt !== undefined)
        updateData.deliveredAt = new Date(data.deliveredAt);

      // Auto-set readAt when marking as read
      if (data.isRead === true && !data.readAt) {
        updateData.readAt = new Date();
      }

      return tx.message.update({
        where: { id },
        data: updateData,
        include: {
          sender: { select: { id: true, email: true, fullName: true } },
          conversation: {
            select: {
              id: true,
              job: { select: { id: true, title: true } },
            },
          },
        },
      });
    });
  }

  async deleteMessage(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Check message and ownership
      const message = await tx.message.findUnique({
        where: { id },
        include: {
          conversation: {
            select: { participant1: true, participant2: true },
          },
        },
      });
      if (!message) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }
      const participantIds = [
        message.conversation.participant1.id,
        message.conversation.participant2.id,
      ];
      if (!participantIds.includes(userId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }
      if (message.senderId !== userId) {
        throw new BadRequestException('User is not the sender of this message');
      }

      // Delete message
      await tx.message.delete({ where: { id } });

      return { message: `Message ${id} deleted successfully` };
    });
  }

  // New method to get unread message count for a user
  async getUnreadMessageCount(userId: string, conversationId?: string) {
    const where: Prisma.MessageWhereInput = {
      recipientId: userId,
      isRead: false,
    };

    if (conversationId) {
      where.conversationId = conversationId;
    }

    return this.prisma.message.count({ where });
  }

  // New method to get message statistics
  async getMessageStats(conversationId: string, userId: string) {
    // Check conversation access
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participant1: true, participant2: true },
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`,
      );
    }
    const participantIds = [
      conversation.participant1.id,
      conversation.participant2.id,
    ];
    if (!participantIds.includes(userId)) {
      throw new BadRequestException(
        'User is not a participant in this conversation',
      );
    }

    const [totalMessages, unreadMessages, sentMessages, receivedMessages] =
      await Promise.all([
        this.prisma.message.count({ where: { conversationId } }),
        this.prisma.message.count({
          where: {
            conversationId,
            recipientId: userId,
            isRead: false,
          },
        }),
        this.prisma.message.count({
          where: {
            conversationId,
            senderId: userId,
          },
        }),
        this.prisma.message.count({
          where: {
            conversationId,
            recipientId: userId,
          },
        }),
      ]);

    return {
      totalMessages,
      unreadMessages,
      sentMessages,
      receivedMessages,
    };
  }
}
