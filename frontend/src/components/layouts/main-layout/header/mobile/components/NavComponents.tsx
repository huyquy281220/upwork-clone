"use client";

import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import * as Icons from "lucide-react";

// DropdownItem Component
interface DropdownItemProps {
  title: string;
  isHighlighted?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
}

export const DropdownItem = ({
  title,
  isHighlighted = false,
  isExpanded = false,
  onClick,
}: DropdownItemProps) => (
  <div
    className="flex items-center justify-between px-4 py-3 cursor-pointer"
    onClick={onClick}
  >
    <span className={isHighlighted ? "text-green-500" : "text-white"}>
      {title}
    </span>
    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
  </div>
);

// SubMenuItem Component
interface SubMenuItemProps {
  title: string;
  hasExternalLink?: boolean;
}

export const SubMenuItem = ({
  title,
  hasExternalLink = false,
}: SubMenuItemProps) => (
  <div className="flex items-center justify-between px-8 py-3 text-sm">
    <span className="text-white">{title}</span>
    {hasExternalLink && <ExternalLink size={16} />}
  </div>
);

// Theme Option Component
interface ThemeOptionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export const ThemeOption = ({
  icon,
  label,
  description,
  isSelected = false,
  onClick,
}: ThemeOptionProps) => (
  <div className="flex items-start cursor-pointer" onClick={onClick}>
    <div className="mr-2">{icon}</div>
    <div>
      <div className="flex items-center">
        {label}
        {isSelected && <span className="ml-2">✓</span>}
      </div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  </div>
);

// Link Item Component
interface LinkItemProps {
  icon: React.ReactNode;
  text: string;
  badge?: number;
  hasDropdown?: boolean;
  onClick?: () => void;
}

export const LinkItem = ({
  icon,
  text,
  badge,
  hasDropdown = false,
  onClick,
}: LinkItemProps) => (
  <div
    className="flex items-center justify-between cursor-pointer"
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      {icon}
      <span>{text}</span>
    </div>
    {badge && (
      <div className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
        {badge}
      </div>
    )}
    {hasDropdown && <ChevronDown size={20} />}
  </div>
);

// Render dynamic Lucide icon
export const getDynamicIcon = (iconName: string, size: number = 20) => {
  // Define a mapping of icon names to components
  const iconMap: Record<string, React.ElementType> = {
    // Common icons
    Bell: Icons.Bell,
    Briefcase: Icons.Briefcase,
    ChevronDown: Icons.ChevronDown,
    ChevronUp: Icons.ChevronUp,
    CreditCard: Icons.CreditCard,
    ExternalLink: Icons.ExternalLink,
    FileText: Icons.FileText,
    HelpCircle: Icons.HelpCircle,
    LogOut: Icons.LogOut,
    MessageSquare: Icons.MessageSquare,
    Monitor: Icons.Monitor,
    MonitorSmartphone: Icons.MonitorSmartphone,
    Moon: Icons.Moon,
    Settings: Icons.Settings,
    Sun: Icons.Sun,
    User: Icons.User,
    Users: Icons.Users,
  };

  // Return the icon component or null if not found
  const IconComponent = iconMap[iconName];
  if (IconComponent) {
    return <IconComponent size={size} />;
  }

  return null;
};
