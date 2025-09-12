/**
 * @file src/components/core/Input/Select.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal select dropdown
 */
import React from "react";
import { clsx } from "clsx";
import type { SelectProps } from "./types";

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { label, error, options, brutal = true, className, disabled, ...props },
    ref,
  ) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-xs font-bold uppercase tracking-wider text-brutal-black mb-2">
            {label}
          </label>
        )}

        <select
          ref={ref}
          className={clsx(
            "w-full px-4 py-3 font-mono text-sm appearance-none",
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
            className,
          )}
          disabled={disabled}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <p className="mt-1 text-xs text-brutal-coral font-bold uppercase">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
