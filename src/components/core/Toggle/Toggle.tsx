/**
 * @file src/components/core/Toggle/Toggle.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal toggle/switch component with enhanced styling and accessibility
 */
import React, { useCallback } from "react";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";

export interface ToggleProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "onChange" | "size"
  > {
  label?: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pill" | "square";
  animated?: boolean;
  required?: boolean;
  accentColor?: string;
}

/**
 * @component Toggle
 * @description Brutal toggle/switch with comprehensive styling and accessibility features
 */
export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      label,
      description,
      checked = false,
      onChange,
      error,
      brutal = true,
      size = "md",
      variant = "default",
      animated = true,
      required = false,
      accentColor = "brutal-pink",
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const sizeClasses = getSizeClasses(size);
    const accentClasses = getAccentClasses(accentColor);

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.checked);
      },
      [onChange],
    );

    const getToggleSizes = () => {
      const sizes = {
        xs: {
          track: "w-8 h-4",
          thumb: "w-2.5 h-2.5",
          translate: "translate-x-4",
          padding: "p-0.5",
        },
        sm: {
          track: "w-10 h-5",
          thumb: "w-3 h-3",
          translate: "translate-x-5",
          padding: "p-0.5",
        },
        md: {
          track: "w-14 h-7",
          thumb: "w-5 h-5",
          translate: "translate-x-7",
          padding: "p-1",
        },
        lg: {
          track: "w-18 h-9",
          thumb: "w-7 h-7",
          translate: "translate-x-9",
          padding: "p-1",
        },
      };
      return sizes[size];
    };

    const toggleSizes = getToggleSizes();

    const getVariantClasses = () => {
      switch (variant) {
        case "pill":
          return {
            track: "rounded-full",
            thumb: "rounded-full",
          };

        case "square":
          return {
            track: "rounded-none",
            thumb: "rounded-none",
          };

        default:
          return {
            track: "rounded-lg",
            thumb: "rounded-md",
          };
      }
    };

    const variantStyles = getVariantClasses();

    return (
      <div
        className={cn("w-full", className)}
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
      >
        <label
          className={cn(
            "inline-flex items-start gap-3 cursor-pointer transition-all duration-200",
            disabled && [
              "cursor-not-allowed opacity-50",
              "hover:transform-none",
            ],
            !disabled && animated && "hover:scale-105",
          )}
        >
          {/* Toggle Switch */}
          <div className="relative flex-shrink-0">
            <input
              ref={ref}
              type="checkbox"
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              required={required}
              className="sr-only peer"
              aria-describedby={
                error
                  ? `${props.id || "toggle"}-error`
                  : description
                    ? `${props.id || "toggle"}-description`
                    : undefined
              }
              {...props}
            />

            {/* Track */}
            <div
              className={cn(
                // Base track styling
                toggleSizes.track,
                toggleSizes.padding,
                "relative transition-all duration-300 flex items-center",
                variantStyles.track,

                // Brutal styling
                brutal && [
                  "border-4 border-brutal-black",
                  animated && [
                    "hover:shadow-brutal peer-focus:shadow-brutal-md",
                    "transform hover:-translate-y-0.5",
                  ],
                ],
                !brutal && [
                  "border-2 border-brutal-gray-400",
                  "peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2",
                ],

                // State colors
                checked ? "bg-accent" : "bg-brutal-white",

                // Error state
                error && "border-brutal-coral",

                // Disabled state
                disabled && [
                  "hover:shadow-none hover:transform-none",
                  checked ? "bg-brutal-gray-400" : "bg-brutal-gray-200",
                ],

                // Focus styles
                "peer-focus:outline-none",
              )}
            >
              {/* Thumb */}
              <div
                className={cn(
                  // Base thumb styling
                  toggleSizes.thumb,
                  "absolute transition-all duration-300 flex items-center justify-center",
                  variantStyles.thumb,

                  // Brutal styling
                  brutal && [
                    "border-2 border-brutal-black shadow-brutal-sm",
                    animated && [
                      "peer-checked:rotate-180",
                      checked && "animate-bounce",
                    ],
                  ],
                  !brutal && "shadow-md",

                  // Position and colors
                  checked
                    ? [toggleSizes.translate, "bg-brutal-white"]
                    : ["translate-x-0", "bg-brutal-black"],

                  // Disabled state
                  disabled && [
                    "bg-brutal-gray-500",
                    "peer-checked:bg-brutal-gray-300",
                  ],
                )}
              >
                {/* Optional inner indicator */}
                {brutal && animated && (
                  <div
                    className={cn(
                      "w-1 h-1 rounded-full transition-all duration-200",
                      checked ? "bg-accent" : "bg-brutal-white",
                    )}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Label and Description */}
          {(label || description) && (
            <div className="flex-1 min-w-0">
              {label && (
                <span
                  className={cn(
                    "block font-black uppercase tracking-wider text-brutal-black",
                    sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                    required &&
                      "after:content-['*'] after:ml-1 after:text-accent",
                    disabled && "text-brutal-gray-500",
                  )}
                >
                  {label}
                </span>
              )}

              {description && (
                <span
                  id={`${props.id || "toggle"}-description`}
                  className={cn(
                    "block mt-1 text-brutal-gray-600 font-mono",
                    sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
                    disabled && "text-brutal-gray-400",
                  )}
                >
                  {description}
                </span>
              )}
            </div>
          )}
        </label>

        {/* Error message */}
        {error && (
          <p
            id={`${props.id || "toggle"}-error`}
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

Toggle.displayName = "Toggle";
