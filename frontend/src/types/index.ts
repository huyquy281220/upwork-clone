export interface PageProps {
  children: React.ReactNode;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  country: string;
  emailUpdates: boolean;
  agreeTerms: boolean;
}
