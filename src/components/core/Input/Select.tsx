/**
 * @file src/components/core/Input/Select.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal select dropdown with enhanced styling and functionality
 */
import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { SelectProps } from "./types";

/**
 * @component Select
 * @description Brutal select dropdown with comprehensive styling options
 */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      hint,
      options,
      brutal = true,
      size = "md",
      variant = "default",
      required = false,
      placeholder = "Select an option",
      accentColor = "brutal-pink",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const sizeClasses = getSizeClasses(size);
    const accentClasses = getAccentClasses(accentColor);

    return (
      <div
        className="w-full"
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
      >
        {/* Label */}
        {label && (
          <label
            className={cn(
              "block mb-2 font-black uppercase tracking-wider text-brutal-black",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
              required && "after:content-['*'] after:ml-1 after:text-accent",
            )}
          >
            {label}
          </label>
        )}

        {/* Select container */}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              // Base styling
              "w-full font-mono appearance-none cursor-pointer",
              "bg-brutal-white text-brutal-black transition-all duration-200",

              // Size classes
              sizeClasses.padding,
              sizeClasses.text,

              // Icon spacing (for dropdown arrow)
              size === "xs" ? "pr-8" : size === "sm" ? "pr-9" : "pr-12",

              // Brutal styling
              brutal && [
                sizeClasses.border,
                "border-brutal-black",
                "focus:shadow-brutal focus:-translate-x-0.5 focus:-translate-y-0.5",
                "hover:shadow-brutal-sm hover:-translate-x-0.25 hover:-translate-y-0.25",
              ],
              !brutal && [
                "border-2 border-brutal-gray-300 rounded-md",
                "focus:border-accent focus:ring-2 focus:ring-accent/20",
              ],

              // Variant styling
              variant === "ghost" && [
                "bg-transparent border-transparent",
                "focus:bg-brutal-white focus:border-brutal-black",
              ],
              variant === "filled" && "bg-brutal-gray-100",

              // States
              error && "border-accent",
              disabled && [
                "opacity-50 cursor-not-allowed bg-brutal-gray-100",
                "hover:transform-none hover:shadow-none",
              ],
              isFocused &&
                brutal &&
                "shadow-brutal -translate-x-0.5 -translate-y-0.5",

              // Focus styles
              "focus:outline-none",

              className,
            )}
            disabled={disabled}
            required={required}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error
                ? `${props.id || "select"}-error`
                : hint
                  ? `${props.id || "select"}-hint`
                  : undefined
            }
            {...props}
          >
            {/* Placeholder option */}
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {/* Options */}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Dropdown arrow */}
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 pointer-events-none",
              size === "xs"
                ? "right-2"
                : size === "sm"
                  ? "right-2.5"
                  : "right-3",
            )}
          >
            <Icon
              icon={FaChevronDown}
              size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
              className={cn(
                "transition-all duration-200",
                isFocused ? "text-accent rotate-180" : "text-brutal-gray-500",
                disabled && "opacity-50",
              )}
            />
          </div>
        </div>

        {/* Hint text */}
        {hint && !error && (
          <p
            id={`${props.id || "select"}-hint`}
            className={cn(
              "mt-2 text-brutal-gray-600 font-mono",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            )}
          >
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p
            id={`${props.id || "select"}-error`}
            className={cn(
              "mt-2 font-black uppercase tracking-wider text-accent",
              sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            )}
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";
