/**
 * @file src/components/core/Textarea/Textarea.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal textarea component
 */
import React from "react";
import { clsx } from "clsx";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  brutal?: boolean;
  resize?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      brutal = true,
      resize = true,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-brutal-black mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={clsx(
            "w-full px-4 py-3 font-mono text-sm",
            "bg-brutal-white text-brutal-black",
            "transition-all duration-200",
            brutal && "border-4 border-brutal-black",
            !brutal && "border-2 border-brutal-gray-300",
            "focus:outline-none",
            brutal &&
              "focus:shadow-brutal focus:-translate-x-0.5 focus:-translate-y-0.5",
            !brutal && "focus:border-brutal-black",
            error && "border-brutal-coral",
            disabled && "opacity-50 cursor-not-allowed bg-brutal-gray-100",
            !resize && "resize-none",
            className,
          )}
          disabled={disabled}
          {...props}
        />

        {hint && !error && (
          <p className="mt-1 text-xs text-brutal-gray-600 font-mono">{hint}</p>
        )}

        {error && (
          <p className="mt-1 text-xs text-brutal-coral font-bold uppercase">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
