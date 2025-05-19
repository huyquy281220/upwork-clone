import * as Icons from "lucide-react";
import React from "react";

export function getDynamicIcon(
  iconName: string,
  size: number = 20
): React.ReactNode {
  const iconMap: Record<string, React.ElementType> = {
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
  const IconComponent = iconMap[iconName];
  if (IconComponent) {
    return React.createElement(IconComponent, { size });
  }
  return null;
}
