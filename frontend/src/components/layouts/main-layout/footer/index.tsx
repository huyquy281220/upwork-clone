import React from "react";
import FooterLinks from "./FooterLinks";
import SocialLinks from "./SocialLinks";
import MobileAppLinks from "./MobileAppLinks";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <footer className="dark:bg-main py-12 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <FooterLinks
            title="About"
            links={[
              { label: "About Us", href: "/about" },
              { label: "Feedback", href: "/feedback" },
              { label: "Trust, Safety & Security", href: "/trust-safety" },
            ]}
          />

          <FooterLinks
            title="Help & Support"
            links={[
              { label: "Help & Support", href: "/help" },
              { label: "Upwork Foundation", href: "/foundation" },
              { label: "Terms of Service", href: "/terms" },
            ]}
          />

          <FooterLinks
            title="Privacy"
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "CA Notice at Collection", href: "/ca-notice" },
              { label: "Cookie Settings", href: "/cookie-settings" },
              { label: "Accessibility", href: "/accessibility" },
            ]}
          />

          <FooterLinks
            title="Apps"
            links={[
              { label: "Desktop App", href: "/desktop-app" },
              { label: "Cookie Policy", href: "/cookie-policy" },
              { label: "Enterprise Solutions", href: "/enterprise" },
              { label: "Release notes", href: "/release-notes" },
            ]}
          />
        </div>

        <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4 md:mb-0">
            <div className="text-gray-400 mr-4">Follow Us</div>
            <SocialLinks />
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="text-gray-400 mr-4">Mobile app</div>
            <MobileAppLinks />
          </div>
        </div>

        <Copyright />
      </div>
    </footer>
  );
}
