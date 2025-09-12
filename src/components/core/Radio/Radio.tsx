/**
 * @file src/components/core/Radio/Radio.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal radio button component
 */
import React from "react";
import { clsx } from "clsx";
import type { RadioProps } from "./types";

export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ label, brutal = true, className, disabled, ...props }, ref) => {
    return (
      <label
        className={clsx(
          "inline-flex items-center gap-3 cursor-pointer",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="radio"
            disabled={disabled}
            className="sr-only peer"
            {...props}
          />
          <div
            className={clsx(
              "w-6 h-6 rounded-full transition-all duration-200",
              "flex items-center justify-center",
              brutal ? "border-4" : "border-2",
              "border-brutal-black bg-brutal-white",
              !disabled && "hover:shadow-brutal",
              "peer-checked:bg-brutal-black",
            )}
          >
            <div
              className={clsx(
                "w-2 h-2 rounded-full bg-brutal-white",
                "scale-0 peer-checked:scale-100 transition-transform duration-200",
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
    );
  },
);

Radio.displayName = "Radio";
