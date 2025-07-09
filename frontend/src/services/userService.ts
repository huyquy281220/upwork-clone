import api from "./api";
import { UserUpdateInput } from "@/types/user";
const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getUserById = async (id: string) => {
  const response = await api.get(`${apiURL}/user/${id}`);
  return response.data;
};

export const updateUserById = async (id: string, data: UserUpdateInput) => {
  const response = await api.patch(`${apiURL}/user/${id}`, data);
  return response.data;
};

export const getUserLanguages = async (id: string) => {
  const response = await api.get(`${apiURL}/user/${id}/languages`);
  return response.data;
};

export const getUserEducation = async (id: string) => {
  const response = await api.get(`${apiURL}/user/${id}/education`);
  return response.data;
};

export const imageUpload = async (userId: string, file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await api.post(
    `${apiURL}/user/${userId}/upload-avatar`,
    formData
  );

  return response.data;
};

export const verifyEmail = async (email: string) => {
  const response = await api.post(`${apiURL}/user/request-verify-email`, {
    email,
  });

  return response.data;
};
