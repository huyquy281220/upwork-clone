import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllSkills = async () => {
  const response = await api.get(`${apiURL}/skills`);
  return response.data;
};

export const getUserSkills = async (userId: string) => {
  const response = await api.get(`${apiURL}/user-skills/${userId}`);
  return response.data;
};

export const getSkillsByJobId = async (jobId: string) => {
  const response = await api.get(`${apiURL}/skills/job/${jobId}`);
  return response.data;
};

export const getSkillsByName = async (searchValue: string) => {
  const response = await api.post(`${apiURL}/skills/search`, { searchValue });

  return response.data;
};
