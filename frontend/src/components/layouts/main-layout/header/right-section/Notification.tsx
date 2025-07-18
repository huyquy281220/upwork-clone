"use client";

import { PopoverContent } from "@/components/ui/popover";

import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { Bell } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useSession } from "next-auth/react";
import { useNotifications } from "@/hooks/useNotifications";
import { NotificationProps } from "@/types/notification";
import { formatRelativeTime } from "@/utils/getRelativeTime";
import { useRouter } from "next/navigation";
import { NotificationRedirectMap } from "@/utils/notificationRedirectMap";
import { InfiniteLoading } from "@/components/common/InfiniteLoading";

export default function Notification() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const socket = useSocket(session?.user.id ?? "");

  const { notifications, markAsRead } = useNotifications({
    socket: socket!,
    userId: session?.user.id ?? "",
  });

  if (!session) return <InfiniteLoading />;

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationClick = (notification: NotificationProps) => {
    const redirectUrl = NotificationRedirectMap[notification.type];
    const url = redirectUrl({ id: notification.itemId ?? "" });

    markAsRead(notification.id, {
      onSuccess: () => {
        router.push(url);
      },
    });
  };

  return (
    <Popover open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
      <PopoverTrigger asChild>
        <button
          onClick={handleNotificationToggle}
          className="p-1 rounded-full hover:bg-gray-800 relative hover:text-white"
        >
          <Bell className="w-5 h-5" />
          {notifications.some((n) => !n.isRead) ? (
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center"></span>
          ) : null}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 p-0 border-none shadow-menu bg-background"
        align="end"
        sideOffset={20}
      >
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((notification: NotificationProps) => (
            <div
              key={notification.id}
              className="border-b border-gray-700 p-4 cursor-pointer"
              onClick={() => handleNotificationClick(notification)}
            >
              <div className="flex">
                <div className="mr-3 mt-1">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-sm">{notification.content}</p>
                  <span className="text-xs text-gray-400">
                    {formatRelativeTime(notification.createdAt)}
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
