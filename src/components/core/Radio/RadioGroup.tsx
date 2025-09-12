/**
 * @file src/components/core/Radio/RadioGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Group of radio buttons
 */
import React from "react";
import { Radio } from "./Radio";
import type { RadioGroupProps } from "./types";

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  value,
  onChange,
  name,
  label,
  error,
  brutal = true,
  className,
}) => {
  return (
    <div className={className}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-wider text-brutal-black mb-3">
          {label}
        </p>
      )}

      <div className="space-y-2">
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={(e) => onChange(e.currentTarget.value)}
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
