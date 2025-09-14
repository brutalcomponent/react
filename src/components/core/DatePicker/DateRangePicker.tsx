/**
 * @file src/components/core/DatePicker/DateRangePicker.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal date range picker component for selecting start and end dates
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState } from "react";
import { DatePicker } from "./DatePicker";
import { cn } from "../../../utils/cn.utils";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface DateRangePickerProps {
  value?: DateRange;
  onChange: (range: DateRange) => void;
  label?: string;
  error?: string;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  required?: boolean;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

/**
 * @component DateRangePicker
 * @description Brutal date range picker with start and end date selection
 */
export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
  label,
  error,
  min,
  max,
  disabled = false,
  required = false,
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const [focusedInput, setFocusedInput] = useState<"start" | "end" | null>(
    null,
  );

  const handleStartDateChange = (date: Date) => {
    const newRange: DateRange = {
      start: date.getTime() === 0 ? null : date,
      end: value?.end || null,
    };

    // If end date is before start date, clear end date
    if (newRange.end && newRange.start && newRange.end < newRange.start) {
      newRange.end = null;
    }

    onChange(newRange);
    setFocusedInput("end");
  };

  const handleEndDateChange = (date: Date) => {
    const newRange: DateRange = {
      start: value?.start || null,
      end: date.getTime() === 0 ? null : date,
    };

    onChange(newRange);
    setFocusedInput(null);
  };

  return (
    <div className={cn("space-y-4", className)}>
      {label && (
        <label
          className={cn(
            "block font-black uppercase tracking-wider text-brutal-black",
            size === "xs" ? "text-xs" : "text-sm",
            required && "after:content-['*'] after:ml-1 after:text-accent",
          )}
        >
          {label}
        </label>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker
          value={value?.start || undefined}
          onChange={handleStartDateChange}
          label="Start Date"
          placeholder="Select start date"
          min={min}
          max={value?.end || max}
          disabled={disabled}
          required={required}
          clearable
          brutal={brutal}
          size={size}
          accentColor={accentColor}
          error={focusedInput === "start" ? error : undefined}
        />

        <DatePicker
          value={value?.end || undefined}
          onChange={handleEndDateChange}
          label="End Date"
          placeholder="Select end date"
          min={value?.start || min}
          max={max}
          disabled={disabled}
          clearable
          brutal={brutal}
          size={size}
          accentColor={accentColor}
          error={focusedInput === "end" ? error : undefined}
        />
      </div>

      {error && !focusedInput && (
        <p
          className={cn(
            "font-black uppercase tracking-wider text-accent",
            size === "xs" ? "text-xs" : "text-sm",
          )}
        >
          {error}
        </p>
      )}
    </div>
  );
};
