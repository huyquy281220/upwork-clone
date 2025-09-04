import { ContractStatus, MilestoneStatus } from "@/types/contract";
import { PaymentStatus } from "@/types/payments";
import { WorkSubmissionStatus } from "@/types/work-submissions";

export const getContractStatusColor = (status: string) => {
  switch (status) {
    case ContractStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case ContractStatus.ACTIVE:
      return "bg-green-100 text-green-800 border-green-200";
    case ContractStatus.CANCELLED:
      return "bg-red-100 text-red-800 border-red-200";
    case ContractStatus.COMPLETED:
      return "bg-blue-100 text-blue-800 border-blue-200";

    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case PaymentStatus.PAID:
      return "bg-green-100 text-green-800";
    case PaymentStatus.SUCCEEDED:
      return "bg-green-100 text-green-800";
    case PaymentStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    // case "scheduled":
    //   return "bg-blue-100 text-blue-800";
    case PaymentStatus.CANCELED:
      return "bg-red-100 text-red-800";
    case PaymentStatus.FAILED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getMilestoneStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case MilestoneStatus.COMPLETED:
      return "bg-green-100 text-green-800";
    case MilestoneStatus.SUBMITTED:
      return "bg-blue-100 text-blue-800";
    case MilestoneStatus.IN_PROGRESS:
      return "bg-yellow-100 text-yellow-800";
    case MilestoneStatus.PENDING:
      return "bg-gray-100 text-gray-800";
    case MilestoneStatus.CANCELED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getWorkSubmissionStatusColor = (status: string) => {
  switch (status) {
    case WorkSubmissionStatus.SUBMITTED:
      return "bg-green-100 text-green-800";
    case WorkSubmissionStatus.PENDING:
      return "bg-yellow-100 text-yellow-800";
    case WorkSubmissionStatus.REJECTED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
