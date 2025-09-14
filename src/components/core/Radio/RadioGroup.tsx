/**
 * @file src/components/core/Radio/RadioGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Group of radio buttons with enhanced layout and validation
 */
import React from "react";
import { Radio } from "./Radio";
import { cn, getSizeClasses } from "../../../utils/cn.utils";
import type { RadioGroupProps } from "./types";

/**
 * @component RadioGroup
 * @description Group of radio buttons with comprehensive layout and validation options
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  description,
  error,
  brutal = true,
  size = "md",
  variant = "default",
  layout = "vertical",
  animated = true,
  required = false,
  accentColor = "brutal-pink",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const handleChange = (selectedValue: string) => {
    onChange(selectedValue);
  };

  return (
    <fieldset
      className={cn("w-full", className)}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Legend (label) */}
      {label && (
        <legend
          className={cn(
            "block mb-3 font-black uppercase tracking-wider text-brutal-black",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            required && "after:content-['*'] after:ml-1 after:text-accent",
          )}
        >
          {label}
        </legend>
      )}

      {/* Description */}
      {description && (
        <p
          className={cn(
            "mb-4 text-brutal-gray-600 font-mono",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
          )}
        >
          {description}
        </p>
      )}

      {/* Radio options */}
      <div
        className={cn(
          // Layout classes
          layout === "horizontal" && "flex flex-wrap gap-4",
          layout === "vertical" && "space-y-3",
          layout === "grid" && "grid grid-cols-1 sm:grid-cols-2 gap-3",

          // Focus management
          "focus-within:outline-none",
        )}
        role="radiogroup"
        aria-labelledby={label ? `${name}-label` : undefined}
        aria-describedby={
          error
            ? `${name}-error`
            : description
              ? `${name}-description`
              : undefined
        }
        aria-invalid={error ? "true" : "false"}
        aria-required={required}
      >
        {options.map((option, index) => (
          <Radio
            key={option.value}
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            label={option.label}
            description={option.description}
            checked={value === option.value}
            onChange={(e) => handleChange(e.currentTarget.value)}
            disabled={option.disabled}
            brutal={brutal}
            size={size}
            variant={variant}
            animated={animated}
            accentColor={accentColor}
            className={cn(
              // Animation delays for staggered entrance
              animated && layout === "vertical" && "animate-fade-in",
              animated && `animation-delay-${index * 100}ms`,
            )}
          />
        ))}
      </div>

      {/* Error message */}
      {error && (
        <p
          id={`${name}-error`}
          className={cn(
            "mt-3 font-black uppercase tracking-wider text-accent",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
          )}
          role="alert"
        >
          {error}
        </p>
      )}
    </fieldset>
  );
};
