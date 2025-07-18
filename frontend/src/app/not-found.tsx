"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-4">
          404 - Page Not Found
        </h2>
        <p className="text-muted-foreground mb-6">
          Could not find the requested resource
        </p>
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
