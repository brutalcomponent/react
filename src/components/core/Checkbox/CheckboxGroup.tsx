/**
 * @file src/components/core/Checkbox/CheckboxGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Group of checkboxes
 */
import React from "react";
import { Checkbox } from "./Checkbox";
import type { CheckboxGroupProps } from "./types";

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value,
  onChange,
  label,
  error,
  brutal = true,
  className,
}) => {
  const handleChange = (optionValue: string, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
    } else {
      onChange(value.filter((v) => v !== optionValue));
    }
  };

  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-wider text-brutal-black mb-3">
          {label}
        </p>
      )}

      <div className="space-y-2">
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            onChange={(checked) => handleChange(option.value, checked)}
            disabled={option.disabled}
            brutal={brutal}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-xs text-brutal-coral font-bold uppercase">
          {error}
        </p>
      )}
    </div>
  );
};
