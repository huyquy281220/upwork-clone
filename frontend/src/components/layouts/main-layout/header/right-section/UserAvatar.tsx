"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { themeOptions as navigationThemeOptions } from "../data/navigation";
import { getDynamicIcon } from "@/utils/getDynamicIcon";
import { useHeaderContentByRole } from "@/hooks/useHeaderContentByRole";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { Role, User } from "@/types/user";
import JobSkeleton from "@/components/common/JobSkeleton";
import { UserImg } from "@/assets/images";

export default function UserAvatar() {
  const { avatarMenu } = useHeaderContentByRole();
  const { theme, setTheme } = useTheme();
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();
  const { data: session } = useSession();
  const { data: user, isLoading } = useUser<User>(session?.user.id ?? "");

  const getThemeDisplayText = () => {
    switch (theme) {
      case "dark":
        return "Dark";
      case "light":
        return "Light";
      default:
        return "Auto";
    }
  };

  const handleOpenPopover = () => {
    if (!isOpenPopover) {
      setShowThemeMenu(false);
    }
    setIsOpenPopover(!isOpenPopover);
  };

  const handleThemeClick = () => {
    setShowThemeMenu(!showThemeMenu);
  };

  const handleLogout = () => {
    logout({ redirectTo: "/" });
  };

  // Map the theme options from navigation to the format we need here
  const adaptedThemeOptions = navigationThemeOptions.map((option) => ({
    value: option.value,
    label: option.label,
    description: option.description,
    icon: getDynamicIcon(option.iconName, 16),
  }));

  if (isLoading) return <JobSkeleton />;

  // Render a menu item
  const renderMenuItem = (item: {
    id: string;
    label: string;
    iconName: string;
    href?: string;
  }) => {
    if (session?.user.role === "CLIENT" && item.label === "Your profile") {
      return null;
    }

    if (item.href) {
      return (
        <Link
          key={item.id}
          href={
            item.label === "Account settings"
              ? session?.user.role === "CLIENT"
                ? "/client/info"
                : session?.user.role === "FREELANCER"
                ? "/freelancer/settings"
                : item.href
              : item.label === "Your profile"
              ? `/freelancer/${session?.user.id}`
              : item.href
          }
          className="flex items-center px-4 py-2 hover:bg-hover text-sm"
        >
          {getDynamicIcon(item.iconName, 16)}
          <span className="ml-3">{item.label}</span>
        </Link>
      );
    } else {
      // Special case for theme item
      if (item.id === "theme") {
        return (
          <div
            key={item.id}
            onClick={handleThemeClick}
            className="flex items-center justify-between px-4 py-2 hover:bg-hover text-sm cursor-pointer"
          >
            <div className="flex items-center bg-transparent">
              {getDynamicIcon(item.iconName, 16)}
              <span className="ml-3">{`Theme: ${getThemeDisplayText()}`}</span>
            </div>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showThemeMenu ? "rotate-180" : ""
              }`}
            />
          </div>
        );
      }

      return (
        <div
          key={item.id}
          onClick={item.id === "logout" ? handleLogout : undefined}
          className="flex items-center px-4 py-2 hover:bg-hover text-sm cursor-pointer"
        >
          {getDynamicIcon(item.iconName, 16)}
          <span className="ml-3">{item.label}</span>
        </div>
      );
    }
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={handleOpenPopover}>
      <PopoverTrigger>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 cursor-pointer">
          <Image
            src={user?.avatarUrl || UserImg}
            alt="User Avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={15}
        className="border-none shadow-menu bg-transparent p-0 w-64 overflow-hidden"
      >
        <div className="bg-background border">
          {/* User info section */}
          <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <Image
                src={user?.avatarUrl || UserImg}
                alt="User Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-semibold ">{user?.fullName}</h3>
              <p className="text-sm text-gray-400">
                {user?.role ? Role[user.role as keyof typeof Role] : ""}
              </p>
            </div>
          </div>

          {/* Online status */}
          <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
            <span className="text-sm">Online for messages</span>
            <div className="w-8 h-4 bg-green-500 rounded-full flex items-center">
              <div className="w-3 h-3 bg-white rounded-full ml-auto mr-0.5"></div>
            </div>
          </div>

          {/* Menu items sections - using shared data structure */}
          {avatarMenu.map((section, sectionIndex) => (
            <div
              key={`section-${sectionIndex}`}
              className={cn(
                "py-1",
                section.hasBorder && "border-t border-gray-700 bg-background"
              )}
            >
              {section.items.map((item) => renderMenuItem(item))}
            </div>
          ))}

          {/* Theme selector dropdown */}
          <div
            ref={themeMenuRef}
            className={cn(
              "absolute left-0 bottom-0 w-64 bg-background shadow-menu -z-[1] border border-gray-700 rounded-md transition-transform duration-200 ease-in-out",
              showThemeMenu
                ? "translate-x-[-105%] opacity-100"
                : "translate-x-[-95%] opacity-0"
            )}
          >
            <div className="p-2 border-b border-gray-700 flex items-center">
              <button
                onClick={() => setShowThemeMenu(false)}
                className="p-1 hover:bg-hover rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="ml-2 font-medium">Theme settings</span>
            </div>

            <div className="py-1">
              {adaptedThemeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setTheme(option.value);
                    setShowThemeMenu(false);
                  }}
                  className="flex items-start w-full px-4 py-2 hover:bg-hover text-sm"
                >
                  {option.icon}
                  <div className="ml-3 text-left">
                    <div>{option.label}</div>
                    <div className="text-gray-400 text-xs">
                      {option.description}
                    </div>
                  </div>
                  {theme === option.value && <span className="ml-auto">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
