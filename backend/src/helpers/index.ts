import { Prisma } from '@prisma/client';
import { subDays } from 'date-fns';
import { startOfToday } from 'date-fns';

export function cleanFilter(value: string) {
  return value === 'all' ? '' : value;
}

export function parseBudgetFilter(budgetFilter: string) {
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

export function buildDateFilter(dateFilter: string) {
  const today = startOfToday();
  let dateFilterCondition;
  switch (dateFilter) {
    case 'today':
      dateFilterCondition = today;
      break;
    case 'week':
      dateFilterCondition = {
        gte: subDays(today, 7),
        lt: startOfToday(),
      };
      break;
    case 'month':
      dateFilterCondition = {
        gte: subDays(today, 30),
        lt: startOfToday(),
      };
      break;
    case 'quarter':
      dateFilterCondition = {
        gte: subDays(today, 90),
        lt: startOfToday(),
      };
      break;
    default:
      dateFilterCondition = null;
  }

  return dateFilterCondition;
}

export function buildSortByFilter(sortedBy: string) {
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

  return orderBy;
}
