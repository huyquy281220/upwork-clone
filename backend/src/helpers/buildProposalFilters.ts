import { Prisma, ProposalStatus } from '@prisma/client';
import { subDays, startOfToday } from 'date-fns';

interface BuildFiltersParams {
  freelancerId: string;
  searchQuery?: string;
  statusFilter?: string;
  dateFilter?: string;
  budget?: string;
  sortedBy?: string;
}

export function buildProposalFilters({
  freelancerId,
  searchQuery,
  statusFilter,
  dateFilter,
  budget,
  sortedBy,
}: BuildFiltersParams): {
  where: Prisma.ProposalWhereInput;
  orderBy: Prisma.ProposalOrderByWithRelationInput[];
} {
  const today = startOfToday();

  let dateFilterCondition;
  switch (dateFilter) {
    case 'today':
      dateFilterCondition = today;
      break;
    case 'week':
      dateFilterCondition = subDays(today, 7);
      break;
    case 'month':
      dateFilterCondition = subDays(today, 30);
      break;
    case 'quarter':
      dateFilterCondition = subDays(today, 90);
      break;
    default:
      dateFilterCondition = null;
  }

  let orderBy: Prisma.ProposalOrderByWithRelationInput[] = [
    { createdAt: 'desc' },
  ];

  switch (sortedBy) {
    case 'newest':
      orderBy = [{ createdAt: 'desc' }];
    case 'oldest':
      orderBy = [{ createdAt: 'asc' }];
    case 'highest':
      orderBy = [
        {
          job: {
            fixedPrice: 'desc',
          },
        },
        {
          job: {
            hourlyRateMax: 'desc',
          },
        },
      ];
    case 'lowest':
      orderBy = [
        {
          job: {
            fixedPrice: 'asc',
          },
        },
        {
          job: {
            hourlyRateMin: 'asc',
          },
        },
      ];
    default:
      break;
  }

  const where: Prisma.ProposalWhereInput = {
    freelancerId,
    ...(searchQuery && {
      title: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    }),
    ...(statusFilter && {
      status: statusFilter as ProposalStatus,
    }),
    ...(dateFilterCondition && {
      createdAt: {
        gte: dateFilterCondition,
      },
    }),
  };

  return { where, orderBy };
}
