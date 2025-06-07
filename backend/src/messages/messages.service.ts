import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async createMessage(senderId: string, data: CreateMessageDto) {
    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findUnique({
        where: { id: data.conversationId },
        include: { participant1: true, participant2: true },
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

      // Create message
      const message = await tx.message.create({
        data: {
          conversationId: data.conversationId,
          senderId,
          recipientId,
          content: data.content,
          isRead: false,
        },
      });

      // Create notification for other participants
      const otherParticipants = participantIds.filter((id) => id !== senderId);
      if (otherParticipants.length > 0) {
        await tx.notification.createMany({
          data: otherParticipants.map((userId) => ({
            userId,
            content: `New message in conversation ${conversation.id} from user ${senderId}`,
          })),
        });
      }

      // Update conversation updatedAt
      await tx.conversation.update({
        where: { id: data.conversationId },
        data: { updatedAt: new Date() },
      });

      return tx.message.findUnique({
        where: { id: message.id },
        include: {
          sender: { select: { id: true, email: true } },
          conversation: { select: { id: true } },
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

    return this.prisma.message.findMany({
      skip,
      take,
      where,
      include: {
        sender: { select: { id: true, email: true } },
        conversation: { select: { id: true } },
      },
      orderBy: { sentAt: 'asc' },
    });
  }

  async findOneMessage(id: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: { select: { id: true, email: true } },
        conversation: {
          select: { id: true, participant1: true, participant2: true },
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
        data: { isRead: true },
        include: {
          sender: { select: { id: true, email: true } },
          conversation: { select: { id: true } },
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
      await tx.message.updateMany({
        where: {
          conversationId,
          senderId: { not: userId },
          isRead: false,
        },
        data: { isRead: true },
      });

      // Return updated message list
      return tx.message.findMany({
        where: { conversationId },
        include: {
          sender: { select: { id: true, email: true } },
          conversation: { select: { id: true } },
        },
        orderBy: { sentAt: 'asc' },
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
}
