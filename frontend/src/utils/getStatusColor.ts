import { ContractStatus, MilestoneStatus } from "@/types/contract";

export const getMilestoneStatusColor = (status: MilestoneStatus) => {
  switch (status) {
    case MilestoneStatus.COMPLETED:
      return "bg-green-100 text-green-800";
    case MilestoneStatus.IN_PROGRESS:
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getContractStatusColor = (status: string) => {
  switch (status) {
    case ContractStatus.PENDING:
      return "bg-gray-100 text-gray-800";
    case ContractStatus.ACTIVE:
      return "bg-green-100 text-green-800 border-green-200";
    case ContractStatus.CANCELLED:
      return "bg-red-100 text-red-800 border-red-200";
    // case "expired":
    //   return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
