import Link from "next/link";
import MobileHeader from "./mobile";
import NavMenu from "./NavMenu";
import RightSection from "./right-section";
import { Logo } from "@/components/icons/Logo";

export default function MainHeader() {
  return (
    <>
      {/* Mobile Header - Only visible on small screens */}
      <MobileHeader />

      {/* Desktop Header - Hidden on small screens */}
      <header className="dark:bg-main py-4 px-6 hidden md:flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link href="/" className="font-bold text-xl mr-6">
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
