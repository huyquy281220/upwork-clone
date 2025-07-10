"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface SidebarItem {
  id: string;
  label: string;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { id: "my-info", label: "My info", active: true },
  { id: "billing", label: "Billing & Payments" },
  { id: "password", label: "Password & Security" },
  { id: "membership", label: "Membership Settings" },
  { id: "teams", label: "Teams" },
  { id: "notifications", label: "Notification Settings" },
  { id: "members", label: "Members & Permissions" },
  { id: "tax", label: "Tax Information" },
  { id: "connected", label: "Connected Services" },
];

export function SettingsSidebar() {
  const [activeItem, setActiveItem] = useState("my-info");

  return (
    <div className="w-64 bg-background border-r border-border p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-8">Settings</h1>
      <nav className="space-y-1">
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            className={cn(
              "w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors",
              activeItem === item.id
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
