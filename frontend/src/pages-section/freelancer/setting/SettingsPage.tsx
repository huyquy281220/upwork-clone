"use client";

import { useState } from "react";
import { SwapContent } from "./SwapContent";
import { SettingsSidebar } from "./SettingSidebar";

export type SettingsSection =
  | "payout-methods"
  | "contact-info"
  | "get-paid"
  | "password-security";

export function SettingsPage() {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("payout-methods");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex">
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="flex-1 p-6 lg:p-8">
          <SwapContent activeSection={activeSection} />
        </main>
      </div>
    </div>
  );
}
