export interface StripeExternalAccount {
  id: string;
  object: "card" | "bank_account";
  brand?: string;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
  bank_name?: string;
  account_holder_type?: string;
  account_type?: string;
  routing_number?: string;
  fingerprint?: string;
  status?: string;
}

export interface CardInfo {
  id: string;
  type: "card" | "bank_account";
  // For cards
  brand?: string;
  last4?: string;
  exp_month?: number;
  exp_year?: number;
  // For bank accounts
  bank_name?: string;
  account_holder_type?: string;
  account_type?: string;
  routing_number?: string;
  fingerprint?: string;
  status?: string;
}
