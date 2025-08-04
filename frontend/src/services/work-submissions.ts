import { CreateWorkSubmissionProps } from "@/types/work-submissions";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getWorkSubmissionsByContractId = async (contractId: string) => {
  const response = await api.get(
    `${apiURL}/work-submissions/by-contract/${contractId}`
  );
  return response.data;
};

export const createWorkSubmission = async (
  submission: CreateWorkSubmissionProps
) => {
  const response = await api.post(`${apiURL}/work-submissions`, submission);
  return response.data;
};
