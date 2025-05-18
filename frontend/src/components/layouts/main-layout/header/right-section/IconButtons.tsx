"use client";

import { useState } from "react";
import { Bell, HelpCircle } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";

type NotificationItem = {
  id: string;
  message: string;
  time: string;
};

type HelpMenuItem = {
  label: string;
  href: string;
};

export const IconButtons = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Example notifications
  const notifications: NotificationItem[] = [
    {
      id: "1",
      message:
        "A recent sign-in to your Upwork account (dc87e8a9) from an unknown device or browser.",
      time: "11:28 AM",
    },
    {
      id: "2",
      message:
        "A recent sign-in to your Upwork account (dc87e8a9) from an unknown device or browser.",
      time: "Yesterday",
    },
    {
      id: "3",
      message:
        "A recent sign-in to your Upwork account (dc87e8a9) from an unknown device or browser.",
      time: "Yesterday",
    },
  ];

  // Help menu items
  const helpMenuItems: HelpMenuItem[] = [
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
          className="w-64 p-0 border-none shadow-menu bg-[#181818] text-white"
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
          className="w-80 p-0 border-none shadow-menu bg-[#181818] text-white"
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
};
