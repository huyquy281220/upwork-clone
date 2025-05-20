// frontend/src/hooks/useScrollLock.ts
"use client";

import { useEffect, useCallback } from "react";

type ScrollLockOptions = {
  enabled?: boolean;
  scrollbarGap?: boolean;
  targetElement?: HTMLElement | null;
};

/**
 * Hook to prevent scrolling on a target element (defaults to body)
 *
 * @param options Configuration options
 * @param options.enabled Whether scroll lock is active (default: false)
 * @param options.scrollbarGap Add padding to prevent layout shift when scrollbar disappears (default: false)
 * @param options.targetElement Element to lock scrolling on (default: document.body)
 *
 * @example
 * // Basic usage
 * const { lockScroll, unlockScroll } = useScrollLock();
 *
 * // With a modal
 * const [isOpen, setIsOpen] = useState(false);
 * useScrollLock({ enabled: isOpen });
 *
 * // With custom element
 * const containerRef = useRef<HTMLDivElement>(null);
 * useScrollLock({ enabled: true, targetElement: containerRef.current });
 */
export function useScrollLock({
  enabled = false,
  scrollbarGap = false,
  targetElement = null,
}: ScrollLockOptions = {}) {
  // Memoize these functions to maintain reference stability between renders
  const lockScroll = useCallback(() => {
    const target = targetElement || document.body;

    // Store current overflow style
    const originalOverflow = target.style.overflow;

    // Store for layout shift prevention
    const hasScrollbar =
      window.innerWidth > document.documentElement.clientWidth;
    const scrollbarWidth = hasScrollbar
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    // Apply lock
    target.style.overflow = "hidden";

    // Prevent layout shift if scrollbar was visible
    if (scrollbarGap && hasScrollbar) {
      target.style.paddingRight = `${scrollbarWidth}px`;
    }

    return { originalOverflow, originalPadding: target.style.paddingRight };
  }, [targetElement, scrollbarGap]);

  const unlockScroll = useCallback(
    (originalStyles?: {
      originalOverflow: string;
      originalPadding: string;
    }) => {
      const target = targetElement || document.body;

      // Restore original styles if provided, otherwise just clear
      if (originalStyles) {
        target.style.overflow = originalStyles.originalOverflow;
        target.style.paddingRight = originalStyles.originalPadding;
      } else {
        target.style.overflow = "";
        target.style.paddingRight = "";
      }
    },
    [targetElement]
  );

  // Primary effect for declarative usage
  useEffect(() => {
    if (!enabled) return;

    // Save styles and apply lock
    const originalStyles = lockScroll();

    // Cleanup function
    return () => {
      unlockScroll(originalStyles);
    };
  }, [enabled, lockScroll, unlockScroll]);

  return { lockScroll, unlockScroll };
}
