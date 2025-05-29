"use client";

import { PopoverContent } from "@/components/ui/popover";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import { notifications } from "../data/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Notification() {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  return (
    <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={handleNotificationToggle}
          className="p-1 rounded-full hover:bg-gray-800 relative hover:text-white"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {notifications.length}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 border-none shadow-menu bg-background"
        align="end"
        sideOffset={20}
      >
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification) => (
            <div key={notification.id} className="border-b border-gray-700 p-4">
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
  );
}
