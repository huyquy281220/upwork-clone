"use client";

import { cn } from "@/lib/utils";
import type { SettingsSection } from "./SettingsPage";

interface NavigationItem {
  label: string;
  section: SettingsSection;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

const navigationData: NavigationSection[] = [
  {
    title: "Settings",
    items: [],
  },
  {
    title: "Billing",
    items: [{ label: "Payout methods", section: "payout-methods" }],
  },
  {
    title: "User Settings",
    items: [
      { label: "Contact Info", section: "contact-info" },
      { label: "Get Paid", section: "get-paid" },
      { label: "Password & Security", section: "password-security" },
    ],
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
    <aside className="w-56 lg:w-80 bg-background border-r border-border p-6">
      <nav className="space-y-6">
        {navigationData.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {section.title}
            </h2>
            {section.items.length > 0 && (
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.label}>
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
