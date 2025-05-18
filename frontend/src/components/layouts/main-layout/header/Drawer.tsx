"use client";

import { X } from "lucide-react";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer = ({ isOpen, onClose }: DrawerProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-full bg-main shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Drawer Title</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Drawer Content */}
      <div className="p-4">
        <p className="mb-4">
          This is a drawer that slides in from the right side of the screen.
        </p>
        <p className="mb-4">You can put any content you want in here.</p>
        <ul className="list-disc pl-5 mb-4">
          <li className="mb-2">Navigation links</li>
          <li className="mb-2">Settings</li>
          <li className="mb-2">User profile</li>
          <li className="mb-2">Additional information</li>
        </ul>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors mt-4"
        >
          Close Drawer
        </button>
      </div>
    </div>
  );
};
