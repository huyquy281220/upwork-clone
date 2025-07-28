import { Prisma, ProposalStatus } from '@prisma/client';
import { buildDateFilter, buildSortByFilter, parseBudgetFilter } from '.';
import { cleanFilter } from '.';

type BuildFiltersParams = {
  freelancerId?: string;
  jobId?: string;
  searchQuery?: string;
  statusFilter?: string;
  dateFilter?: string;
  budgetFilter?: string;
  sortedBy?: string;
};

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

  const budget = parseBudgetFilter(budgetFilterCleaned);
  const orderBy = buildSortByFilter(sortedBy);
  const dateFilterCondition = buildDateFilter(dateFilterCleaned);

  const where: Prisma.ProposalWhereInput = {
    ...(freelancerId && { freelancerId }),
    ...(jobId && { jobId, status: ProposalStatus.PENDING }),
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
      createdAt: dateFilterCondition,
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
