import { CreatePaymentMethodProps } from "@/types/payments";
import api from "./api";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const createPaymentMethod = async (data: CreatePaymentMethodProps) => {
  const response = await api.post(`${apiURL}/stripe/add-card`, data);

  return response.data;
};

export const getPaymentMethod = async (paymentMethodId: string) => {
  const response = await api.get(
    `${apiURL}/stripe/retrieve-payment-method/${paymentMethodId}`
  );

  return response.data;
};

export const createOnboardLink = async (accountId: string, email: string) => {
  const response = await api.post(
    `${apiURL}/stripe/freelancer/onboarding-link`,
    { accountId, email }
  );
  return response.data;
};

export const getAccountInfo = async (accountId: string) => {
  const response = await api.get(
    `${apiURL}/stripe/retrieve-account-info/${accountId}`
  );
  return response.data;
};

export const getDetailedAccountInfo = async (accountId: string) => {
  const response = await api.get(
    `${apiURL}/stripe/retrieve-detailed-account-info/${accountId}`
  );
  return response.data;
};
