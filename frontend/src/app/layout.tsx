import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./home.css";
import SessionWrapper from "@/providers/SessionWrapper";
import QueryProvider from "@/providers/QueryProvider";
import { LayoutWrapper } from "@/providers/LayoutWrapper";
import "swiper/css";
import "swiper/css/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <SessionWrapper>
            <LayoutWrapper>{children}</LayoutWrapper>
          </SessionWrapper>
        </QueryProvider>
      </body>
    </html>
  );
}
