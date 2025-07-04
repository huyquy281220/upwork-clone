import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getNotificationsByUserId = async (userId: string) => {
  const response = await api.get(`${apiURL}/notifications?userId=${userId}`);

  return response.data;
};
