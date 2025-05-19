import React from "react";

interface ThemeOptionProps {
  icon: React.ReactNode;
  label: string;
  description: string;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function ThemeOption({
  icon,
  label,
  description,
  isSelected = false,
  onClick,
}: ThemeOptionProps) {
  return (
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
}
