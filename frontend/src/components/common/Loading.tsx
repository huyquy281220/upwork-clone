import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        {/* Upwork Logo */}
        <div className="flex items-center justify-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-foreground font-bold text-lg">U</span>
          </div>
          <span className="text-2xl font-semibold text-foreground">Upwork</span>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
        </div>

        {/* Loading Text */}
        <p className="text-foreground text-sm">Loading...</p>
      </div>
    </div>
  );
}
