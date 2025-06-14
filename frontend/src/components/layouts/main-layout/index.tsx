"use client";

import { ChildrenProps } from "@/types";
import Footer from "./footer";
import MainHeader from "./header";
import { usePathname } from "next/navigation";
import ThemeProvider from "@/providers/ThemeProvider";

export default function MainLayout({ children }: ChildrenProps) {
  const pathname = usePathname();

  const noLayoutRoutes = [
    "/sign-in",
    "/sign-up",
    "/sign-up/select-role",
    "/auth-redirect",
  ];

  const isNoLayout = pathname ? noLayoutRoutes.includes(pathname) : false;

  if (isNoLayout) {
    return (
      <div className="w-full max-w-[120rem] mx-auto">
        <div className="max-w-[100rem] mx-auto">{children}</div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="w-full max-w-[120rem] mx-auto">
        <div className="max-w-[100rem] mx-auto">
          <MainHeader />
          <div className="pt-11 md:pt-0">{children}</div>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
