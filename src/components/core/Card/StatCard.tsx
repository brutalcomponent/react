/**
 * @file src/components/core/Card/StatCard.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Statistics card component for dashboards with brutal styling
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";
import { cn } from "../../../utils/cn.utils";

export interface StatCardProps {
  title: string;
  value: string | number;
  previousValue?: string | number;
  format?: "number" | "currency" | "percentage";
  trend?: number[];
  icon?: IconType;
  color?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
  brutal?: boolean;
  className?: string;
}

/**
 * @component StatCard
 * @description Brutal statistics display card
 */
export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  previousValue,
  format = "number",
  trend,
  icon: Icon,
  color = "default",
  size = "md",
  brutal = true,
  className,
}) => {
  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const valueSizes = {
    sm: "text-2xl",
    md: "text-3xl",
    lg: "text-4xl",
  };

  const colorClasses = {
    default: "border-l-brutal-black",
    success: "border-l-brutal-mint",
    warning: "border-l-brutal-yellow",
    danger: "border-l-brutal-coral",
  };

  /**
   * @function calculateChange
   * @description Calculate percentage change
   */
  const calculateChange = (): number | null => {
    if (
      !previousValue ||
      typeof value !== "number" ||
      typeof previousValue !== "number"
    ) {
      return null;
    }
    return ((value - previousValue) / previousValue) * 100;
  };

  const change = calculateChange();

  return (
    <div
      className={cn(
        // Base brutal styling
        "bg-brutal-surface0 shadow-brutal",
        brutal && "border-4 border-brutal-black border-l-8",
        !brutal && "border border-brutal-gray-300",
        colorClasses[color],
        sizeClasses[size],
        "hover:shadow-brutal-md hover:-translate-y-0.5 transition-all duration-200",
        "transform hover:rotate-0",
        brutal && "-rotate-1",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <p className="text-xs font-black uppercase text-brutal-gray-600 tracking-wider mb-2 transform skew-x-1">
            {title}
          </p>
          <p
            className={cn(
              "font-black text-brutal-black transform -skew-x-2",
              valueSizes[size],
            )}
          >
            {format === "currency" && "$"}
            {typeof value === "number" ? value.toLocaleString() : value}
            {format === "percentage" && "%"}
          </p>
        </div>

        {Icon && (
          <div
            className={cn(
              "p-2 transform rotate-3",
              brutal &&
                "bg-brutal-gray-100 border-2 border-brutal-black shadow-brutal-sm",
              !brutal && "bg-brutal-gray-100 rounded",
            )}
          >
            <Icon className="w-6 h-6 text-brutal-gray-700" />
          </div>
        )}
      </div>

      {/* Change indicator */}
      {change !== null && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-sm font-black uppercase tracking-wider px-2 py-1",
              brutal && "border-2 border-brutal-black shadow-brutal-sm",
              change >= 0
                ? "bg-brutal-mint text-brutal-black"
                : "bg-brutal-coral text-brutal-black",
            )}
          >
            {change >= 0 ? "+" : ""}
            {change.toFixed(1)}%
          </span>
          <span className="text-xs text-brutal-gray-500 font-mono">
            from{" "}
            {typeof previousValue === "number"
              ? previousValue.toLocaleString()
              : previousValue}
          </span>
        </div>
      )}
    </div>
  );
};
