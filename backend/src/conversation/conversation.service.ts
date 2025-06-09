import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { NotificationsService } from 'src/notifications/notifications.service';
import { Role } from '@prisma/client';

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

      // Validate job exists
      const job = await tx.job.findUnique({
        where: { id: data.jobId },
        include: { client: true },
      });
      if (!job) {
        throw new NotFoundException(`Job with ID ${data.jobId} not found`);
      }

      // Validate users exist and get their roles
      const users = await tx.user.findMany({
        where: { id: { in: data.participantIds } },
        include: {
          clientProfile: true,
          freelancerProfile: true,
        },
      });
      if (users.length !== 2) {
        throw new NotFoundException('Some users not found');
      }

      // Validate relationship: one must be client (job owner), one must be freelancer
      const client = users.find(
        (user) =>
          user.role === Role.CLIENT &&
          user.clientProfile?.userId === job.clientId,
      );
      const freelancer = users.find((user) => user.role === Role.FREELANCER);

      if (!client) {
        throw new BadRequestException(
          'One participant must be the client who owns this job',
        );
      }
      if (!freelancer) {
        throw new BadRequestException('One participant must be a freelancer');
      }

      // Check if freelancer has a proposal or contract for this job
      const hasProposal = await tx.proposal.findFirst({
        where: {
          jobId: data.jobId,
          freelancerId: freelancer.freelancerProfile?.userId,
        },
      });

      const hasContract = await tx.contract.findFirst({
        where: {
          jobId: data.jobId,
          freelancerId: freelancer.freelancerProfile?.userId,
        },
      });

      if (!hasProposal && !hasContract) {
        throw new BadRequestException(
          'Freelancer must have a proposal or contract for this job to start a conversation',
        );
      }

      const [participant1Id, participant2Id] = data.participantIds.sort();

      // Check if conversation already exists for this job and participants
      const existingConversation = await tx.conversation.findFirst({
        where: {
          jobId: data.jobId,
          OR: [
            { participant1Id, participant2Id },
            { participant1Id: participant2Id, participant2Id: participant1Id },
          ],
        },
        include: {
          participant1: { select: { id: true, fullName: true } },
          participant2: { select: { id: true, fullName: true } },
          job: { select: { id: true, title: true } },
        },
      });
      if (existingConversation) {
        throw new BadRequestException(
          `Conversation already exists for this job between these participants`,
        );
      }

      // Create conversation
      const conversation = await tx.conversation.create({
        data: {
          jobId: data.jobId,
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
          job: { select: { id: true, title: true, description: true } },
        },
      });
    });
  }

  async findAllConversations(params: {
    skip?: number;
    take?: number;
    userId: string;
    jobId?: string;
  }) {
    const { skip, take, userId, jobId } = params;

    // Check user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const whereClause: any = {
      OR: [{ participant1Id: userId }, { participant2Id: userId }],
    };

    if (jobId) {
      whereClause.jobId = jobId;
    }

    return this.prisma.conversation.findMany({
      skip,
      take,
      where: whereClause,
      include: {
        participant1: { select: { id: true, email: true, fullName: true } },
        participant2: { select: { id: true, email: true, fullName: true } },
        job: { select: { id: true, title: true, description: true } },
        messages: {
          select: {
            id: true,
            content: true,
            sentAt: true,
            isRead: true,
            sender: { select: { id: true, fullName: true } },
          },
          orderBy: { sentAt: 'desc' },
          take: 1, // Get latest message
        },
        _count: {
          select: {
            messages: {
              where: {
                senderId: { not: userId },
                isRead: false,
              },
            },
          },
        },
      },
      orderBy: { updatedAt: 'desc' },
    });
  }

  async findOneConversation(
    id: string,
    userId: string,
    page: number = 1,
    limit: number = 50,
  ) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id },
      include: {
        participant1: { select: { id: true, email: true, fullName: true } },
        participant2: { select: { id: true, email: true, fullName: true } },
        job: { select: { id: true, title: true, description: true } },
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

    // Get paginated messages
    const skip = (page - 1) * limit;
    const messages = await this.prisma.message.findMany({
      where: { conversationId: id },
      select: {
        id: true,
        senderId: true,
        content: true,
        isRead: true,
        readAt: true,
        deliveredAt: true,
        sentAt: true,
        sender: { select: { id: true, email: true, fullName: true } },
      },
      orderBy: { sentAt: 'desc' },
      skip,
      take: limit,
    });

    // Get total message count for pagination
    const totalMessages = await this.prisma.message.count({
      where: { conversationId: id },
    });

    const totalPages = Math.ceil(totalMessages / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    return {
      ...conversation,
      messages: messages.reverse(), // Reverse to show oldest first
      pagination: {
        currentPage: page,
        totalPages,
        totalMessages,
        hasNextPage,
        hasPreviousPage,
        limit,
      },
    };
  }

  async deleteConversation(id: string, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const conversation = await tx.conversation.findUnique({
        where: { id },
        include: {
          participant1: { select: { id: true, fullName: true } },
          participant2: { select: { id: true, fullName: true } },
          job: { select: { id: true, title: true } },
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
