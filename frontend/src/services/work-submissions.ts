import {
  CreateWorkSubmissionProps,
  UpdateWorkSubmissionProps,
} from "@/types/work-submissions";
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
  const formData = new FormData();
  formData.append("title", submission.title);
  formData.append("description", submission.description);
  formData.append("contractId", submission.contractId);
  formData.append("workLogId", submission.workLogId || "");
  formData.append("milestoneId", submission.milestoneId || "");
  formData.append("file", submission.file);

  const response = await api.post(
    `${apiURL}/work-submissions/create`,
    formData
  );
  return response.data;
};

export const updateWorkSubmission = async (
  id: string,
  contractId: string,
  submission: UpdateWorkSubmissionProps
) => {
  const data = { ...submission, contractId };

  const response = await api.patch(
    `${apiURL}/work-submissions/update/${id}`,
    data
  );
  return response.data;
};
