/**
 * @file src/components/core/Badge/Badge.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal badge component for status indicators
 */
import React from "react";
import { clsx } from "clsx";
import type { BadgeProps } from "./types";

export const Badge: React.FC<BadgeProps> = ({
  variant = "default",
  size = "sm",
  brutal = true,
  icon: Icon,
  iconPosition = "left",
  dot = false,
  removable = false,
  onRemove,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default: "bg-brutal-gray-100 text-brutal-black border-brutal-black",
    primary: "bg-brutal-black text-brutal-white border-brutal-black",
    secondary: "bg-brutal-white text-brutal-black border-brutal-black",
    success: "bg-brutal-mint text-brutal-black border-brutal-black",
    warning: "bg-brutal-yellow text-brutal-black border-brutal-black",
    danger: "bg-brutal-coral text-brutal-black border-brutal-black",
    info: "bg-brutal-sky text-brutal-black border-brutal-black",
  };

  const sizeClasses = {
    xs: "px-1.5 py-0.5 text-xs",
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base",
  };

  const iconSizes = {
    xs: "w-3 h-3",
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5",
        "font-bold uppercase tracking-wider",
        brutal ? "border-2 shadow-brutal" : "border",
        sizeClasses[size],
        variantClasses[variant],
        "transition-all duration-200",
        brutal &&
          "hover:shadow-brutal-md hover:-translate-x-0.5 hover:-translate-y-0.5",
        className,
      )}
      {...props}
    >
      {dot && (
        <span
          className={clsx(
            "rounded-full bg-current",
            size === "xs"
              ? "w-1.5 h-1.5"
              : size === "sm"
                ? "w-2 h-2"
                : "w-2.5 h-2.5",
          )}
        />
      )}

      {Icon && iconPosition === "left" && <Icon className={iconSizes[size]} />}

      {children}

      {Icon && iconPosition === "right" && <Icon className={iconSizes[size]} />}

      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
          className={clsx(
            "ml-1 -mr-1 hover:bg-brutal-black/10 rounded",
            size === "xs" || size === "sm" ? "p-0.5" : "p-1",
          )}
          aria-label="Remove"
        >
          <svg
            className={iconSizes[size]}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </span>
  );
};
