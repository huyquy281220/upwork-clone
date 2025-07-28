import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getNotificationsByUserId = async (userId: string) => {
  const response = await api.get(
    `${apiURL}/notifications?userId=${userId}&limit=5&page=1`
  );

  return response.data;
};

export const markNotificationAsRead = async (
  notificationId: string,
  userId: string
) => {
  const response = await api.patch(
    `${apiURL}/notifications/${notificationId}/read?userId=${userId}`
  );

  return response.data;
};
