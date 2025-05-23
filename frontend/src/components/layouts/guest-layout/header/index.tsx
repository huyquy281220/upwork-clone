"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import MobileMenu from "./mobile/MobileMenu";

const navLinks = [
  { label: "Find Talent", href: "#", hasDropdown: true },
  { label: "Find Work", href: "#", hasDropdown: true },
  { label: "Why Upwork", href: "#", hasDropdown: true },
  { label: "Enterprise", href: "#" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <Image
                src="/placeholder.svg?height=32&width=120"
                alt="Upwork"
                width={120}
                height={32}
                className="h-8"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
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
            </nav>
          </div>

          {/* Search, Auth Buttons, Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:flex items-center text-gray-700 hover:text-green-600">
              <Search className="h-5 w-5" />
            </button>

            <div className="hidden md:flex items-center space-x-3">
              <button>
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-green-600 font-medium"
                >
                  Log In
                </Link>
              </button>
              <button className="w-24 py-1 rounded-lg bg-green-600 hover:bg-green-700 ">
                <Link href="/sign-up" className="text-white font-medium">
                  Sign up
                </Link>
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
      {isMenuOpen && <MobileMenu links={navLinks} />}
    </header>
  );
}
