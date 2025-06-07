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

  /**
   * Gửi một message mới trong conversation
   */
  async createMessage(senderId: string, data: CreateMessageDto) {
    return this.prisma.$transaction(async (tx) => {
      // Kiểm tra conversation và quyền truy cập
      const conversation = await tx.conversation.findUnique({
        where: { id: data.conversationId },
        include: { participants: true },
      });
      if (!conversation) {
        throw new NotFoundException(
          `Conversation with ID ${data.conversationId} not found`,
        );
      }
      const participantIds = conversation.participants.map((p) => p.userId);
      if (!participantIds.includes(senderId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }

      // Tạo message
      const message = await tx.message.create({
        data: {
          conversationId: data.conversationId,
          senderId,
          content: data.content,
          isRead: false,
        },
      });

      // Tạo notification cho các participant khác
      const otherParticipants = participantIds.filter((id) => id !== senderId);
      if (otherParticipants.length > 0) {
        await tx.notification.createMany({
          data: otherParticipants.map((userId) => ({
            userId,
            content: `New message in conversation ${conversation.id} from user ${senderId}`,
          })),
        });
      }

      // Cập nhật updatedAt của conversation
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

  /**
   * Lấy danh sách message trong một conversation
   */
  async findAllMessages(params: {
    skip?: number;
    take?: number;
    conversationId: string;
    userId: string;
    isRead?: boolean;
  }) {
    const { skip, take, conversationId, userId, isRead } = params;

    // Kiểm tra conversation và quyền truy cập
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: { participants: true },
    });
    if (!conversation) {
      throw new NotFoundException(
        `Conversation with ID ${conversationId} not found`,
      );
    }
    const participantIds = conversation.participants.map((p) => p.userId);
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
      orderBy: { createdAt: 'asc' },
    });
  }

  /**
   * Lấy chi tiết một message
   */
  async findOneMessage(id: string, userId: string) {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: { select: { id: true, email: true } },
        conversation: {
          select: { id: true, participants: { select: { userId: true } } },
        },
      },
    });

    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    const participantIds = message.conversation.participants.map(
      (p) => p.userId,
    );
    if (!participantIds.includes(userId)) {
      throw new BadRequestException(
        'User is not a participant in this conversation',
      );
    }

    return message;
  }

  /**
   * Đánh dấu một message là đã đọc
   */
  async markAsRead(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Kiểm tra message và quyền truy cập
      const message = await tx.message.findUnique({
        where: { id },
        include: {
          conversation: {
            select: { participants: { select: { userId: true } } },
          },
        },
      });
      if (!message) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }
      const participantIds = message.conversation.participants.map(
        (p) => p.userId,
      );
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

      // Cập nhật trạng thái
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

  /**
   * Đánh dấu tất cả message chưa đọc trong conversation là đã đọc
   */
  async markAllAsRead(conversationId: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Kiểm tra conversation và quyền truy cập
      const conversation = await tx.conversation.findUnique({
        where: { id: conversationId },
        include: { participants: true },
      });
      if (!conversation) {
        throw new NotFoundException(
          `Conversation with ID ${conversationId} not found`,
        );
      }
      const participantIds = conversation.participants.map((p) => p.userId);
      if (!participantIds.includes(userId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }

      // Cập nhật tất cả message chưa đọc của các sender khác
      await tx.message.updateMany({
        where: {
          conversationId,
          senderId: { not: userId },
          isRead: false,
        },
        data: { isRead: true },
      });

      // Trả về danh sách message đã cập nhật
      return tx.message.findMany({
        where: { conversationId },
        include: {
          sender: { select: { id: true, email: true } },
          conversation: { select: { id: true } },
        },
        orderBy: { createdAt: 'asc' },
      });
    });
  }

  /**
   * Xóa một message
   */
  async deleteMessage(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      // Kiểm tra message và quyền sở hữu
      const message = await tx.message.findUnique({
        where: { id },
        include: {
          conversation: {
            select: { participants: { select: { userId: true } } },
          },
        },
      });
      if (!message) {
        throw new NotFoundException(`Message with ID ${id} not found`);
      }
      const participantIds = message.conversation.participants.map(
        (p) => p.userId,
      );
      if (!participantIds.includes(userId)) {
        throw new BadRequestException(
          'User is not a participant in this conversation',
        );
      }
      if (message.senderId !== userId) {
        throw new BadRequestException('User is not the sender of this message');
      }

      // Xóa message
      await tx.message.delete({ where: { id } });

      return { message: `Message ${id} deleted successfully` };
    });
  }
}
