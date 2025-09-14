/**
 * @file src/components/core/Button/Button.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal button component with variants and enhanced styling.
 */
import React from "react";
import { LoadingSpinner } from "./LoadingSpinner";
import {
  cn,
  brutalBase,
  brutalVariants,
  getSizeClasses,
} from "../../../utils/cn.utils";
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
    const sizeStyles = getSizeClasses(size);

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center gap-2",
          "font-bold transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          brutalVariants[variant],
          sizeStyles.text,
          sizeStyles.padding,
          uppercase && "uppercase tracking-wider",
          fullWidth && "w-full",

          // Brutal styles
          brutal && [
            sizeStyles.border,
            "border-brutal-black",
            "shadow-brutal hover:shadow-brutal-md active:shadow-brutal-sm",
            brutalBase.hover,
            brutalBase.active,
          ],

          // Non-brutal fallback
          !brutal && "border-2 rounded",

          // Skew effect
          skew === true && "transform -skew-x-3 hover:skew-x-0",
          skew === "left" && "transform -skew-x-3 hover:skew-x-0",
          skew === "right" && "transform skew-x-3 hover:skew-x-0",

          // Disabled state
          (disabled || loading) && "opacity-50 cursor-not-allowed",

          className,
        )}
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
            {LeftIcon && <LeftIcon className={sizeStyles.text} />}
            <span className="transform skew-x-0">{children}</span>
            {RightIcon && <RightIcon className={sizeStyles.text} />}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
