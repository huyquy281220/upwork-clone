"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MainHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#181818] text-white py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="text-white font-bold text-xl mr-6">
          upwork
        </Link>

        {/* Main Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <div className="relative group">
            <button className="flex items-center px-3 py-1 text-sm hover:bg-gray-800 rounded">
              Find work
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center px-3 py-1 text-sm hover:bg-gray-800 rounded">
              Deliver work
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center px-3 py-1 text-sm hover:bg-gray-800 rounded">
              Manage finances
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
          </div>

          <Link
            href="/messages"
            className="px-3 py-1 text-sm hover:bg-gray-800 rounded"
          >
            Messages
          </Link>
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          ></path>
        </svg>
      </button>

      {/* Right Side Controls */}
      <div className="hidden md:flex items-center space-x-2">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 text-white text-sm rounded py-1 pl-8 pr-2 w-64 focus:outline-none focus:ring-1 focus:ring-green-500"
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

        {/* Jobs Dropdown */}
        <div className="relative group">
          <button className="flex items-center px-3 py-1 text-sm hover:bg-gray-800 rounded">
            Jobs
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Help Icon */}
        <button className="p-1 rounded-full hover:bg-gray-800">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M12 21a9 9 0 100-18 9 9 0 000 18z"
            ></path>
          </svg>
        </button>

        {/* Notifications */}
        <button className="p-1 rounded-full hover:bg-gray-800 relative">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
            1
          </span>
        </button>

        {/* Settings */}
        <button className="p-1 rounded-full hover:bg-gray-800">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
        </button>

        {/* User Avatar */}
        <button className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
          <Image
            src="/placeholder-avatar.jpg"
            alt="User Avatar"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
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
      )}
    </header>
  );
}
