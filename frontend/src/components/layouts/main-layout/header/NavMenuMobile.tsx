import Link from "next/link";

interface NavMenuMobileProps {
  isOpen: boolean;
}

export const NavMenuMobile = ({ isOpen }: NavMenuMobileProps) => {
  return (
    <div className="md:hidden absolute top-16 left-0 right-0 bg-gray-900 p-4 flex flex-col space-y-3">
      <Link
        href="/find-work"
        className="px-3 py-2 text-sm hover:bg-gray-800 rounded"
      >
        Find work
      </Link>
      <Link
        href="/deliver-work"
        className="px-3 py-2 text-sm hover:bg-gray-800 rounded"
      >
        Deliver work
      </Link>
      <Link
        href="/finances"
        className="px-3 py-2 text-sm hover:bg-gray-800 rounded"
      >
        Manage finances
      </Link>
      <Link
        href="/messages"
        className="px-3 py-2 text-sm hover:bg-gray-800 rounded"
      >
        Messages
      </Link>
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-800 text-white text-sm rounded py-2 pl-8 pr-2 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
        />
        <svg
          className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
    </div>
  );
};
