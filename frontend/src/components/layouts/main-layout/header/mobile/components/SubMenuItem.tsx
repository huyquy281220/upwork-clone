import React from "react";
import { ExternalLink } from "lucide-react";

interface SubMenuItemProps {
  title: string;
  hasExternalLink?: boolean;
}

export default function SubMenuItem({
  title,
  hasExternalLink = false,
}: SubMenuItemProps) {
  return (
    <div className="flex items-center justify-between px-8 py-3 text-sm">
      <span className="text-white">{title}</span>
      {hasExternalLink && <ExternalLink size={16} />}
    </div>
  );
}
