"use client";

import { useState } from "react";

import { SettingsSidebar } from "./SettingSidebar";
import { SwapContent } from "./SwapContent";

export type SettingsSection = "my-info" | "billing" | "password-security";

export function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("my-info");

  return (
    <div className="min-h-screen bg-background text-foreground pb-4 sm:pb-0">
      <div className="flex flex-col md:flex-row">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 lg:p-8">
          <SwapContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
}
