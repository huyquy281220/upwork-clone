import React from "react";
import Link from "next/link";

export default function MobileAppLinks() {
  return (
    <div className="flex gap-2">
      <Link
        href="https://apps.apple.com/app/upwork"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </div>
      </Link>
      <Link
        href="https://play.google.com/store/apps/details?id=com.upwork.android"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" width="24" height="24">
            <path d="M17.9 5c.1 0 .2.1.3.1v13.7c0 .1-.1.2-.1.3l-7.7-7zm-3 9.7c0 .2-.3.4-.5.4l-1.7.2-1.7-1.7 1.7-1.7 1.7.2c.3 0 .5.2.5.4v2.2zm-1.3-2.5l6.1-3.4c.1-.1.4 0 .4.2 0 .1 0 .2-.1.2l-6.4 3.5 8.1 8.1c.2.2.3.2.5 0 .1-.1.1-.1.1-.2v-13c0-.3-.2-.5-.4-.5-.1 0-.2 0-.3.1L3.9 11.9c-.2.1-.3.3-.3.5 0 .2.1.4.3.5l3.3 1.7 7.1-4.3c.1-.1.3 0 .4.1-.1.1-.1.2-.2.2zM5 15.2l1.5.8 1.2 1.2L9 16l-2.3-1.3-1.7.5z" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
