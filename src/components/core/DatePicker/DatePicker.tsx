/**
 * @file src/components/core/DatePicker/DatePicker.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal date picker component with calendar popup and date selection
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  FaCalendar,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";
import { Icon } from "../Icon";
import { cn, brutalBase, getSizeClasses } from "../../../utils/cn.utils";

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  required?: boolean;
  clearable?: boolean;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  accentColor?: string;
  className?: string;
}

/**
 * @component DatePicker
 * @description Brutal date picker with calendar popup and comprehensive date selection
 */
export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select date",
  error,
  min,
  max,
  disabled = false,
  required = false,
  clearable = false,
  brutal = true,
  size = "md",
  accentColor = "brutal-pink",
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);
  const sizeClasses = getSizeClasses(size);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  const formatDate = useCallback((date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  }, []);

  const getDaysInMonth = useCallback((date: Date): Date[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();

    // Get starting day of week (0 = Sunday)
    const startingDayOfWeek = firstDay.getDay();
    const days: Date[] = [];

    // Add previous month's trailing days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push(new Date(year, month, -i));
    }

    // Add current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    // Add next month's leading days to complete the grid
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(year, month + 1, i));
    }

    return days;
  }, []);

  const isDateDisabled = useCallback(
    (date: Date): boolean => {
      if (min && date < min) return true;
      if (max && date > max) return true;
      return false;
    },
    [min, max],
  );

  const isSameDay = useCallback((date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }, []);

  const handleMonthChange = useCallback((direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  }, []);

  const handleDateSelect = useCallback(
    (date: Date) => {
      if (!isDateDisabled(date)) {
        onChange(date);
        setIsOpen(false);
      }
    },
    [onChange, isDateDisabled],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (clearable && value) {
        // Create a new date that represents "no selection"
        // We'll need to handle this in the parent component
        onChange(new Date(0)); // Use epoch as "clear" signal
        setIsOpen(false);
      }
    },
    [clearable, value, onChange],
  );

  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentMonth);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const days = getDaysInMonth(currentMonth);

  return (
    <div
      className={cn("relative", className)}
      ref={containerRef}
      style={
        {
          "--accent-color": accentColor.startsWith("#")
            ? accentColor
            : `var(--brutal-${accentColor.replace("brutal-", "")})`,
        } as React.CSSProperties
      }
    >
      {/* Label */}
      {label && (
        <label
          className={cn(
            "block mb-2 font-black uppercase tracking-wider text-brutal-black",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
            required && "after:content-['*'] after:ml-1 after:text-accent",
          )}
        >
          {label}
        </label>
      )}

      {/* Input */}
      <div
        className={cn(
          // Base input styling
          "w-full font-mono cursor-pointer flex items-center justify-between",
          "bg-brutal-white text-brutal-black transition-all duration-200",

          // Size classes
          sizeClasses.padding,
          sizeClasses.text,

          // Brutal styling
          brutal && [
            sizeClasses.border,
            "border-brutal-black",
            sizeClasses.shadow,
            "hover:shadow-brutal-md focus:shadow-brutal-lg",
            "transform hover:-translate-y-0.5",
          ],
          !brutal && [
            "border-2 border-brutal-gray-300 rounded-md",
            "hover:border-brutal-gray-400 focus:border-accent",
          ],

          // States
          error && "border-accent",
          disabled && [
            "opacity-50 cursor-not-allowed bg-brutal-gray-100",
            "hover:transform-none hover:shadow-none",
          ],
          isOpen && brutal && "shadow-brutal-lg -translate-y-0.5",

          // Focus styles
          "focus:outline-none focus-within:outline-none",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={label || "Date picker"}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span
          className={cn(
            value ? "text-brutal-black" : "text-brutal-gray-500",
            "select-none font-bold",
          )}
        >
          {value && value.getTime() !== 0 ? formatDate(value) : placeholder}
        </span>

        <div className="flex items-center gap-2">
          {clearable && value && value.getTime() !== 0 && (
            <button
              onClick={handleClear}
              className={cn(
                "p-1 text-brutal-gray-500 hover:text-accent transition-colors",
                "hover:bg-brutal-gray-100 rounded",
              )}
              aria-label="Clear date"
              type="button"
            >
              <Icon icon={FaTimes} size="xs" />
            </button>
          )}
          <Icon
            icon={FaCalendar}
            size="sm"
            className={cn(
              "text-brutal-gray-600 transition-colors",
              isOpen && "text-accent",
            )}
          />
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p
          className={cn(
            "mt-2 font-black uppercase tracking-wider text-accent",
            sizeClasses.text === "text-xs" ? "text-xs" : "text-sm",
          )}
        >
          {error}
        </p>
      )}

      {/* Calendar popup */}
      {isOpen && !disabled && (
        <div
          className={cn(
            // Positioning
            "absolute z-50 mt-2 w-full min-w-80",

            // Base styling
            "bg-brutal-white p-4",

            // Brutal styling
            brutal && [
              "border-4 border-brutal-black",
              "shadow-brutal-lg",
              "transform rotate-1",
            ],
            !brutal && "border shadow-xl rounded-lg",

            // Animation
            "animate-scale-in",
          )}
          role="dialog"
          aria-label="Calendar"
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => handleMonthChange("prev")}
              className={cn(
                "p-2 transition-all duration-200",
                "hover:bg-brutal-gray-100 hover:text-accent",
                brutal && "hover:shadow-brutal-sm transform hover:-rotate-1",
                !brutal && "rounded hover:scale-110",
              )}
              type="button"
              aria-label="Previous month"
            >
              <Icon icon={FaChevronLeft} size="sm" />
            </button>

            <span
              className={cn(
                "font-black uppercase tracking-wider text-brutal-black",
                sizeClasses.text,
              )}
            >
              {monthYear}
            </span>

            <button
              onClick={() => handleMonthChange("next")}
              className={cn(
                "p-2 transition-all duration-200",
                "hover:bg-brutal-gray-100 hover:text-accent",
                brutal && "hover:shadow-brutal-sm transform hover:rotate-1",
                !brutal && "rounded hover:scale-110",
              )}
              type="button"
              aria-label="Next month"
            >
              <Icon icon={FaChevronRight} size="sm" />
            </button>
          </div>

          {/* Week days header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className={cn(
                  "text-center font-black text-brutal-gray-600 p-2",
                  "text-xs uppercase tracking-wider",
                )}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, idx) => {
              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth();
              const isSelected =
                value && value.getTime() !== 0 && isSameDay(date, value);
              const isToday = isSameDay(date, new Date());
              const isDisabled = isDateDisabled(date);

              return (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled}
                  className={cn(
                    // Base styling
                    "p-2 font-mono transition-all duration-200 text-center",
                    sizeClasses.text,

                    // Month styling
                    !isCurrentMonth && "text-brutal-gray-400",
                    isCurrentMonth && "text-brutal-black",

                    // Selected state
                    isSelected && [
                      "bg-accent text-brutal-black font-black",
                      brutal && "shadow-brutal-sm transform -rotate-1",
                    ],

                    // Today indicator
                    isToday &&
                      !isSelected && [
                        "border-2 border-accent",
                        brutal && "shadow-brutal-sm",
                      ],

                    // Disabled state
                    isDisabled && "opacity-50 cursor-not-allowed",

                    // Interactive states
                    !isDisabled &&
                      !isSelected && [
                        "hover:bg-accent hover:text-brutal-black",
                        brutal &&
                          "hover:shadow-brutal-sm hover:transform hover:-rotate-0.5",
                        !brutal && "rounded hover:scale-110",
                      ],
                  )}
                  type="button"
                  aria-label={`Select ${formatDate(date)}`}
                  aria-pressed={isSelected}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
