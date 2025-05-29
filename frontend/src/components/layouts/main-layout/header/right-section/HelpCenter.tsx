"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

export default function HelpCenter() {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const helpMenuItems = [
    { label: "Help center", href: "/help" },
    { label: "Your support requests", href: "/support-requests" },
    { label: "Upwork Updates", href: "/updates" },
    { label: "Release notes", href: "/release-notes" },
  ];

  const handleHelpToggle = () => {
    setIsHelpOpen(!isHelpOpen);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Help Center */}
      <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleHelpToggle}
            className="p-1 rounded-full hover:bg-gray-800 hover:text-white"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 p-0 border-none shadow-menu bg-background "
          align="end"
          sideOffset={20}
        >
          <div className="py-1">
            {helpMenuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block px-4 py-2 hover:bg-gray-800 text-sm"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
