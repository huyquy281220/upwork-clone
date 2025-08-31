import { PrismaService } from '../prisma/prisma.service';

// Types for contract metrics
export type ContractMetrics = {
  rating: number;
  reviewCount: number;
  totalSpent: number;
  hireRate: number;
  jobPosted: number;
  activeHires: number;
};

export type ContractProgressProps = {
  totalPrice: number;
  totalEarning: number;
  totalHoursWorked: number;
  totalHours: number;
};

// Calculate contract progress percentage
export const calculateContractProgress = ({
  totalPrice,
  totalEarning,
  totalHoursWorked,
  totalHours,
}: ContractProgressProps): number => {
  if (totalPrice > 0) {
    return Math.min((totalEarning / totalPrice) * 100, 100);
  }
  if (totalHours > 0) {
    return Math.min((totalHoursWorked / totalHours) * 100, 100);
  }
  return 0;
};

// Get client metrics
export const getClientMetricsByContract = async (
  prisma: PrismaService,
  clientId: string,
): Promise<ContractMetrics> => {
  // Get all contracts for the client
  const contracts = await prisma.contract.findMany({
    where: { clientId },
    include: {
      reviews: true,
      payments: {
        where: {
          status: {
            in: ['PAID', 'SUCCEEDED'],
          },
        },
      },
    },
  });

  // Calculate total spent
  const totalSpent = contracts.reduce((sum, contract) => {
    return (
      sum +
      contract.payments.reduce(
        (paymentSum, payment) => paymentSum + payment.amount,
        0,
      )
    );
  }, 0);

  // Calculate rating and review count
  const allReviews = contracts.flatMap((contract) => contract.reviews);
  const reviewCount = allReviews.length;
  const rating =
    reviewCount > 0
      ? allReviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : 0;

  // Calculate job posted count
  const jobPosted = await prisma.job.count({
    where: { clientId },
  });

  // Calculate active hires (contracts with ACTIVE status)
  const activeHires = await prisma.contract.count({
    where: {
      clientId,
      status: 'ACTIVE',
    },
  });

  // Calculate hire rate
  const totalJobs = await prisma.job.count({
    where: { clientId },
  });

  const hiredJobs = await prisma.job.count({
    where: {
      clientId,
      contracts: {
        some: {
          status: {
            in: ['ACTIVE', 'COMPLETED'],
          },
        },
      },
    },
  });

  const hireRate =
    totalJobs > 0 ? Math.round((hiredJobs / totalJobs) * 100) : 0;

  return {
    rating: Math.round(rating * 10) / 10, // Round to 1 decimal place
    reviewCount,
    totalSpent,
    hireRate,
    jobPosted,
    activeHires,
  };
};
