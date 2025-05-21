"use client";

import { ChildrenProps } from "@/types";
import Footer from "./footer";
import MainHeader from "./header";
import { usePathname } from "next/navigation";

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();

  const noLayoutRoutes = ["/sign-in", "/sign-up"];

  const isNoLayout = noLayoutRoutes.includes(pathname);

  return (
    <div className="w-full max-w-[120rem] mx-auto ">
      <div className="max-w-[100rem] mx-auto">
        {!isNoLayout && <MainHeader />}
        {children}
        {!isNoLayout && <Footer />}
      </div>
    </div>
  );
}
