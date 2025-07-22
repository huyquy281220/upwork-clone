import { CreateContractDto } from "@/types/contract";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createContract = async (data: CreateContractDto) => {
  const response = await api.post(`${apiURL}/contracts/create`, data);

  return response.data;
};
