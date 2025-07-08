"use client";

import { useEffect, useState } from "react";
import {
  User,
  Moon,
  ChevronDown,
  ChevronUp,
  Divide,
  LogOut,
  Bell,
} from "lucide-react";
import Image from "next/image";
import {
  themeOptions,
  bottomLinks,
  BottomLink,
  ThemeOption as ThemeOptionType,
  notifications,
} from "../data/navigation";
import AnimatedDropdown, { DropdownItem } from "./components/Dropdown";
import { ThemeOption, LinkItem } from "./components";
import { getDynamicIcon } from "@/utils/getDynamicIcon";
import Link from "next/link";
import { useHeaderContentByRole } from "@/hooks/useHeaderContentByRole";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "next-auth/react";
import { useUser } from "@/hooks/useUserInfo";
import { BaseUser } from "@/types/user";
import { UserImg } from "@/assets/images";
interface MobileNavPanelProps {
  isOpen: boolean;
}

export default function MobileNavPanel({ isOpen }: MobileNavPanelProps) {
  const { data: session } = useSession();
  const { data: user } = useUser<BaseUser>(session?.user.id ?? "");
  const { navHeader } = useHeaderContentByRole();
  const { logout } = useAuth();
  // State for expanded menus
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [userAvatarOpen, setUserAvatarOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setExpandedMenu(null);
    }
  }, [isOpen]);

  // Toggle a menu's expanded state
  const toggleMenu = (menuKey: string) => {
    setExpandedMenu((prev) => (prev === menuKey ? null : menuKey));
  };

  if (!user || !session) return;

  return (
    <div
      className={`md:hidden h-full pb-5 bg-background overflow-y-auto transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* User Profile Section */}
      <div className="border-b border-gray-700 px-4 py-3 space-y-2">
        <div
          className="flex items-center"
          onClick={() => setUserAvatarOpen(!userAvatarOpen)}
        >
          <div className="mr-3 relative h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
            {/* Fallback user icon if image is not available */}
            <User className=" absolute" size={20} />

            {/* Attempt to load user image */}
            <div className="absolute inset-0">
              <Image
                src={user.avatarUrl || UserImg}
                alt="User Profile"
                className="object-cover"
                fill
                sizes="40px"
              />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className=" font-semibold">Hai Hai</h3>
            <p className="text-sm text-gray-400">Freelancer</p>
          </div>
          <button className="p-1">
            <ChevronDown size={20} />
          </button>
        </div>

        <AnimatedDropdown isOpen={userAvatarOpen}>
          <div className="px-4 py-3 flex items-center justify-between">
            <span className="text-sm">Online for messages</span>
            <div className="w-8 h-4 bg-green-500 rounded-full flex items-center">
              <div className="w-3 h-3 bg-white rounded-full ml-auto mr-0.5"></div>
            </div>
          </div>
        </AnimatedDropdown>
      </div>

      {/* Main Navigation Items - Data-driven */}
      <nav>
        {navHeader.map(({ title, menu }) => (
          <div key={title} className="border-b border-gray-700">
            <DropdownItem
              title={title}
              isExpanded={expandedMenu === title}
              isDropdown={menu ? true : false}
              onClick={() => toggleMenu(title)}
            />

            <AnimatedDropdown isOpen={expandedMenu === title}>
              <div className="bg-background py-1">
                {/* Handle either grouped or simple subitems */}
                {menu &&
                  menu.map(({ label, link, type }, index) => (
                    <div key={label}>
                      {type ? (
                        <div>
                          {index !== 0 && (
                            <Divide className="w-full h-[1px] my-1 bg-[#333]" />
                          )}
                          <span className="ml-7 text-sm text-[#a5a5a5]">
                            {label}
                          </span>
                        </div>
                      ) : (
                        <Link href={link ?? "/"}>
                          <p className="ml-12 py-2  text-sm">{label}</p>
                        </Link>
                      )}
                    </div>
                  ))}
              </div>
            </AnimatedDropdown>
          </div>
        ))}
      </nav>

      {/* Bottom Links */}
      <div className="px-4 py-2 mt-2 space-y-5">
        {bottomLinks.map((link: BottomLink) => (
          <LinkItem
            key={link.id}
            icon={getDynamicIcon(link.iconName)}
            text={link.text}
            badge={link.badge}
            hasDropdown={link.hasDropdown}
          />
        ))}

        {/* notifications */}
        <div>
          <div
            className="flex items-center justify-between"
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <div className="flex items-center gap-3">
              <Bell size={20} />
              <span>Notifications</span>
            </div>

            <div className="bg-red-500  text-xs rounded-full w-5 h-5 flex items-center justify-center">
              5
            </div>
          </div>

          <AnimatedDropdown isOpen={notificationOpen}>
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="border-b border-gray-700 p-4"
              >
                <div className="flex">
                  <div className="mr-3 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <Bell className="w-4 h-4 bg-transparent" />
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
          </AnimatedDropdown>
        </div>

        {/* Theme dropdown */}
        <div>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setThemeMenuOpen(!themeMenuOpen)}
          >
            <div className="flex items-center gap-3">
              <Moon size={20} />
              <span>
                Theme:{" "}
                {selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)}
              </span>
            </div>
            {themeMenuOpen ? (
              <ChevronUp size={20} />
            ) : (
              <ChevronDown size={20} />
            )}
          </div>

          <AnimatedDropdown isOpen={themeMenuOpen}>
            <div className="ml-8 mt-2 space-y-3 border-l-2 border-gray-700 pl-3 py-2">
              {/* Theme options - data-driven */}
              {themeOptions.map((option: ThemeOptionType) => (
                <ThemeOption
                  key={option.id}
                  icon={getDynamicIcon(option.iconName, 18)}
                  label={option.label}
                  description={option.description}
                  isSelected={selectedTheme === option.id}
                  onClick={() => setSelectedTheme(option.id)}
                />
              ))}
            </div>
          </AnimatedDropdown>
        </div>

        <LinkItem
          icon={<LogOut size={20} />}
          text="Logout"
          onClick={() => logout({ redirectTo: "/" })}
        />
      </div>
    </div>
  );
}
