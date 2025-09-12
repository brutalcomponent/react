/**
 * @file src/components/core/DatePicker/DatePicker.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal date picker component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import { FaCalendar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Icon } from "../Icon/Icon";

export interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  error?: string;
  min?: Date;
  max?: Date;
  disabled?: boolean;
  brutal?: boolean;
  className?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  min,
  max,
  disabled = false,
  brutal = true,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
  const containerRef = useRef<HTMLDivElement>(null);

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

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const getDaysInMonth = (date: Date): Date[] => {
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
  };

  const isDateDisabled = (date: Date): boolean => {
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  };

  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const handleDateSelect = (date: Date) => {
    if (!isDateDisabled(date)) {
      onChange(date);
      setIsOpen(false);
    }
  };

  const monthYear = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(currentMonth);

  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const days = getDaysInMonth(currentMonth);

  return (
    <div className={clsx("relative", className)} ref={containerRef}>
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-brutal-black mb-2">
          {label}
        </label>
      )}

      {/* Input */}
      <div
        className={clsx(
          "w-full px-4 py-3 font-mono text-sm cursor-pointer",
          "bg-brutal-white text-brutal-black",
          "transition-all duration-200",
          "flex items-center justify-between",
          brutal && "border-4 border-brutal-black",
          !brutal && "border-2 border-brutal-gray-300",
          "focus:outline-none",
          brutal && "hover:shadow-brutal focus:shadow-brutal",
          error && "border-brutal-coral",
          disabled && "opacity-50 cursor-not-allowed bg-brutal-gray-100",
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
      >
        <span className={value ? "text-brutal-black" : "text-brutal-gray-500"}>
          {value ? formatDate(value) : "Select date"}
        </span>
        <Icon icon={FaCalendar} size="sm" className="text-brutal-gray-600" />
      </div>

      {error && (
        <p className="mt-1 text-xs text-brutal-coral font-bold uppercase">
          {error}
        </p>
      )}

      {/* Calendar popup */}
      {isOpen && !disabled && (
        <div
          className={clsx(
            "absolute z-50 mt-2 p-4",
            "bg-brutal-white border-4 border-brutal-black shadow-brutal-lg",
            "animate-scale-in",
          )}
        >
          {/* Month navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => handleMonthChange("prev")}
              className="p-2 hover:bg-brutal-gray-100 transition-colors"
              type="button"
            >
              <Icon icon={FaChevronLeft} size="sm" />
            </button>
            <span className="font-bold uppercase tracking-wider text-sm">
              {monthYear}
            </span>
            <button
              onClick={() => handleMonthChange("next")}
              className="p-2 hover:bg-brutal-gray-100 transition-colors"
              type="button"
            >
              <Icon icon={FaChevronRight} size="sm" />
            </button>
          </div>

          {/* Week days */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map((day, idx) => (
              <div
                key={idx}
                className="text-center text-xs font-bold text-brutal-gray-600 p-2"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, idx) => {
              const isCurrentMonth =
                date.getMonth() === currentMonth.getMonth();
              const isSelected = value && isSameDay(date, value);
              const isToday = isSameDay(date, new Date());
              const isDisabled = isDateDisabled(date);

              return (
                <button
                  key={idx}
                  onClick={() => handleDateSelect(date)}
                  disabled={isDisabled}
                  className={clsx(
                    "p-2 text-sm font-mono transition-all duration-200",
                    "hover:bg-brutal-gray-100",
                    !isCurrentMonth && "text-brutal-gray-400",
                    isCurrentMonth && "text-brutal-black",
                    isSelected && "bg-brutal-black text-brutal-white",
                    isToday && !isSelected && "border-2 border-brutal-pink",
                    isDisabled && "opacity-50 cursor-not-allowed",
                    !isDisabled &&
                      !isSelected &&
                      "hover:bg-brutal-pink hover:text-brutal-black",
                  )}
                  type="button"
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
