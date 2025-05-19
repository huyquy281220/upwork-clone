"use client";

import { useState } from "react";
import { Bell, HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { notifications } from "../data/navigation";

export default function IconButtons() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Help menu items from main navigation
  const helpMenuItems = [
    { label: "Help center", href: "/help" },
    { label: "Your support requests", href: "/support-requests" },
    { label: "Upwork Updates", href: "/updates" },
    { label: "Release notes", href: "/release-notes" },
  ];

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isHelpOpen) setIsHelpOpen(false);
  };

  const handleHelpToggle = () => {
    setIsHelpOpen(!isHelpOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Help Center */}
      <Popover open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleHelpToggle}
            className="p-1 rounded-full hover:bg-gray-800"
          >
            <HelpCircle className="w-5 h-5 text-white" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-64 p-0 border-none shadow-menu bg-main text-white"
          align="end"
          sideOffset={15}
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

      {/* Notification Bell */}
      <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleNotificationToggle}
            className="p-1 rounded-full hover:bg-gray-800 relative"
          >
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {notifications.length}
            </span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 p-0 border-none shadow-menu bg-main text-white"
          align="end"
          sideOffset={15}
        >
          <div className="max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border-b border-gray-700 p-4"
              >
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <Bell className="w-4 h-4" />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">{notification.message}</p>
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-3 text-center">
              <Link
                href="/notifications"
                className="text-green-500 hover:underline text-sm"
              >
                See all notifications
              </Link>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
