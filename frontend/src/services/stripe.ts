import api from "./api";
import { AddCardProps } from "@/types/payments";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const attachPaymentMethod = async (data: AddCardProps) => {
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

export const retrievePaymentMethod = async (paymentMethodId: string) => {
  const response = await api.get(
    `${apiURL}/stripe/retrieve-payment-method/${paymentMethodId}`
  );
  return response.data;
};

export const retrieveListPaymentMethods = async (customerId: string) => {
  const response = await api.get(
    `${apiURL}/stripe/retrieve-payment-methods/${customerId}`
  );
  return response.data;
};

export const setDefaultPaymentMethod = async (
  customerId: string,
  paymentMethodId: string
) => {
  const response = await api.post("/stripe/set-default-payment-method", {
    customerId,
    paymentMethodId,
  });
  return response.data;
};
