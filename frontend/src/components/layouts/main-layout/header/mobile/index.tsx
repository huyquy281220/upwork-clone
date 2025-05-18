"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X } from "lucide-react";
import { Logo } from "@/assets/svg";
import { MobileNavPanel } from "./MobileNavPanel";
import { MobileSearchPanel } from "./MobileSearchPanel";

export const MobileHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
    <>
      <header className="bg-main text-white py-3 px-4 flex items-center justify-between md:hidden">
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
          <Image
            src={Logo}
            alt="Upwork"
            width={100}
            height={24}
            className="h-6 w-auto"
          />
        </Link>

        {/* Right section - Search icon */}
        <button
          onClick={toggleSearch}
          className="p-1 focus:outline-none"
          aria-label={isSearchOpen ? "Close search" : "Open search"}
        >
          <Search size={24} />
        </button>
      </header>

      {/* Navigation panel - slides from top */}
      <MobileNavPanel isOpen={isNavOpen} />

      {/* Search panel - slides from right */}
      <MobileSearchPanel
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};
