"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import MobileNavPanel from "./MobileNavPanel";
import MobileSearchPanel from "./MobileSearchPanel";
import { useScrollLock } from "@/hooks/useScrollLock";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons/Logo";

export default function MobileHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useScrollLock({
    enabled: isNavOpen || isSearchOpen,
    scrollbarGap: true,
  });

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
    // Close search panel if open
    if (isSearchOpen) setIsSearchOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close nav panel if open
    if (isNavOpen) setIsNavOpen(false);
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 md:hidden overflow-y-auto",
        isNavOpen || isSearchOpen ? "h-full z-50" : ""
      )}
    >
      <div className="relative z-50 py-3 px-4 flex items-center justify-between bg-background">
        {/* Left section - X or Menu icon */}
        <button
          onClick={toggleNav}
          className="p-1 focus:outline-none"
          aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        >
          <X size={24} />
        </button>

        {/* Center section - Logo */}
        <Link href="/" className="flex-1 flex justify-center">
          <Logo className="w-24 h-6" />
        </Link>

        {/* Right section - Search icon */}
        <button
          onClick={toggleSearch}
          className="p-1 focus:outline-none"
          aria-label={isSearchOpen ? "Close search" : "Open search"}
        >
          <Search size={24} />
        </button>
      </div>

      {/* Navigation panel - slides from top */}
      <MobileNavPanel isOpen={isNavOpen} />

      {/* Search panel - slides from right */}
      <MobileSearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
