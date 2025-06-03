import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getUserById = async (id: string) => {
  const response = await api.get(`${apiURL}/user/${id}`);
  return response.data;
};
