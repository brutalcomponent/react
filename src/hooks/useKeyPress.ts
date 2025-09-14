/**
 * @file src/hooks/useKeyPress.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Hook for handling keyboard shortcuts
 */
"use client";
import { useEffect, useCallback, useRef } from "react";

export interface UseKeyPressOptions {
  element?: HTMLElement | null;
  preventDefault?: boolean;
  stopPropagation?: boolean;
  enabled?: boolean;
}

export function useKeyPress(
  keys: string | string[],
  handler: (event: KeyboardEvent) => void,
  options: UseKeyPressOptions = {},
) {
  const {
    element = null,
    preventDefault = true,
    stopPropagation = false,
    enabled = true,
  } = options;

  const savedHandler = useRef(handler);

  // Update ref when handler changes
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  const eventHandler = useCallback(
    (event: KeyboardEvent) => {
      const keysArray = Array.isArray(keys) ? keys : [keys];

      if (
        keysArray.some((key) => {
          if (key.includes("+")) {
            // Handle modifier keys (e.g., 'Ctrl+S')
            const parts = key.split("+").map((p) => p.trim().toLowerCase());
            const modifiers = parts.slice(0, -1);
            const mainKey = parts[parts.length - 1];

            const modifierChecks = {
              ctrl: event.ctrlKey,
              cmd: event.metaKey,
              alt: event.altKey,
              shift: event.shiftKey,
            };

            const modifiersMatch = modifiers.every(
              (mod) => modifierChecks[mod as keyof typeof modifierChecks],
            );

            return modifiersMatch && event.key.toLowerCase() === mainKey;
          }

          return event.key === key;
        })
      ) {
        if (preventDefault) event.preventDefault();
        if (stopPropagation) event.stopPropagation();
        savedHandler.current(event);
      }
    },
    [keys, preventDefault, stopPropagation],
  );

  useEffect(() => {
    if (!enabled) return;

    const targetElement = element || document;
    targetElement.addEventListener("keydown", eventHandler as any);

    return () => {
      targetElement.removeEventListener("keydown", eventHandler as any);
    };
  }, [element, enabled, eventHandler]);
}
