import { JobProps } from "@/types/jobs";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getPaginatedJobs = async (
  userId: string,
  page: number,
  limit: number
) => {
  const response = await api.get(
    `${apiURL}/jobs/${userId}/get-jobs-with-pagination?limit=${limit}&page=${page}`
  );
  return response.data;
};

export const getAllJobs = async (userId: string) => {
  const response = await api.get(`${apiURL}/jobs/${userId}/get-all-jobs`);
  return response.data;
};

export const getMostRecentJobs = async () => {
  const response = await api.get(`${apiURL}/jobs/most-recent`);
  return response.data;
};

export const getBestMatchesJobs = async (freelancerId: string) => {
  const response = await api.get(`${apiURL}/jobs/best-matches/${freelancerId}`);
  return response.data;
};

export const getJobById = async (jobId: string) => {
  const response = await api.get(`${apiURL}/jobs/${jobId}`);
  return response.data;
};

export const updateJobById = async (
  jobId: string,
  clientId: string,
  jobData: Partial<JobProps>
) => {
  const response = await api.patch(
    `${apiURL}/jobs/${clientId}/update/${jobId}`,
    jobData
  );
  return response;
};

export const deleteJobById = async (jobId: string, clientId: string) => {
  const response = await api.delete(
    `${apiURL}/jobs/${clientId}/delete/${jobId}`
  );
  return response;
};
