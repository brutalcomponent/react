/**
 * @file src/components/core/Metric/Metric.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Metric display component for dashboards
 */
import React from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

export interface MetricProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: IconType;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon: Icon,
  variant = "default",
  className,
}) => {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return FaMinus;
    return change > 0 ? FaArrowUp : FaArrowDown;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-brutal-gray-500";
    return change > 0 ? "text-brutal-mint" : "text-brutal-coral";
  };

  const variantColors = {
    default: "border-l-brutal-black",
    success: "border-l-brutal-mint",
    warning: "border-l-brutal-yellow",
    danger: "border-l-brutal-coral",
  };

  const TrendIcon = getTrendIcon();

  return (
    <div
      className={clsx(
        "bg-brutal-white p-6 border-4 border-brutal-black shadow-brutal",
        "border-l-8",
        variantColors[variant],
        "hover:shadow-brutal-md hover:-translate-y-0.5 transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs font-bold uppercase text-brutal-gray-600 tracking-wider mb-1">
            {title}
          </p>
          <p className="text-3xl font-black text-brutal-black">{value}</p>
        </div>
        {Icon && (
          <div className="p-2 bg-brutal-gray-100 border-2 border-brutal-black">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(subtitle || change !== undefined) && (
        <div className="flex items-center justify-between">
          {subtitle && (
            <p className="text-xs text-brutal-gray-600 font-mono">{subtitle}</p>
          )}
          {change !== undefined && (
            <div className={clsx("flex items-center gap-1", getTrendColor())}>
              <TrendIcon className="w-3 h-3" />
              <span className="text-xs font-bold">{Math.abs(change)}%</span>
              {changeLabel && (
                <span className="text-xs text-brutal-gray-600">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/**
 * @component MetricSkeleton
 * @description Skeleton loader for Metric
 */
export const MetricSkeleton: React.FC = () => (
  <div className="bg-brutal-white p-6 border-4 border-brutal-black shadow-brutal animate-pulse">
    <div className="mb-4">
      <div className="h-4 bg-brutal-gray-200 rounded w-24 mb-2" />
      <div className="h-8 bg-brutal-gray-200 rounded w-32" />
    </div>
    <div className="h-3 bg-brutal-gray-200 rounded w-20" />
  </div>
);
