/**
 * @file src/components/core/Checkbox/Checkbox.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal checkbox component with enhanced styling.
 */
import React from "react";
import { FaCheck } from "react-icons/fa";
import { cn } from "../../../utils/cn.utils";
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
          className={cn(
            "inline-flex items-center gap-3 cursor-pointer group",
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
              className={cn(
                "w-6 h-6 transition-all duration-200",
                "flex items-center justify-center",
                brutal ? "border-4" : "border-2",
                "border-brutal-black bg-brutal-white",
                !disabled &&
                  "group-hover:shadow-brutal group-hover:-translate-y-0.5",
                error && "border-brutal-coral",
                "peer-checked:bg-brutal-black peer-checked:border-brutal-black",
              )}
            >
              <FaCheck className="w-4 h-4 text-brutal-white scale-0 peer-checked:scale-100 transition-transform duration-100" />
            </div>
          </div>

          {label && (
            <span className="text-sm font-black uppercase tracking-wider text-brutal-gray-700">
              {label}
            </span>
          )}
        </label>

        {error && (
          <p className="mt-2 text-xs text-brutal-coral font-bold uppercase">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
