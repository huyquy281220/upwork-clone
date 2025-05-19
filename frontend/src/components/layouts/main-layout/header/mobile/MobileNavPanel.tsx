"use client";

import { useState } from "react";
import { User, Moon, ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { GoogleSvg } from "@/assets/svg";
import {
  mainNavItems,
  themeOptions,
  bottomLinks,
  NavItem,
  SubItem,
  BottomLink,
  ThemeOption as ThemeOptionType,
  SubMenuGroup,
} from "../data/navigation";
import AnimatedDropdown, { DropdownItem } from "./components/Dropdown";
import { SubMenuItem, ThemeOption, LinkItem } from "./components";
import { getDynamicIcon } from "@/utils/getDynamicIcon";

interface MobileNavPanelProps {
  isOpen: boolean;
}

// Type guard for items with subMenuGroups
interface NavItemWithGroups extends NavItem {
  subMenuGroups: SubMenuGroup[];
}

export default function MobileNavPanel({ isOpen }: MobileNavPanelProps) {
  // State for expanded menus
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>(
    {}
  );
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("dark");

  // Toggle a menu's expanded state
  const toggleMenu = (menuId: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  // Check if an item has grouped submenus (type guard)
  const hasGroupedSubmenus = (item: NavItem): item is NavItemWithGroups => {
    return "subMenuGroups" in item && Array.isArray(item.subMenuGroups);
  };

  return (
    <div
      className={`fixed inset-x-0 top-14 bg-[#181818] text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      style={{ maxHeight: "100vh", overflowY: "auto" }}
    >
      {/* User Profile Section */}
      <div className="border-b border-gray-700 px-4 py-3">
        <div className="flex items-center">
          <div className="mr-3 relative h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center overflow-hidden">
            {/* Fallback user icon if image is not available */}
            <User className="text-white absolute" size={20} />

            {/* Attempt to load user image */}
            <div className="absolute inset-0">
              <Image
                src={GoogleSvg}
                alt="User Profile"
                className="object-cover"
                fill
                sizes="40px"
              />
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-white font-semibold">Hai Hai</h3>
            <p className="text-sm text-gray-400">Freelancer</p>
          </div>
          <button className="p-1">
            <ChevronDown size={20} />
          </button>
        </div>
      </div>

      {/* Main Navigation Items - Data-driven */}
      <nav>
        {mainNavItems.map((item) => (
          <div key={item.id} className="border-b border-gray-700">
            <DropdownItem
              title={item.title}
              isHighlighted={item.isHighlighted}
              isExpanded={expandedMenus[item.id]}
              onClick={() => toggleMenu(item.id)}
            />

            <AnimatedDropdown isOpen={expandedMenus[item.id]}>
              <div className="bg-[#232323] py-1">
                {/* Handle either grouped or simple subitems */}
                {hasGroupedSubmenus(item)
                  ? // Render grouped submenus
                    item.subMenuGroups.map(
                      (group: SubMenuGroup, groupIndex: number) => (
                        <div key={groupIndex}>
                          {/* Add a border-top for all but the first group */}
                          {groupIndex > 0 && (
                            <div className="py-1 border-t border-gray-700 mt-1"></div>
                          )}

                          {/* Show group title if it exists */}
                          {group.title && (
                            <div className="px-4 py-2 text-gray-400 text-sm">
                              {group.title}
                            </div>
                          )}

                          {/* Render group items */}
                          {group.items.map(
                            (subItem: SubItem, subItemIndex: number) => (
                              <SubMenuItem
                                key={`${item.id}-${groupIndex}-${subItemIndex}`}
                                title={subItem.title}
                                hasExternalLink={subItem.hasExternalLink}
                              />
                            )
                          )}
                        </div>
                      )
                    )
                  : // Render simple list of subitems
                    item.subItems?.map((subItem: SubItem, index: number) => (
                      <SubMenuItem
                        key={`${item.id}-${index}`}
                        title={subItem.title}
                        hasExternalLink={subItem.hasExternalLink}
                      />
                    ))}
              </div>
            </AnimatedDropdown>
          </div>
        ))}
      </nav>

      {/* Bottom Links */}
      <div className="px-4 py-2 space-y-3">
        {/* Bottom links - data-driven */}
        {bottomLinks.map((link: BottomLink) => (
          <LinkItem
            key={link.id}
            icon={getDynamicIcon(link.iconName)}
            text={link.text}
            badge={link.badge}
            hasDropdown={link.hasDropdown}
          />
        ))}

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
      </div>
    </div>
  );
}
