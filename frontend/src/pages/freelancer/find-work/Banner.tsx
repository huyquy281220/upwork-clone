import { X } from "lucide-react";

export function Banner() {
  return (
    <div className="bg-green-500 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm font-medium">
              Upwork 101 will guide you through the basics of our platform.
            </p>
            <p className="text-sm opacity-90">
              Learn how to get started on Upwork
            </p>
          </div>
          <button className="text-green-600 hover:bg-gray-100">
            Explore Upwork 101
          </button>
        </div>
        <button className="hover:bg-green-600">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
