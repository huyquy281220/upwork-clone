import { MilestoneStatus } from "@/types/contract";

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
