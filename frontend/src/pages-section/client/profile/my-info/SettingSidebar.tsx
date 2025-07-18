"use client";

import { cn } from "@/lib/utils";
import type { SettingsSection } from "./SettingPage";

interface NavigationItem {
  label: string;
  section: SettingsSection;
}

interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}

const navigationData: NavigationSection[] = [
  {
    // title: "Settings",
    items: [{ label: "My Info", section: "my-info" }],
  },
  {
    // title: "Billing",
    items: [{ label: "Billing & Payments", section: "billing" }],
  },
  {
    // title: "User Settings",
    items: [{ label: "Password & Security", section: "password-security" }],
  },
];

interface SettingsSidebarProps {
  activeSection: SettingsSection;
  onSectionChange: (section: SettingsSection) => void;
}

export function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="w-full md:w-56 lg:w-80 bg-background md:border-r border-border p-6">
      <h2 className="text-3xl font-semibold text-foreground">Settings</h2>
      <nav className="space-y-3 mt-5 border-b md:border-none pb-8 md:pb-0">
        {navigationData.map((section, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-foreground">
              {section.title}
            </h2>
            {section.items.length > 0 && (
              <ul>
                {section.items.map((item, index) => (
                  <li key={index} className="mt-0">
                    <button
                      onClick={() => onSectionChange(item.section)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                        activeSection === item.section
                          ? "bg-primary/10 text-primary border-l-2 border-primary"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
