"use client";

import { ChildrenProps } from "@/types";
import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children }: ChildrenProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
