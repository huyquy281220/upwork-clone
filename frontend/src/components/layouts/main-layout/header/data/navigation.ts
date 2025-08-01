export interface MenuHeader {
  title: string;
  menu?: { label: string; link?: string; type?: string }[];
}

export interface SubItem {
  id: string;
  title: string;
  hasExternalLink?: boolean;
  href?: string;
  description?: string;
}

export interface SubMenuGroup {
  title?: string;
  items: SubItem[];
}

// Search categories - used in search dropdown
export interface SearchCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export const searchCategories: SearchCategory[] = [
  {
    id: "jobs",
    title: "Jobs",
    description: "Apply to jobs posted by clients",
    iconName: "Briefcase",
    // href: "/jobs",
  },
  {
    id: "talent",
    title: "Talent",
    description: "Find freelancers and agencies",
    iconName: "Users",
    // href: "/talent",
  },
];

// Theme options
export interface ThemeOption {
  id: string;
  value: string;
  label: string;
  description: string;
  iconName: string;
}

export const themeOptions: ThemeOption[] = [
  {
    id: "auto",
    value: "system",
    label: "Auto",
    description: "Use the same theme as your device",
    iconName: "Monitor",
  },
  {
    id: "light",
    value: "light",
    label: "Light",
    description: "Light background with dark text",
    iconName: "Sun",
  },
  {
    id: "dark",
    value: "dark",
    label: "Dark",
    description: "Dark background with light text",
    iconName: "Moon",
  },
];

// Bottom icons for mobile
export interface BottomLink {
  id: string;
  text: string;
  iconName: string;
  badge?: number;
  hasDropdown?: boolean;
  href?: string;
}

export const bottomLinks: BottomLink[] = [
  {
    id: "account",
    text: "Account settings",
    iconName: "Settings",
    href: "/settings",
  },
];

// Notification data
export interface NotificationItem {
  id: string;
  message: string;
  time: string;
}

export const notifications: NotificationItem[] = [
  {
    id: "1",
    message:
      "A recent sign-in to your Prowork account from an unknown device or browser.",
    time: "11:28 AM",
  },
  {
    id: "2",
    message: 'Your job post "WordPress Developer Needed" has 5 new proposals.',
    time: "Yesterday",
  },
  {
    id: "3",
    message: "Contract milestone payment of $350 has been released.",
    time: "Yesterday",
  },
];

// User menu items - for avatar dropdown
export interface UserMenuItem {
  id: string;
  label: string;
  iconName: string;
  href?: string;
}
