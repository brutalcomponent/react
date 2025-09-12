/**
 * @file src/components/core/Input/Input.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal input field with optional icons and validation
 */
import React from "react";
import { clsx } from "clsx";
import type { InputProps } from "./types";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      brutal = true,
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

        <div className="relative">
          {LeftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <LeftIcon className="w-5 h-5 text-brutal-gray-500" />
            </div>
          )}

          <input
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
              LeftIcon && "pl-12",
              RightIcon && "pr-12",
              className,
            )}
            disabled={disabled}
            {...props}
          />

          {RightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <RightIcon className="w-5 h-5 text-brutal-gray-500" />
            </div>
          )}
        </div>

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

Input.displayName = "Input";
