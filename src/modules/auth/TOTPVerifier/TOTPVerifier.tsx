/**
 * @file src/modules/auth/TOTPVerifier/TOTPVerifier.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * TOTP verification input component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TOTPVerifierProps {
  length?: number;
  onVerify: (code: string) => void;
  error?: string;
  loading?: boolean;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

export const TOTPVerifier: React.FC<TOTPVerifierProps> = ({
  length = 6,
  onVerify,
  error,
  loading = false,
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const sizeClasses = getSizeClasses(size);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (values.every((v) => v !== "") && values.join("").length === length) {
      onVerify(values.join(""));
    }
  }, [values, length, onVerify]);

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow a single numeric char
      if (value.length > 1) value = value[0];
      if (value && !/^\d$/.test(value)) return;

      setValues((prev) => {
        const next = [...prev];
        next[index] = value;
        return next;
      });

      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [length],
  );

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !values[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      if (e.key === "ArrowRight" && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    },
    [length, values],
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text/plain").slice(0, length);
      const digits = pasted.split("").filter((c) => /^\d$/.test(c));
      if (!digits.length) return;

      setValues((prev) => {
        const next = [...prev];
        digits.forEach((d, i) => {
          if (i < length) next[i] = d;
        });
        return next;
      });

      const lastIndex = Math.min(digits.length, length) - 1;
      inputRefs.current[lastIndex]?.focus();
    },
    [length],
  );

  const getBoxSize = () => {
    // Responsive sizes based on size prop
    switch (size) {
      case "xs":
        return { w: "w-10", h: "h-12", text: "text-lg" };
      case "sm":
        return { w: "w-11", h: "h-12", text: "text-xl" };
      case "md":
        return { w: "w-12", h: "h-14", text: "text-2xl" };
      case "lg":
        return { w: "w-14", h: "h-16", text: "text-3xl" };
    }
  };
  const box = getBoxSize();

  // Fix the ref callback to return void
  const setInputRef = useCallback((index: number) => {
    return (el: HTMLInputElement | null) => {
      inputRefs.current[index] = el;
    };
  }, []);

  return (
    <div
      className={cn(className)}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      <div className="space-y-4">
        <div>
          <h3
            className={cn(
              "font-black mb-2",
              size === "xs" ? "text-base" : "text-lg",
            )}
          >
            Enter Verification Code
          </h3>
          <p
            className={cn(
              "text-brutal-gray-600",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            )}
          >
            Enter the {length}-digit code from your authenticator app
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          {values.map((value, index) => (
            <input
              key={index}
              ref={setInputRef(index)}
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={loading}
              className={cn(
                "text-center font-mono",
                box.w,
                box.h,
                box.text,
                "bg-brutal-white",
                brutal ? "border-4" : "border-2",
                "border-brutal-black",
                "focus:outline-none",
                brutal && "focus:shadow-brutal",
                error && "border-brutal-coral",
                loading && "opacity-50 cursor-not-allowed",
                "transition-all duration-200",
              )}
              aria-label={`Digit ${index + 1}`}
              maxLength={1}
              autoComplete="one-time-code"
              pattern="\d*"
            />
          ))}
        </div>

        {error && (
          <p
            className={cn(
              "text-center font-black",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
              "text-accent",
            )}
          >
            {error}
          </p>
        )}

        {loading && (
          <p
            className={cn(
              "text-center animate-pulse text-brutal-gray-600",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            )}
          >
            Verifying...
          </p>
        )}
      </div>
    </div>
  );
};
