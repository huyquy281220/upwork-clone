"use client";

interface LoadingProps {
  progress: number;
}

export function LoadingComp({ progress }: LoadingProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-green-500/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg mx-auto">
            <span className="text-white font-bold text-2xl">u</span>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="space-y-6">
          {/* Animated Briefcase */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 bg-green-500 rounded-sm animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-80 mx-auto space-y-3">
            <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              <span>Loading ...</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className="text-slate-500">
              Please wait while we load your content
            </p>
          </div>

          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 bg-green-400 rounded-full animate-bounce"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: "1.4s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/5 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        </div>
      </div>
    </div>
  );
}
