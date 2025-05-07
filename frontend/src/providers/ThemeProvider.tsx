"use client";

import { PageProps } from "@/types";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export const ThemeProvider = ({ children }: PageProps) => {
  return (
    <NextThemeProvider attribute="class" defaultTheme="light">
      {children}
    </NextThemeProvider>
  );
};
