import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getJobsWithPagination = async (
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

export const deleteJobById = async (jobId: string, clientId: string) => {
  const response = await api.delete(
    `${apiURL}/jobs/${clientId}/delete/${jobId}`
  );
  return response;
};
