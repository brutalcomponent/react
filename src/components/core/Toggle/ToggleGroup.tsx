/**
 * @file src/components/core/Toggle/ToggleGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Group of toggle buttons for multi-selection
 */
import React from "react";
import { Toggle } from "./Toggle";
import { cn, getSizeClasses } from "../../../utils/cn.utils";
import type { ToggleProps } from "./Toggle";

export interface ToggleOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface ToggleGroupProps {
  options: ToggleOption[];
  values: string[];
  onChange: (values: string[]) => void;
  label?: string;
  description?: string;
  error?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pill" | "square";
  layout?: "vertical" | "horizontal" | "grid";
  animated?: boolean;
  required?: boolean;
  accentColor?: string;
  className?: string;
}

/**
 * @component ToggleGroup
 * @description Group of toggles for multi-selection scenarios
 */
export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  options,
  values,
  onChange,
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

  const handleToggleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...values, optionValue]);
    } else {
      onChange(values.filter((v) => v !== optionValue));
    }
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

      {/* Toggle options */}
      <div
        className={cn(
          // Layout classes
          layout === "horizontal" && "flex flex-wrap gap-4",
          layout === "vertical" && "space-y-3",
          layout === "grid" && "grid grid-cols-1 sm:grid-cols-2 gap-3",
        )}
        role="group"
        aria-labelledby={label ? `togglegroup-label` : undefined}
        aria-describedby={
          error
            ? `togglegroup-error`
            : description
              ? `togglegroup-description`
              : undefined
        }
        aria-invalid={error ? "true" : "false"}
        aria-required={required}
      >
        {options.map((option, index) => (
          <Toggle
            key={option.value}
            id={`toggle-${option.value}`}
            label={option.label}
            description={option.description}
            checked={values.includes(option.value)}
            onChange={(checked) => handleToggleChange(option.value, checked)}
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
          id="togglegroup-error"
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
