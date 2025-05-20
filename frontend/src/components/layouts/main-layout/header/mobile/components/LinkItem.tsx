import React from "react";
import { ChevronDown } from "lucide-react";

interface LinkItemProps {
  icon: React.ReactNode;
  text: string;
  badge?: number;
  hasDropdown?: boolean;
  onClick?: () => void;
}

export default function LinkItem({
  icon,
  text,
  badge,
  hasDropdown = false,
  onClick,
}: LinkItemProps) {
  return (
    <div
      className="flex items-center justify-between cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span>{text}</span>
      </div>
      {badge && (
        <div className="bg-red-500  text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </div>
      )}
      {hasDropdown && <ChevronDown size={20} />}
    </div>
  );
}
