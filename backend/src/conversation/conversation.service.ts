import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ConversationsService {
  constructor(
    private prisma: PrismaService,
    private notificationsService: NotificationsService,
  ) {}

  async createConversation(data: CreateConversationDto, currentUserId: string) {
    return this.prisma.$transaction(async (tx) => {
      if (data.participantIds.length !== 2) {
        throw new BadRequestException(
          'Conversation must have exactly 2 participants',
        );
      }

      // Ensure current user is one of the participants
      if (!data.participantIds.includes(currentUserId)) {
        throw new BadRequestException(
          'You must be one of the conversation participants',
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

      // Create notification for participants using notifications service
      await this.notificationsService.notifyConversationCreated(
        data.participantIds,
        conversation.id,
        tx,
      );

      return tx.conversation.findUnique({
        where: { id: conversation.id },
        include: {
          participant1: { select: { id: true, email: true, fullName: true } },
          participant2: { select: { id: true, email: true, fullName: true } },
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
        participant1: { select: { id: true, email: true, fullName: true } },
        participant2: { select: { id: true, email: true, fullName: true } },
        messages: {
          select: {
            id: true,
            content: true,
            sentAt: true,
            sender: { select: { id: true, fullName: true } },
          },
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
        participant1: { select: { id: true, email: true, fullName: true } },
        participant2: { select: { id: true, email: true, fullName: true } },
        messages: {
          select: {
            id: true,
            senderId: true,
            content: true,
            isRead: true,
            sentAt: true,
            sender: { select: { id: true, email: true, fullName: true } },
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
        'You are not a participant in this conversation',
      );
    }

    return conversation;
  }

  async deleteConversation(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findUnique({
        where: { id },
        include: {
          participant1: { select: { id: true, fullName: true } },
          participant2: { select: { id: true, fullName: true } },
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
          'You are not a participant in this conversation',
        );
      }

      // Delete conversation (messages will auto-delete due to onDelete: Cascade)
      await tx.conversation.delete({ where: { id } });

      // Create notification for other participant using notifications service
      const otherParticipantId = participantIds.find((pid) => pid !== userId);
      if (otherParticipantId) {
        await this.notificationsService.notifyConversationDeleted(
          otherParticipantId,
          id,
          tx,
        );
      }

      return { message: `Conversation ${id} deleted successfully` };
    });
  }
}
