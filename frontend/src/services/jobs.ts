import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllJobsByUserId = async (userId: string) => {
  const response = await api.get(`${apiURL}/jobs/${userId}/get-all-jobs`);
  return response.data;
};
