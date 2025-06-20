"use client";

import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";

interface ToastProps {
  title: string;
  description?: string;
  duration?: number;
  position?:
    | "top-left"
    | "top-right"
    | "top-center"
    | "bottom-left"
    | "bottom-right"
    | "bottom-center";
  type?: "success" | "error";
  onClose?: () => void;
}

export function ModernToast({
  title,
  description,
  duration = 5000,
  position = "top-right",
  type = "success",
  onClose,
}: ToastProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };

  // Position classes
  const getPositionClasses = () => {
    const positions = {
      "top-left": "top-4 left-4",
      "top-right": "top-4 right-4",
      "top-center": "top-4 left-1/2 -translate-x-1/2",
      "bottom-left": "bottom-4 left-4",
      "bottom-right": "bottom-4 right-4",
      "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    };
    return positions[position];
  };

  // Animation classes based on position
  const getAnimationClasses = () => {
    if (isExiting) {
      const exitAnimations = {
        "top-left": "-translate-x-full opacity-0 scale-95",
        "top-right": "translate-x-full opacity-0 scale-95",
        "top-center": "-translate-y-full opacity-0 scale-95",
        "bottom-left": "-translate-x-full opacity-0 scale-95",
        "bottom-right": "translate-x-full opacity-0 scale-95",
        "bottom-center": "translate-y-full opacity-0 scale-95",
      };
      return exitAnimations[position];
    }
    return "translate-x-0 translate-y-0 opacity-100 scale-100";
  };

  // Type-based styling
  const getTypeStyles = () => {
    const styles = {
      success: {
        gradient: "from-emerald-500 to-green-600",
        shadow: "shadow-emerald-500/25 hover:shadow-emerald-500/30",
        border: "border-emerald-400/20",
        bgGradient: "from-emerald-400/20 to-green-500/20",
      },
      error: {
        gradient: "from-red-500 to-rose-600",
        shadow: "shadow-red-500/25 hover:shadow-red-500/30",
        border: "border-red-400/20",
        bgGradient: "from-red-400/20 to-rose-500/20",
      },
    };
    return styles[type];
  };

  const getIcon = () => {
    return type === "success" ? (
      <CheckCircle className="w-5 h-5 text-white" />
    ) : (
      <AlertCircle className="w-5 h-5 text-white" />
    );
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed z-50 ${getPositionClasses()}`}>
      <div
        className={`
          relative overflow-hidden rounded-xl bg-gradient-to-r ${
            getTypeStyles().gradient
          }
          shadow-lg ${getTypeStyles().shadow} backdrop-blur-sm border ${
          getTypeStyles().border
        }
          transform transition-all duration-300 ease-out
          ${getAnimationClasses()}
          hover:shadow-xl hover:scale-105
          min-w-[320px] max-w-md
        `}
      >
        {/* Animated background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${
            getTypeStyles().bgGradient
          } animate-pulse`}
        />

        {/* Content */}
        <div className="relative p-4 flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              {getIcon()}
            </div>
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm leading-5">
              {title}
            </h3>
            {description && (
              <p className="text-emerald-50 text-xs mt-1 leading-4 opacity-90">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white/40 rounded-full transition-all duration-300 ease-linear"
            style={{
              animation: `shrink ${duration}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
}
