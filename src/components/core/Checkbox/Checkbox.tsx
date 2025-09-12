/**
 * @file src/components/core/Checkbox/Checkbox.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal checkbox component
 */
import React from "react";
import { clsx } from "clsx";
import { FaCheck } from "react-icons/fa";
import type { CheckboxProps } from "./types";

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      onChange,
      error,
      brutal = true,
      className,
      checked,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <label
          className={clsx(
            "inline-flex items-center gap-3 cursor-pointer",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <div className="relative">
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              onChange={(e) => onChange?.(e.target.checked)}
              disabled={disabled}
              className="sr-only peer"
              {...props}
            />
            <div
              className={clsx(
                "w-6 h-6 transition-all duration-200",
                "flex items-center justify-center",
                brutal ? "border-4" : "border-2",
                "border-brutal-black bg-brutal-white",
                !disabled && "hover:shadow-brutal",
                error && "border-brutal-coral",
                "peer-checked:bg-brutal-black peer-checked:text-brutal-white",
              )}
            >
              <FaCheck className="w-3 h-3 scale-0 peer-checked:scale-100 transition-transform duration-200" />
            </div>
          </div>

          {label && (
            <span className="text-sm font-bold uppercase tracking-wider">
              {label}
            </span>
          )}
        </label>

        {error && (
          <p className="mt-1 text-xs text-brutal-coral font-bold uppercase">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
