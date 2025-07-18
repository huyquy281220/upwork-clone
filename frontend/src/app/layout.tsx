export const dynamic = "force-dynamic";
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
  title: "Upwork Clone - Find Freelancers & Jobs",
  description:
    "Connect with skilled freelancers or find your next project. A modern platform for remote work and professional services.",
  keywords: ["freelancer", "jobs", "remote work", "hire", "projects"],

  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  openGraph: {
    title: "Upwork Clone - Find Freelancers & Jobs",
    description:
      "Connect with skilled freelancers or find your next project. A modern platform for remote work and professional services.",
    siteName: "Upwork Clone",
    images: ["/og-image.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "Upwork Clone - Find Freelancers & Jobs",
    description:
      "Connect with skilled freelancers or find your next project. A modern platform for remote work and professional services.",
    images: ["/og-image.png"],
  },

  manifest: "/site.webmanifest",
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
