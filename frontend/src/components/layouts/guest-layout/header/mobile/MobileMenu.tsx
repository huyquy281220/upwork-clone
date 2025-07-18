import Link from "next/link";
// import { ChevronRight } from "lucide-react";

// interface MobileMenuProps {
//   links: {
//     label: string;
//     href: string;
//     hasDropdown?: boolean;
//   }[];
// }

export default function MobileMenu() {
  return (
    <div className="md:hidden bg-white border-b border-gray-200 px-4 py-4">
      {/* <nav className="flex flex-col space-y-4">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="flex items-center justify-between py-2 text-gray-700 font-medium"
          >
            {link.label}
            {link.hasDropdown && <ChevronRight className="h-4 w-4" />}
          </Link>
        ))}
      </nav> */}

      <div className="mt-6 flex flex-col space-y-3">
        <Link href="/sign-in" className="w-full">
          <button className="w-full">Log In</button>
        </Link>
        <Link href="/sign-up" className="w-full">
          <button className="w-full py-2 rounded-md bg-green-600 hover:bg-green-700 ">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
