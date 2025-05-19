import React from "react";
import { ExternalLink } from "lucide-react";

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
