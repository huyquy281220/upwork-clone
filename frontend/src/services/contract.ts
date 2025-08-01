import { CreateContractDto } from "@/types/contract";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createContract = async (data: CreateContractDto) => {
  const response = await api.post(`${apiURL}/contracts/create`, data);

  return response.data;
};

export const getPaginatedContractsForClient = async (
  userId: string,
  limit: number,
  page: number,
  searchQuery?: string,
  type?: string,
  date?: string,
  status?: string
) => {
  const response = await api.get(
    `${apiURL}/contracts/client?clientId=${userId}&limit=${limit}&page=${page}&searchQuery=${searchQuery}&type=${type}&date=${date}&status=${status}`
  );

  return response.data;
};

export const getPaginatedContractsForFreelancer = async (
  freelancerId: string,
  limit: number,
  page: number,
  status?: string,
  searchQuery?: string,
  type?: string,
  sortedBy?: string
) => {
  const response = await api.get(
    `${apiURL}/contracts/freelancer?freelancerId=${freelancerId}&limit=${limit}&page=${page}&status=${status}&searchQuery=${searchQuery}&type=${type}&sortedBy=${sortedBy}`
  );

  return response.data;
};
