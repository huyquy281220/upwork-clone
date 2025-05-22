"use client";

import MainLayout from "@/components/layouts/main-layout";
import GuestLayout from "@/components/layouts/guest-layout";
import { ChildrenProps } from "@/types";
import { usePathname } from "next/navigation";

export const LayoutWrapper = ({ children }: ChildrenProps) => {
  const pathname = usePathname();
  const Layout = pathname === "/" ? GuestLayout : MainLayout;

  return (
    <div className="w-full max-w-[120rem] mx-auto">
      <div className="max-w-[100rem] mx-auto">
        <Layout>{children}</Layout>
      </div>
    </div>
  );
};
