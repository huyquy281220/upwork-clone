import { startOfToday } from 'date-fns';
import { buildDateFilter, buildSortByFilter, cleanFilter } from '.';
import { ContractStatus, ContractType, Prisma } from '@prisma/client';

type BuildFiltersParams = {
  freelancerId?: string;
  clientId?: string;
  status?: string;
  searchQuery?: string;
  type?: string;
  date?: string;
  sortedBy?: string;
};
export function buildContractsFilter({
  freelancerId,
  clientId,
  status,
  searchQuery,
  type,
  date,
  sortedBy,
}: BuildFiltersParams) {
  const statusFilterCleaned = cleanFilter(status);
  const dateFilterCleaned = cleanFilter(date);
  const typeFilterCleaned = cleanFilter(type);

  const dateFilterCondition = buildDateFilter(dateFilterCleaned);

  const orderBy = buildSortByFilter(sortedBy);

  const where: Prisma.ContractWhereInput = {
    ...(freelancerId && { freelancerId }),
    ...(clientId && { clientId }),
    ...(searchQuery && {
      title: {
        contains: searchQuery,
        mode: 'insensitive',
      },
    }),
    ...(status && {
      status: statusFilterCleaned
        ? (statusFilterCleaned.toUpperCase() as ContractStatus)
        : undefined,
    }),
    ...(dateFilterCondition && {
      createdAt: dateFilterCondition,
    }),
    ...(typeFilterCleaned && {
      type: typeFilterCleaned.toUpperCase() as ContractType,
    }),
  };

  return { where, orderBy };
}
