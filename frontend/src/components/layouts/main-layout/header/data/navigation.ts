// Navigation menu items
export interface NavItem {
  id: string;
  title: string;
  isHighlighted?: boolean;
  subItems?: SubItem[];
  subMenuGroups?: SubMenuGroup[];
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

// Main navigation items - shared between mobile and desktop
export const mainNavItems: NavItem[] = [
  {
    id: "findWork",
    title: "Find work",
    isHighlighted: true,
    subMenuGroups: [
      {
        items: [
          { id: "findWork", title: "Find work", href: "/find-work" },
          { id: "savedJobs", title: "Saved jobs", href: "/saved-jobs" },
          {
            id: "proposals",
            title: "Proposals and offers",
            href: "/proposals",
          },
        ],
      },
      {
        title: "Reach more clients",
        items: [
          { id: "services", title: "Your services", href: "/services" },
          {
            id: "promote",
            title: "Promote with ads",
            hasExternalLink: true,
            href: "/promote",
          },
          {
            id: "directContracts",
            title: "Direct Contracts",
            href: "/direct-contracts",
          },
        ],
      },
    ],
  },
  {
    id: "deliverWork",
    title: "Deliver work",
    subItems: [
      {
        id: "activeContracts",
        title: "Your active contracts",
        href: "/active-contracts",
      },
      {
        id: "contractHistory",
        title: "Contract history",
        href: "/contract-history",
      },
      { id: "hourlyDiary", title: "Hourly work diary", href: "/work-diary" },
    ],
  },
  {
    id: "finances",
    title: "Manage finances",
    subMenuGroups: [
      {
        items: [
          {
            id: "overview",
            title: "Financial overview",
            href: "/financial-overview",
          },
          { id: "reports", title: "Your reports", href: "/reports" },
          { id: "billings", title: "Billings and earnings", href: "/billings" },
          {
            id: "transactions",
            title: "Transactions and invoices",
            href: "/transactions",
          },
          {
            id: "certificate",
            title: "Certificate of earnings",
            hasExternalLink: true,
            href: "/certificate",
          },
        ],
      },
      {
        title: "Payments",
        items: [
          { id: "withdraw", title: "Withdraw earnings", href: "/withdraw" },
        ],
      },
      {
        title: "Taxes",
        items: [
          { id: "taxForms", title: "Tax forms", href: "/tax-forms" },
          { id: "taxInfo", title: "Tax information", href: "/tax-info" },
        ],
      },
    ],
  },
  {
    id: "help",
    title: "Help",
    subItems: [
      { id: "helpCenter", title: "Help center", href: "/help" },
      {
        id: "supportRequests",
        title: "Your support requests",
        href: "/support-requests",
      },
      { id: "updates", title: "Upwork Updates", href: "/updates" },
      { id: "releaseNotes", title: "Release notes", href: "/release-notes" },
    ],
  },
];

// Search categories - used in search dropdown
export interface SearchCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  href: string;
}

export const searchCategories: SearchCategory[] = [
  {
    id: "jobs",
    title: "Jobs",
    description: "Apply to jobs posted by clients",
    iconName: "Briefcase",
    href: "/jobs",
  },
  {
    id: "talent",
    title: "Talent",
    description: "Find freelancers and agencies",
    iconName: "Users",
    href: "/talent",
  },
  {
    id: "projects",
    title: "Projects",
    description: "See projects from other pros",
    iconName: "FileText",
    href: "/projects",
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
    id: "messages",
    text: "Messages",
    iconName: "MessageSquare",
  },
  {
    id: "notifications",
    text: "Notifications",
    iconName: "Bell",
    badge: 5,
  },
  {
    id: "chat",
    text: "Chat with Uma",
    iconName: "Settings",
  },
  {
    id: "account",
    text: "Account settings",
    iconName: "Settings",
    href: "/settings",
  },
  {
    id: "logout",
    text: "Log out",
    iconName: "LogOut",
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
      "A recent sign-in to your Upwork account from an unknown device or browser.",
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

export interface UserMenuSection {
  items: UserMenuItem[];
  hasBorder?: boolean;
}

export const freelancerMenuSections: UserMenuSection[] = [
  {
    items: [
      {
        id: "profile",
        iconName: "User",
        label: "Your profile",
        href: "/profile",
      },
      {
        id: "stats",
        iconName: "ChevronDown",
        label: "Stats and trends",
        href: "/stats",
      },
    ],
  },
  {
    hasBorder: true,
    items: [
      {
        id: "membership",
        iconName: "CreditCard",
        label: "Membership plan",
        href: "/membership",
      },
      {
        id: "apps",
        iconName: "Briefcase",
        label: "Apps and Offers",
        href: "/apps-offers",
      },
    ],
  },
  {
    hasBorder: true,
    items: [
      {
        id: "theme",
        iconName: "MonitorSmartphone",
        label: "Theme",
      },
      {
        id: "settings",
        iconName: "Settings",
        label: "Account settings",
        href: "/settings",
      },
    ],
  },
  {
    hasBorder: true,
    items: [
      {
        id: "logout",
        iconName: "LogOut",
        label: "Log out",
      },
    ],
  },
];

export const clientMenuSections: UserMenuSection[] = [
  {
    items: [],
  },
];
