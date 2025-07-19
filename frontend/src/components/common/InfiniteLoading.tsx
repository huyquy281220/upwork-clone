"use client";

import { useEffect, useState } from "react";

interface InfiniteLoadingProps {
  message?: string;
  subMessage?: string;
}

export function InfiniteLoading({
  message = "Loading...",
  subMessage = "Please wait while we prepare your page",
}: InfiniteLoadingProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20 animate-float-slow"
            style={{
              width: `${50 + i * 12}px`, // Fixed: 50, 62, 74, 86, 98, 110, 122, 134
              height: `${50 + i * 12}px`, // Fixed: same as width
              left: `${10 + i * 12}%`, // Fixed: 10%, 22%, 34%, 46%, 58%, 70%, 82%, 94%
              top: `${15 + i * 10}%`, // Fixed: 15%, 25%, 35%, 45%, 55%, 65%, 75%, 85%
              background: `linear-gradient(45deg, ${
                i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#3b82f6" : "#8b5cf6"
              }, transparent)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + (i % 3)}s`, // Fixed: 4s, 5s, 6s pattern
            }}
          />
        ))}

        {/* Gradient Waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-green-500/20 to-transparent animate-wave-1" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-l from-blue-500/20 to-transparent animate-wave-2" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-purple-500/20 to-transparent animate-wave-3" />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8 text-center max-w-md mx-4">
        {/* Logo with Infinite Pulse */}
        <div className="relative">
          {/* Outer Rings */}
          <div className="absolute inset-0 w-32 h-32 border-2 border-green-400/30 rounded-full animate-ping" />
          <div className="absolute inset-2 w-28 h-28 border-2 border-blue-400/20 rounded-full animate-ping animation-delay-500" />
          <div className="absolute inset-4 w-24 h-24 border-2 border-purple-400/10 rounded-full animate-ping animation-delay-1000" />

          {/* Main Logo */}
          <div className="relative w-32 h-32 bg-gradient-to-br from-green-400 via-green-500 to-green-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
            <div className="absolute inset-0 bg-gradient-to-br from-green-300/50 to-transparent rounded-full animate-spin-slow" />
            <span className="relative text-white font-bold text-4xl z-10">
              u
            </span>
          </div>
        </div>

        {/* Infinite Loading Spinner */}
        <div className="relative">
          {/* Multiple Rotating Rings */}
          <div className="w-16 h-16 relative">
            <div className="absolute inset-0 border-4 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
            <div className="absolute inset-2 border-4 border-blue-400/30 border-r-blue-400 rounded-full animate-spin-reverse" />
            <div className="absolute inset-4 border-4 border-purple-400/30 border-b-purple-400 rounded-full animate-spin animation-delay-500" />
          </div>
        </div>

        {/* Loading Text with Animation */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white animate-pulse-text">
            {message}
            {dots}
          </h2>
          <p className="text-slate-300 text-lg animate-fade-in-out">
            {subMessage}
          </p>
        </div>

        {/* Progress Bars (Infinite) */}
        <div className="w-full max-w-xs space-y-3">
          {/* Main Progress Bar */}
          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-progress-infinite" />
          </div>

          {/* Secondary Progress Bar */}
          <div className="w-full h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-progress-infinite-reverse animation-delay-1000" />
          </div>
        </div>

        {/* Animated Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-r from-green-400 to-green-600 rounded-full animate-bounce-infinite"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float-random"
              style={{
                left: `${10 + i * 8}%`,
                top: `${20 + (i % 4) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${3 + (i % 3)}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.3;
          }
        }

        @keyframes wave-1 {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes wave-2 {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes wave-3 {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(-100%);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse-text {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }

        @keyframes fade-in-out {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes progress-infinite {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes progress-infinite-reverse {
          0% {
            transform: translateX(100%);
          }
          50% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes bounce-infinite {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }

        @keyframes float-random {
          0%,
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
            opacity: 0.2;
          }
          25% {
            transform: translateY(-15px) translateX(10px) rotate(90deg);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-30px) translateX(-5px) rotate(180deg);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-10px) translateX(-15px) rotate(270deg);
            opacity: 0.3;
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        .animate-wave-1 {
          animation: wave-1 8s linear infinite;
        }
        .animate-wave-2 {
          animation: wave-2 10s linear infinite;
        }
        .animate-wave-3 {
          animation: wave-3 12s linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }
        .animate-pulse-text {
          animation: pulse-text 2s ease-in-out infinite;
        }
        .animate-fade-in-out {
          animation: fade-in-out 4s ease-in-out infinite;
        }
        .animate-progress-infinite {
          animation: progress-infinite 2s ease-in-out infinite;
        }
        .animate-progress-infinite-reverse {
          animation: progress-infinite-reverse 2.5s ease-in-out infinite;
        }
        .animate-bounce-infinite {
          animation: bounce-infinite 1.5s ease-in-out infinite;
        }
        .animate-float-random {
          animation: float-random 4s ease-in-out infinite;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
}
