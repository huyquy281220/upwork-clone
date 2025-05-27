"use client";

import { PageProps } from "@/types";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export default function ThemeProvider({ children }: PageProps) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      // enableSystem
      // disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  );
}
