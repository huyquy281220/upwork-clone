import { CreateWorkLogProps } from "@/types/work-log";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createWorkLog = async (data: CreateWorkLogProps) => {
  const response = await api.post(`${apiURL}/work-logs`, data);
  return response.data;
};

export const getWorkLogsByContractId = async (
  contractId: string | undefined
) => {
  const response = await api.get(
    `${apiURL}/work-logs/by-contract?contractId=${contractId}`
  );
  return response.data;
};

export const updateWorkLog = async (
  workLogId: string,
  data: CreateWorkLogProps
) => {
  const response = await api.patch(`${apiURL}/work-logs/${workLogId}`, data);
  return response.data;
};

export const deleteWorkLog = async (workLogId: string) => {
  const response = await api.delete(`${apiURL}/work-logs/${workLogId}`);
  return response.data;
};
