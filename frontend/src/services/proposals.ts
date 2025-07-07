import { CreateProposalProps } from "@/types/proposals";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createProposal = async (data: CreateProposalProps) => {
  const formData = new FormData();

  formData.append("freelancerId", data.freelancerId);
  formData.append("jobId", data.jobId);
  if (data.coverLetter) formData.append("coverLetter", data.coverLetter);
  if (data.pricing) formData.append("pricing", data.pricing.toString());
  if (data.timeline) formData.append("timeline", data.timeline);
  if (data.attachment) formData.append("attachment", data.attachment);

  const res = await api.post(`${apiURL}/proposals/create`, formData);

  return res;
};

export const getPaginatedProposalsByFreelancer = async (
  userId: string,
  limit: number,
  page: number,
  searchQuery?: string,
  status?: string,
  sortBy?: string,
  date?: string,
  budget?: string
) => {
  const response = await api.get(
    `${apiURL}/proposals/${userId}/get-paginated-proposals?limit=${limit}&page=${page}&searchQuery=${searchQuery}&status=${status}&sortedBy=${sortBy}&date=${date}&budget=${budget}`
  );

  return response.data;
};

export const getPaginatedProposalsByJob = async (
  jobId: string,
  limit: number,
  page: number,
  searchQuery?: string,
  sortBy?: string
) => {
  const response = await api.get(
    `${apiURL}/proposals/${jobId}/get-paginated-proposals-by-job?limit=${limit}&page=${page}&searchQuery=${
      searchQuery ?? ""
    }&sortedBy=${sortBy ?? "newest"}`
  );

  return response.data;
};

export const getOneProposal = async (proposalId: string) => {
  const response = await api.get(`${apiURL}/proposal/${proposalId}`);

  return response.data;
};
