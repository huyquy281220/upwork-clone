import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getNotificationsByUserId = async (userId: string) => {
  const response = await api.get(`${apiURL}/notifications?userId=${userId}`);

  return response.data;
};

export const markNotificationAsRead = async (notificationId: string) => {
  const response = await api.patch(
    `${apiURL}/notifications/${notificationId}/read`
  );

  return response.data;
};
