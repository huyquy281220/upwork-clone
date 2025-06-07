import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(private prisma: PrismaService) {}

  async createConversation(data: CreateConversationDto) {
    return this.prisma.$transaction(async (tx) => {
      if (data.participantIds.length !== 2) {
        throw new BadRequestException(
          'Conversation must have exactly 2 participants',
        );
      }

      const users = await tx.user.findMany({
        where: { id: { in: data.participantIds } },
      });
      if (users.length !== 2) {
        throw new NotFoundException('Some users not found');
      }

      const [participant1Id, participant2Id] = data.participantIds.sort();

      // Check if conversation already exists with same participants
      const existingConversation = await tx.conversation.findFirst({
        where: {
          OR: [
            { participant1Id, participant2Id },
            { participant1Id: participant2Id, participant2Id: participant1Id },
          ],
        },
        include: { participant1: true, participant2: true },
      });
      if (existingConversation) {
        throw new BadRequestException(
          'Conversation with these participants already exists',
        );
      }

      // Create conversation
      const conversation = await tx.conversation.create({
        data: {
          participant1Id,
          participant2Id,
        },
      });

      // Create notification for participants
      await tx.notification.createMany({
        data: data.participantIds.map((userId) => ({
          userId,
          content: `You have been added to a new conversation ${conversation.id}`,
        })),
      });

      return tx.conversation.findUnique({
        where: { id: conversation.id },
        include: {
          participant1: { select: { id: true, email: true } },
          participant2: { select: { id: true, email: true } },
        },
      });
    });
  }

  async findAllConversations(params: {
    skip?: number;
    take?: number;
    userId: string;
  }) {
    const { skip, take, userId } = params;

    // Check user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.conversation.findMany({
      skip,
      take,
      where: {
        OR: [{ participant1Id: userId }, { participant2Id: userId }],
      },
      include: {
        participant1: { select: { id: true, email: true } },
        participant2: { select: { id: true, email: true } },
        messages: {
          select: { id: true, content: true, sentAt: true },
          orderBy: { sentAt: 'desc' },
          take: 1, // Get latest message
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOneConversation(id: string, userId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participant1: { select: { id: true, email: true } },
        participant2: { select: { id: true, email: true } },
        messages: {
          select: {
            id: true,
            senderId: true,
            content: true,
            isRead: true,
            sentAt: true,
            sender: { select: { id: true, email: true } },
          },
          orderBy: { sentAt: 'asc' },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
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

    return conversation;
  }

  async deleteConversation(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findUnique({
        where: { id },
        include: { participant1: true, participant2: true },
      });
      if (!conversation) {
        throw new NotFoundException(`Conversation with ID ${id} not found`);
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

      // Delete conversation (messages will auto-delete due to onDelete: Cascade)
      await tx.conversation.delete({ where: { id } });

      // Create notification for other participant
      const otherParticipantId = participantIds.find((pid) => pid !== userId);
      if (otherParticipantId) {
        await tx.notification.create({
          data: {
            userId: otherParticipantId,
            content: `Conversation ${id} has been deleted`,
          },
        });
      }

      return { message: `Conversation ${id} deleted successfully` };
    });
  }
}
