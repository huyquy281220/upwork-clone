"use client";

import { ChildrenProps } from "@/types";
import Footer from "./footer";
import MainHeader from "./header";
import { usePathname } from "next/navigation";
import ThemeProvider from "@/providers/ThemeProvider";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import { Toaster } from "@/components/ui/sonner";

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
        <div className="max-w-[100rem] mx-auto">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="w-full max-w-[120rem] mx-auto">
        <div className="max-w-[100rem] mx-auto">
          <MainHeader />
          <div className="pt-20 md:pt-0">
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  background: "rgb(22,163,74)",
                  color: "white",
                  fontSize: "1rem",
                },
                classNames: {
                  description: "text-sm",
                },
              }}
            />
          </div>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}
