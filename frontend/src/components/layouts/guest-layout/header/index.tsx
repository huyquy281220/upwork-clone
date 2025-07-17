"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileMenu from "./mobile/MobileMenu";
import { Logo } from "@/components/icons/Logo";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "@/lib/cookie";

// const navLinks = [
//   { label: "Find Talent", href: "#", hasDropdown: true },
//   { label: "Find Work", href: "#", hasDropdown: true },
//   { label: "Why Upwork", href: "#", hasDropdown: true },
//   { label: "Enterprise", href: "#" },
// ];

export default function Header() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignUp = () => {
    if (getCookie("role")) {
      deleteCookie("role");
    }
    router.push("/sign-up");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <Logo className="w-[108px] h-[28px]" />
            </Link>

            {/* Desktop Navigation */}
            {/* <nav className="hidden md:flex space-x-6">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center text-gray-700 hover:text-green-600 font-medium"
                >
                  {link.label}
                  {link.hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
              ))}
            </nav> */}
          </div>

          {/* Search, Auth Buttons, Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-3">
              <button className="px-4 py-1 rounded-lg border border-[#181818] hover:text-green-600">
                <Link href="/sign-in" className=" font-medium">
                  Log In
                </Link>
              </button>
              <button
                className="px-4 py-1 rounded-lg bg-green-600 hover:bg-green-700"
                onClick={handleSignUp}
              >
                <p className="text-white font-medium">Sign up</p>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && <MobileMenu />}
    </header>
  );
}
