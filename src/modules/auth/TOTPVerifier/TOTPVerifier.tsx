/**
 * @file src/modules/auth/TOTPVerifier/TOTPVerifier.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * TOTP verification input component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";

export interface TOTPVerifierProps {
  length?: number;
  onVerify: (code: string) => void;
  error?: string;
  loading?: boolean;
  brutal?: boolean;
  className?: string;
}

export const TOTPVerifier: React.FC<TOTPVerifierProps> = ({
  length = 6,
  onVerify,
  error,
  loading = false,
  brutal = true,
  className,
}) => {
  const [values, setValues] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    // Auto-submit when all digits are entered
    if (values.every((v) => v !== "") && values.join("").length === length) {
      onVerify(values.join(""));
    }
  }, [values, length, onVerify]);

  const handleChange = (index: number, value: string) => {
    // Only allow single digit
    if (value.length > 1) {
      value = value[0];
    }

    // Only allow numbers
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newValues = [...values];
    newValues[index] = value;
    setValues(newValues);

    // Auto-focus next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    // Handle backspace
    if (e.key === "Backspace" && !values[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "ArrowRight" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    const digits = pastedData.split("").filter((char) => /^\d$/.test(char));

    if (digits.length > 0) {
      const newValues = [...values];
      digits.forEach((digit, i) => {
        if (i < length) {
          newValues[i] = digit;
        }
      });
      setValues(newValues);

      // Focus last filled input or last input
      const lastIndex = Math.min(digits.length, length - 1);
      inputRefs.current[lastIndex]?.focus();
    }
  };

  return (
    <div className={className}>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold mb-2">Enter Verification Code</h3>
          <p className="text-sm text-brutal-gray-600">
            Enter the {length}-digit code from your authenticator app
          </p>
        </div>

        <div className="flex gap-2 justify-center">
          {values.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              value={value}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={loading}
              className={clsx(
                "w-12 h-14 text-center font-mono text-xl",
                "bg-brutal-white",
                brutal ? "border-4" : "border-2",
                "border-brutal-black",
                "focus:outline-none",
                brutal && "focus:shadow-brutal",
                error && "border-brutal-coral",
                loading && "opacity-50 cursor-not-allowed",
              )}
              maxLength={1}
              autoComplete="off"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-brutal-coral font-bold text-center">
            {error}
          </p>
        )}

        {loading && (
          <p className="text-sm text-brutal-gray-600 text-center animate-pulse">
            Verifying...
          </p>
        )}
      </div>
    </div>
  );
};
