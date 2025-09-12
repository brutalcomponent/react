/**
 * @file src/hooks/useFocusTrap.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Hook for trapping focus within an element (useful for modals)
 */
import { useEffect, useRef } from "react";

export function useFocusTrap(enabled: boolean = true) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    firstFocusable?.focus();

    return () => {
      element.removeEventListener("keydown", handleKeyDown);
    };
  }, [enabled]);

  return ref;
}
