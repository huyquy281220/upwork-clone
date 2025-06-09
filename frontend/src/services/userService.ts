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
