import { CreateContractDto } from "@/types/contract";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createContract = async (data: CreateContractDto) => {
  const response = await api.post(`${apiURL}/contracts/create`, data);

  return response.data;
};

export const getContracts = async (
  userId: string,
  skip: number,
  take: number,
  searchQuery?: string,
  type?: string,
  date?: string,
  status?: string
) => {
  const response = await api.get(
    `${apiURL}/contracts?clientId=${userId}&skip=${skip}&take=${take}&searchQuery=${searchQuery}&type=${type}&date=${date}&status=${status}`
  );

  return response.data;
};
