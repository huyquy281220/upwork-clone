"use client";

import { queryClient } from "@/lib/react-query";
import { ChildrenProps } from "@/types";
import { QueryClientProvider } from "@tanstack/react-query";

export default function QueryProvider({ children }: ChildrenProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
