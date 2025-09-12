/**
 * @file src/components/core/Button/Button.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal button component with variants
 */
import React from "react";
import { clsx } from "clsx";
import { LoadingSpinner } from "./LoadingSpinner";
import type { ButtonProps } from "./types";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      brutal = true,
      fullWidth = false,
      uppercase = true,
      skew = false,
      leftIcon: LeftIcon,
      rightIcon: RightIcon,
      loading = false,
      loadingText,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseClasses = clsx(
      // Base styles
      "relative inline-flex items-center justify-center gap-2",
      "font-bold transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      uppercase && "uppercase tracking-wider",
      fullWidth && "w-full",

      // Border
      brutal ? "border-4" : "border-2",
      "border-brutal-black",

      // Disabled state
      (disabled || loading) && "opacity-50 cursor-not-allowed",

      // Skew effect
      skew === true && "transform -skew-x-2 hover:skew-x-0",
      skew === "left" && "transform -skew-x-2 hover:skew-x-0",
      skew === "right" && "transform skew-x-2 hover:skew-x-0",
    );

    const variants = {
      primary: clsx(
        "bg-brutal-black text-brutal-white",
        "hover:bg-brutal-gray-800",
        "focus:ring-brutal-black",
        brutal &&
          "shadow-brutal hover:shadow-brutal-md active:shadow-brutal-sm",
        brutal && "hover:-translate-x-0.5 hover:-translate-y-0.5",
        brutal && "active:translate-x-0 active:translate-y-0",
      ),
      secondary: clsx(
        "bg-brutal-white text-brutal-black",
        "hover:bg-brutal-gray-100",
        "focus:ring-brutal-gray-400",
        brutal &&
          "shadow-brutal hover:shadow-brutal-md active:shadow-brutal-sm",
        brutal && "hover:-translate-x-0.5 hover:-translate-y-0.5",
        brutal && "active:translate-x-0 active:translate-y-0",
      ),
      ghost: clsx(
        "bg-transparent text-brutal-black border-transparent",
        "hover:bg-brutal-gray-100 hover:border-brutal-black",
        "focus:ring-brutal-gray-400",
      ),
      danger: clsx(
        "bg-brutal-coral text-brutal-black border-brutal-black",
        "hover:bg-brutal-pink",
        "focus:ring-brutal-coral",
        brutal &&
          "shadow-brutal hover:shadow-brutal-md active:shadow-brutal-sm",
        brutal && "hover:-translate-x-0.5 hover:-translate-y-0.5",
        brutal && "active:translate-x-0 active:translate-y-0",
      ),
    };

    const sizes = {
      xs: "px-2 py-1 text-xs",
      sm: "px-3 py-2 text-xs",
      md: "px-4 py-3 text-sm",
      lg: "px-6 py-4 text-base",
      xl: "px-8 py-5 text-lg",
    };

    const iconSizeClasses = {
      xs: "w-3 h-3",
      sm: "w-3.5 h-3.5",
      md: "w-4 h-4",
      lg: "w-5 h-5",
      xl: "w-6 h-6",
    };

    return (
      <button
        ref={ref}
        className={clsx(baseClasses, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner size={size} />
            {loadingText || children}
          </>
        ) : (
          <>
            {LeftIcon && <LeftIcon className={iconSizeClasses[size]} />}
            {children}
            {RightIcon && <RightIcon className={iconSizeClasses[size]} />}
          </>
        )}

        {/* Hover effect accent */}
        {brutal && (
          <div className="absolute top-0 right-0 w-4 h-4 bg-brutal-pink opacity-0 group-hover:opacity-10 transition-opacity duration-200 pointer-events-none" />
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
