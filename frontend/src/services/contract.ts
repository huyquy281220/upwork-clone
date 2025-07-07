import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createContract = async () => {
  const response = await api.post(`${apiURL}`);

  return response.data;
};
