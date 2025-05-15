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

export interface Country {
  name: { common: string };
  cca2: string;
  flags: { png: string };
}

export type ChildrenProps = {
  children: React.ReactNode;
};

export interface NavMenuItemProps {
  title: string;
  menu: {
    label: string;
    link?: string;
    type?: string;
  };
}
