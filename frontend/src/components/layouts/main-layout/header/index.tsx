"use client";

import Link from "next/link";
import MobileHeader from "./mobile";
import NavMenu from "./NavMenu";
import RightSection from "./right-section";
import { Logo } from "@/components/icons/Logo";
import { getCookie } from "@/lib/cookie";

export default function MainHeader() {
  const role = getCookie("role");

  const getRedirectUrlByRole = () => {
    switch (role) {
      case "CLIENT":
        return "/client/dashboard";
      case "FREELANCER":
        return "/freelancer/find-work";
      default:
        return "/";
    }
  };

  return (
    <>
      {/* Mobile Header - Only visible on small screens */}
      <MobileHeader />

      {/* Desktop Header - Hidden on small screens */}
      <header className="bg-background py-4 px-6 hidden md:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link
            // href={"/client/dashboard"}
            href={getRedirectUrlByRole()!}
            className="font-bold text-xl mr-6"
          >
            <Logo className="w-24 h-6" />
          </Link>

          {/* Main Navigation */}
          <NavMenu />
        </div>

        {/* Right Side Controls */}
        <RightSection />
      </header>
    </>
  );
}
