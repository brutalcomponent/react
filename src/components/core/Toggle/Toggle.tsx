/**
 * @file src/components/core/Toggle/Toggle.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal toggle/switch component
 */
import React from "react";
import { clsx } from "clsx";

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "size"
  > {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  brutal?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      checked = false,
      onChange,
      error,
      brutal = true,
      size = "md",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizes = {
      sm: { track: "w-10 h-5", thumb: "w-3 h-3", translate: "translate-x-5" },
      md: { track: "w-14 h-7", thumb: "w-5 h-5", translate: "translate-x-7" },
      lg: { track: "w-18 h-9", thumb: "w-7 h-7", translate: "translate-x-9" },
    };

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
              className="sr-only"
              {...props}
            />

            {/* Track */}
            <div
              className={clsx(
                sizes[size].track,
                "transition-all duration-200",
                brutal ? "border-4" : "border-2",
                "border-brutal-black",
                checked ? "bg-brutal-black" : "bg-brutal-white",
                !disabled && "hover:shadow-brutal",
                error && "border-brutal-coral",
              )}
            >
              {/* Thumb */}
              <div
                className={clsx(
                  sizes[size].thumb,
                  "absolute top-1 left-1",
                  "transition-transform duration-200",
                  brutal ? "border-2" : "border",
                  "border-brutal-black",
                  checked ? "bg-brutal-white" : "bg-brutal-black",
                  checked && sizes[size].translate,
                )}
              />
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

Toggle.displayName = "Toggle";
