"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { NavMenu } from "./NavMenu";
import { Logo } from "@/assets/svg";
import { Drawer } from "./Drawer";
import { RightSection } from "./right-section";

export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="bg-[#181818] text-white py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center justify-between w-full">
        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        <Link href="/" className="text-white font-bold text-xl mr-6">
          <Image src={Logo} alt="logo" width={100} height={100} />
        </Link>

        {/* Main Navigation */}
        <NavMenu />

        <div className="relative md:hidden">
          <button onClick={() => setIsDrawerOpen(true)}>Open Drawer</button>
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          />
        </div>
      </div>

      {/* Right Side Controls */}
      <RightSection />
    </header>
  );
}
