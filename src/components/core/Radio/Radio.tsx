/**
 * @file src/components/core/Radio/Radio.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal radio button component with enhanced styling and accessibility
 */
import React from "react";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { RadioProps } from "./types";

/**
 * @component Radio
 * @description Brutal radio button with comprehensive styling and accessibility features
 */
export const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  (
    {
      label,
      description,
      brutal = true,
      size = "md",
      variant = "default",
      animated = true,
      accentColor = "brutal-pink",
      className,
      disabled,
      required,
      id,
      name,
      value,
      checked,
      defaultChecked,
      onChange,
      onFocus,
      onBlur,
      onClick,
      ...restProps
    },
    ref,
  ) => {
    const sizeClasses = getSizeClasses(size);

    const getRadioSize = () => {
      const sizes = {
        xs: "w-4 h-4",
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-7 h-7",
      };
      return sizes[size];
    };

    const getDotSize = () => {
      const sizes = {
        xs: "w-1.5 h-1.5",
        sm: "w-2 h-2",
        md: "w-2.5 h-2.5",
        lg: "w-3 h-3",
      };
      return sizes[size];
    };

    const getVariantClasses = () => {
      switch (variant) {
        case "card":
          return {
            container: cn(
              "p-4 border-2 border-brutal-gray-300 hover:border-accent",
              "peer-checked:border-accent peer-checked:bg-accent/5",
              brutal && "shadow-brutal-sm hover:shadow-brutal",
            ),
            radio: "absolute top-4 right-4",
          };

        case "button":
          return {
            container: cn(
              "px-4 py-2 border-2 border-brutal-black bg-brutal-white",
              "hover:bg-brutal-gray-50 peer-checked:bg-accent peer-checked:text-brutal-black",
              brutal && "shadow-brutal hover:shadow-brutal-md",
              "transition-all duration-200",
            ),
            radio: "sr-only",
          };

        default:
          return {
            container: "inline-flex items-center gap-3",
            radio: "relative",
          };
      }
    };

    const variantStyles = getVariantClasses();

    // Only pass the props that are valid for input elements
    const inputProps = {
      id,
      name,
      value,
      checked,
      defaultChecked,
      disabled,
      required,
      onChange,
      onFocus,
      onBlur,
      onClick,
      // Add other safe input props from restProps
      ...(restProps.tabIndex !== undefined && { tabIndex: restProps.tabIndex }),
      ...(restProps["aria-label"] && { "aria-label": restProps["aria-label"] }),
      ...(restProps["aria-labelledby"] && {
        "aria-labelledby": restProps["aria-labelledby"],
      }),
      ...(restProps["aria-describedby"] && {
        "aria-describedby": restProps["aria-describedby"],
      }),
      ...(restProps.autoFocus && { autoFocus: restProps.autoFocus }),
    };

    return (
      <label
        className={cn(
          // Base label styling
          "cursor-pointer transition-all duration-200",
          variantStyles.container,

          // Disabled state
          disabled && [
            "cursor-not-allowed opacity-50",
            "hover:shadow-none hover:border-brutal-gray-300 hover:bg-brutal-white",
          ],

          // Focus-within styles for accessibility
          "focus-within:outline-none focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2",

          className,
        )}
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
      >
        <div className={cn("relative", variantStyles.radio)}>
          <input
            ref={ref}
            type="radio"
            className={cn(variant === "button" ? "sr-only" : "sr-only", "peer")}
            aria-describedby={
              description ? `${id || "radio"}-description` : undefined
            }
            {...inputProps}
          />

          {/* Custom radio button (hidden for button variant) */}
          {variant !== "button" && (
            <div
              className={cn(
                // Base radio styling
                "rounded-full transition-all duration-200 flex items-center justify-center",
                "bg-brutal-white border-brutal-black",
                getRadioSize(),

                // Brutal styling
                brutal && [
                  "border-4 shadow-brutal-sm",
                  animated && [
                    "hover:shadow-brutal peer-focus:shadow-brutal-md",
                    "transform hover:-translate-y-0.5 peer-checked:scale-110",
                  ],
                ],
                !brutal && [
                  "border-2 shadow-md",
                  animated && "hover:shadow-lg peer-checked:scale-105",
                ],

                // Checked state
                "peer-checked:bg-accent peer-checked:border-accent",

                // Disabled state
                disabled && [
                  "hover:shadow-none hover:transform-none peer-checked:scale-100",
                ],

                // Focus styles
                "peer-focus:ring-2 peer-focus:ring-accent peer-focus:ring-offset-2",
              )}
            >
              {/* Inner dot */}
              <div
                className={cn(
                  "rounded-full bg-brutal-black transition-all duration-200",
                  getDotSize(),
                  "scale-0 peer-checked:scale-100",
                  animated && "peer-checked:animate-bounce",
                )}
              />
            </div>
          )}
        </div>

        {/* Label and description */}
        {(label || description) && (
          <div
            className={cn(
              "flex-1 min-w-0",
              variant === "card" && "pr-8", // Space for radio button in card variant
            )}
          >
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
                id={`${id || "radio"}-description`}
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
    );
  },
);

Radio.displayName = "Radio";
