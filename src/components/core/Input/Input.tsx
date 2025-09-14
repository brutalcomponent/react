/**
 * @file src/components/core/Input/Input.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal input field with optional icons, validation, and multiple variants
 * @client
 */
"use client";

import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { InputProps } from "./types";

/**
 * @component Input
 * @description Brutal input field with comprehensive styling and validation support
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      brutal = true,
      size = "md",
      variant = "default",
      required = false,
      showPasswordToggle = false,
      accentColor = "brutal-pink",
      className,
      disabled,
      type = "text",
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const sizeClasses = getSizeClasses(size);
    const accentClasses = getAccentClasses(accentColor);

    const isPassword = type === "password";
    const actualType = isPassword && showPassword ? "text" : type;
    const hasLeftIcon = LeftIcon;
    const hasRightIcon = RightIcon || (isPassword && showPasswordToggle);

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

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {hasLeftIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 pointer-events-none",
                size === "xs"
                  ? "left-2"
                  : size === "sm"
                    ? "left-2.5"
                    : "left-3",
              )}
            >
              <Icon
                icon={LeftIcon!}
                size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
                className="text-brutal-gray-500"
              />
            </div>
          )}

          {/* Input field */}
          <input
            ref={ref}
            type={actualType}
            className={cn(
              // Base styling
              "w-full font-mono transition-all duration-200",
              "bg-brutal-white text-brutal-black placeholder:text-brutal-gray-500",

              // Size classes
              sizeClasses.padding,
              sizeClasses.text,

              // Icon spacing
              hasLeftIcon &&
                (size === "xs" ? "pl-8" : size === "sm" ? "pl-9" : "pl-12"),
              hasRightIcon &&
                (size === "xs" ? "pr-8" : size === "sm" ? "pr-9" : "pr-12"),

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
                ? `${props.id || "input"}-error`
                : hint
                  ? `${props.id || "input"}-hint`
                  : undefined
            }
            {...props}
          />

          {/* Right icon or password toggle */}
          {hasRightIcon && (
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2",
                size === "xs"
                  ? "right-2"
                  : size === "sm"
                    ? "right-2.5"
                    : "right-3",
              )}
            >
              {isPassword && showPasswordToggle ? (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={cn(
                    "p-1 transition-colors duration-200",
                    "hover:bg-brutal-gray-100 rounded",
                    "focus:outline-none focus:bg-brutal-gray-100",
                  )}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  <Icon
                    icon={showPassword ? FaEyeSlash : FaEye}
                    size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
                    className="text-brutal-gray-500 hover:text-brutal-black"
                  />
                </button>
              ) : RightIcon ? (
                <Icon
                  icon={RightIcon}
                  size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
                  className="text-brutal-gray-500"
                />
              ) : null}
            </div>
          )}
        </div>

        {/* Hint text */}
        {hint && !error && (
          <p
            id={`${props.id || "input"}-hint`}
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
            id={`${props.id || "input"}-error`}
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

Input.displayName = "Input";
