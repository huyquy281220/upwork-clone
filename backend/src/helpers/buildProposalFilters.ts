import { Prisma, ProposalStatus } from '@prisma/client';
import { subDays, startOfToday } from 'date-fns';

interface BuildFiltersParams {
  freelancerId?: string;
  jobId?: string;
  searchQuery?: string;
  statusFilter?: string;
  dateFilter?: string;
  budgetFilter?: string;
  sortedBy?: string;
}

export function buildProposalFilters({
  freelancerId,
  jobId,
  searchQuery,
  statusFilter,
  dateFilter,
  budgetFilter,
  sortedBy,
}: BuildFiltersParams): {
  where: Prisma.ProposalWhereInput;
  orderBy: Prisma.ProposalOrderByWithRelationInput[];
} {
  const statusFilterCleaned = cleanFilter(statusFilter);
  const dateFilterCleaned = cleanFilter(dateFilter);
  const budgetFilterCleaned = cleanFilter(budgetFilter);

  const today = startOfToday();
  const budget = parseBudgetFilter(budgetFilterCleaned);

  let dateFilterCondition;
  switch (dateFilterCleaned) {
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
      break;
    case 'oldest':
      orderBy = [{ createdAt: 'asc' }];
      break;
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
      break;
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
      break;
    case 'rate-highest':
      orderBy = [
        {
          pricing: 'desc',
        },
      ];
      break;
    case 'rate-lowest':
      orderBy = [
        {
          pricing: 'asc',
        },
      ];
      break;
    default:
      break;
  }

  const where: Prisma.ProposalWhereInput = {
    ...(freelancerId && { freelancerId }),
    ...(jobId && { jobId }),
    ...(searchQuery && {
      job: {
        title: {
          contains: searchQuery,
          mode: 'insensitive',
        },
      },
    }),
    ...(statusFilter && {
      status: statusFilterCleaned
        ? (statusFilterCleaned.toUpperCase() as ProposalStatus)
        : undefined,
    }),
    ...(dateFilterCondition && {
      createdAt: {
        gte: dateFilterCondition,
      },
    }),
  };

  if (budget) {
    where.OR = [
      {
        job: {
          fixedPrice: {
            gte: budget.min,
            lte: budget.max !== Infinity ? budget.max : undefined,
          },
        },
      },
      {
        job: {
          hourlyRateMin: {
            gte: budget.min,
          },
          ...(budget.max !== Infinity && {
            hourlyRateMax: {
              lte: budget.max,
            },
          }),
        },
      },
    ];
  }

  return { where, orderBy };
}

function cleanFilter(value: string) {
  return value === 'all' ? undefined : value;
}

function parseBudgetFilter(budgetFilter: string) {
  switch (budgetFilter) {
    case 'under-1k':
      return { min: 0, max: 1000 };
    case '1k-5k':
      return { min: 1000, max: 5000 };
    case '5k-10k':
      return { min: 5000, max: 10000 };
    case 'over-10k':
      return { min: 10000, max: Infinity };
    default:
      return null;
  }
}
