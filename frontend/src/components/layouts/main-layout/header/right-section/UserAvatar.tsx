"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { useTheme } from "next-themes";
import {
  ChevronDown,
  LogOut,
  Settings,
  BarChart2,
  User,
  Circle,
  CreditCard,
  Briefcase,
  MonitorSmartphone,
  Monitor,
  Sun,
  Moon,
  ChevronLeft,
} from "lucide-react";
import { PopoverContent } from "@/components/ui/popover";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

// Menu item type definitions
type MenuItem = {
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
};

type MenuSection = {
  items: MenuItem[];
  hasBorder?: boolean;
};

type ThemeOption = {
  value: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

export const UserAvatar = () => {
  const { theme, setTheme } = useTheme();
  const [isOpenPopover, setIsOpenPopover] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  // Get display text for current theme
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

  // Theme options data
  const themeOptions: ThemeOption[] = [
    {
      value: "system",
      label: "Auto",
      description: "Use the same theme as your device",
      icon: <Monitor className="h-4 w-4 mr-3 mt-0.5" />,
    },
    {
      value: "light",
      label: "Light",
      description: "Light background with dark text",
      icon: <Sun className="h-4 w-4 mr-3 mt-0.5" />,
    },
    {
      value: "dark",
      label: "Dark",
      description: "Dark background with light text",
      icon: <Moon className="h-4 w-4 mr-3 mt-0.5" />,
    },
  ];

  // Menu sections data
  const menuSections: MenuSection[] = [
    {
      items: [
        {
          icon: <User className="h-4 w-4 mr-3" />,
          label: "Your profile",
          href: "/profile",
        },
        {
          icon: <BarChart2 className="h-4 w-4 mr-3" />,
          label: "Stats and trends",
          href: "/stats",
        },
      ],
    },
    {
      hasBorder: true,
      items: [
        {
          icon: <CreditCard className="h-4 w-4 mr-3" />,
          label: "Membership plan",
          href: "/membership",
        },
        {
          icon: <Circle className="h-4 w-4 mr-3" />,
          label: "Connects",
          href: "/connects",
        },
        {
          icon: <Briefcase className="h-4 w-4 mr-3" />,
          label: "Apps and Offers",
          href: "/apps-offers",
        },
      ],
    },
    {
      hasBorder: true,
      items: [
        {
          icon: <MonitorSmartphone className="h-4 w-4 mr-3" />,
          label: `Theme: ${getThemeDisplayText()}`,
          onClick: handleThemeClick,
        },
        {
          icon: <Settings className="h-4 w-4 mr-3" />,
          label: "Account settings",
          href: "/settings",
        },
      ],
    },
    {
      hasBorder: true,
      items: [
        {
          icon: <LogOut className="h-4 w-4 mr-3" />,
          label: "Log out",
          onClick: () => console.log("Logging out..."),
        },
      ],
    },
  ];

  // Render a menu item
  const renderMenuItem = (item: MenuItem) => {
    if (item.href) {
      return (
        <Link
          key={item.label}
          href={item.href}
          className="flex items-center px-4 py-2 hover:bg-gray-800 text-sm"
        >
          {item.icon}
          {item.label}
        </Link>
      );
    } else {
      return (
        <div
          key={item.label}
          onClick={item.onClick}
          className="flex items-center justify-between px-4 py-2 hover:bg-gray-800 text-sm cursor-pointer"
        >
          <div className="flex items-center">
            {item.icon}
            {item.label}
          </div>
          {item.label.includes("Theme") && (
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showThemeMenu ? "rotate-180" : ""
              }`}
            />
          )}
        </div>
      );
    }
  };

  return (
    <Popover open={isOpenPopover} onOpenChange={handleOpenPopover}>
      <PopoverTrigger>
        <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white cursor-pointer">
          <Image
            src="/placeholder-avatar.jpg"
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
        className="border-none shadow-menu bg-[#181818] text-white p-0 w-64"
      >
        {/* User info section */}
        <div className="p-4 border-b border-gray-700 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/placeholder-avatar.jpg"
              alt="User Avatar"
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-white">Hai Hai</h3>
            <p className="text-sm text-gray-400">Freelancer</p>
          </div>
        </div>

        {/* Online status */}
        <div className="px-4 py-3 border-b border-gray-700 flex items-center justify-between">
          <span className="text-sm">Online for messages</span>
          <div className="w-8 h-4 bg-green-500 rounded-full flex items-center">
            <div className="w-3 h-3 bg-white rounded-full ml-auto mr-0.5"></div>
          </div>
        </div>

        {/* Menu items sections */}
        {menuSections.map((section, sectionIndex) => (
          <div
            key={`section-${sectionIndex}`}
            className={cn(
              "py-1",
              section.hasBorder && "border-t border-gray-700"
            )}
          >
            {section.items.map((item) => renderMenuItem(item))}
          </div>
        ))}

        {/* Theme selector dropdown */}
        <div
          ref={themeMenuRef}
          className={cn(
            "absolute left-0 bottom-0 w-64 bg-[#181818] shadow-menu -z-[1] border border-gray-700 rounded-md transition-transform duration-200 ease-in-out",
            showThemeMenu
              ? "translate-x-[-105%] opacity-100"
              : "translate-x-[-95%] opacity-0"
          )}
        >
          <div className="p-2 border-b border-gray-700 flex items-center">
            <button
              onClick={() => setShowThemeMenu(false)}
              className="p-1 hover:bg-gray-800 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="ml-2 font-medium">Promote with ads</span>
          </div>

          <div className="py-1">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setTheme(option.value);
                  setShowThemeMenu(false);
                }}
                className="flex items-start w-full px-4 py-2 hover:bg-gray-800 text-sm"
              >
                {option.icon}
                <div className="text-left">
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
      </PopoverContent>
    </Popover>
  );
};
