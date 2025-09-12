/**
 * @file src/hooks/useClipboard.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Hook for clipboard operations with feedback
 */
import { useState, useCallback } from "react";

export interface UseClipboardOptions {
  timeout?: number;
  onSuccess?: (text: string) => void;
  onError?: (error: Error) => void;
}

export function useClipboard(options: UseClipboardOptions = {}) {
  const { timeout = 2000, onSuccess, onError } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        onSuccess?.(text);

        setTimeout(() => {
          setCopied(false);
        }, timeout);

        return true;
      } catch (err) {
        const error = err instanceof Error ? err : new Error("Failed to copy");
        setError(error);
        setCopied(false);
        onError?.(error);
        return false;
      }
    },
    [timeout, onSuccess, onError],
  );

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
  }, []);

  return { copy, copied, error, reset };
}
