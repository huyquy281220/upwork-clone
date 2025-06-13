import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getAllSkills = async () => {
  const response = await api.get(`${apiURL}/skills`);
  return response.data;
};
