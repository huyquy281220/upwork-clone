"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const footerLinks = [
  {
    title: "For Clients",
    links: [
      { label: "How to Hire", href: "#" },
      { label: "Talent Marketplace", href: "#" },
      { label: "Project Catalog", href: "#" },
      { label: "Talent Scout", href: "#" },
      { label: "Enterprise", href: "#" },
      { label: "Payroll Services", href: "#" },
    ],
  },
  {
    title: "For Talent",
    links: [
      { label: "How to Find Work", href: "#" },
      { label: "Direct Contracts", href: "#" },
      { label: "Find Freelance Jobs", href: "#" },
      { label: "Worldwide", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help & Support", href: "#" },
      { label: "Success Stories", href: "#" },
      { label: "Upwork Reviews", href: "#" },
      { label: "Resources", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Community", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Investor Relations", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Our Impact", href: "#" },
      { label: "Press", href: "#" },
      { label: "Contact Us", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: <Facebook className="h-5 w-5" />, href: "#" },
  { icon: <Twitter className="h-5 w-5" />, href: "#" },
  { icon: <Instagram className="h-5 w-5" />, href: "#" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
  { icon: <Youtube className="h-5 w-5" />, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-main rounded-lg">
      <div className="container mx-auto px-4 py-12 bg-main">
        {/* Main Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-main">
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="font-semibold text-white text-lg mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="mt-12 pt-8 border-t bg-main border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-400 hover:text-white"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            <div className="text-gray-400 text-sm">
              © 2015 - {new Date().getFullYear()} Upwork® Global Inc.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
