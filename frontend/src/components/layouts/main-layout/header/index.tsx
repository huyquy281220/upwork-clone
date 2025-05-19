"use client";
import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/assets/svg";
import MobileHeader from "./mobile";
import NavMenu from "./NavMenu";
import RightSection from "./right-section";

export default function MainHeader() {
  return (
    <>
      {/* Mobile Header - Only visible on small screens */}
      <MobileHeader />

      {/* Desktop Header - Hidden on small screens */}
      <header className="bg-main text-white py-4 px-6 hidden md:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-xl mr-6">
            <Image src={Logo} alt="logo" width={100} height={100} />
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
