/**
 * @file src/hooks/useClickOutside.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Hook for detecting clicks outside an element
 */
"use client";
import { useEffect, useRef, RefObject } from "react";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled: boolean = true,
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [handler, enabled]);

  return ref;
}
