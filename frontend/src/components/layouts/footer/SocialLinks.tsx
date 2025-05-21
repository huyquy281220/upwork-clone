import React from "react";
import Link from "next/link";
import { Facebook, Linkedin, Twitter, Youtube, Instagram } from "lucide-react";

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

export default function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      icon: <Facebook size={20} />,
      href: "https://facebook.com/upwork",
      label: "Facebook",
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://linkedin.com/company/upwork",
      label: "LinkedIn",
    },
    {
      icon: <Twitter size={20} />,
      href: "https://twitter.com/upwork",
      label: "Twitter",
    },
    {
      icon: <Youtube size={20} />,
      href: "https://youtube.com/upwork",
      label: "YouTube",
    },
    {
      icon: <Instagram size={20} />,
      href: "https://instagram.com/upwork",
      label: "Instagram",
    },
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          aria-label={link.label}
          className="text-gray-400 hover: transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
