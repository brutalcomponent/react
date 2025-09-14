/**
 * @file src/components/core/Metric/Metric.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal metric display component for dashboards with trend indicators and animations
 */
import React from "react";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";
import { Icon } from "../Icon";
import {
  cn,
  getSizeClasses,
  getAccentClasses,
  brutalBase,
} from "../../../utils/cn.utils";
import {
  formatNumber,
  formatCurrency,
  formatPercentage,
} from "../../../utils/format.utils";

export interface MetricProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon?: React.ComponentType<any>;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "xs" | "sm" | "md" | "lg";
  format?: "number" | "currency" | "percentage" | "custom";
  currency?: string;
  locale?: string;
  animated?: boolean;
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}

/**
 * @component Metric
 * @description Brutal metric display with trend indicators and formatting options
 */
export const Metric: React.FC<MetricProps> = ({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon: IconComponent,
  variant = "default",
  size = "md",
  format = "custom",
  currency = "USD",
  locale = "en-US",
  animated = true,
  brutal = true,
  accentColor = "brutal-pink",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);
  const accentClasses = getAccentClasses(accentColor);

  const getTrendIcon = () => {
    if (change === undefined || change === 0) return FaMinus;
    return change > 0 ? FaArrowUp : FaArrowDown;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-brutal-gray-500";
    return change > 0 ? "text-brutal-mint" : "text-brutal-coral";
  };

  const getVariantClasses = () => {
    const variants = {
      default: "border-l-brutal-black",
      success: "border-l-brutal-mint",
      warning: "border-l-brutal-yellow",
      danger: "border-l-brutal-coral",
      info: "border-l-brutal-sky",
    };
    return variants[variant];
  };

  const formatValue = (val: string | number): string => {
    if (typeof val === "string") return val;

    switch (format) {
      case "number":
        return formatNumber(val, 0, locale);
      case "currency":
        return formatCurrency(val, currency, locale);
      case "percentage":
        return formatPercentage(val);
      default:
        return val.toString();
    }
  };

  const getValueSize = () => {
    const sizes = {
      xs: "text-lg",
      sm: "text-xl",
      md: "text-3xl",
      lg: "text-4xl",
    };
    return sizes[size];
  };

  const TrendIcon = getTrendIcon();

  return (
    <div
      className={cn(
        // Base styling
        "bg-brutal-white p-6 relative overflow-hidden",

        // Brutal styling
        brutal && [
          "border-4 border-brutal-black shadow-brutal border-l-8",
          getVariantClasses(),
          animated && [
            "hover:shadow-brutal-md hover:-translate-y-0.5",
            "transition-all duration-300 transform hover:rotate-0",
            "-rotate-1",
          ],
        ],
        !brutal && [
          "border border-l-4 rounded-lg shadow-lg",
          getVariantClasses().replace("border-l-", "border-l-"),
          animated &&
            "hover:shadow-xl hover:scale-105 transition-all duration-300",
        ],

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
      {/* Header with title and icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "font-black uppercase tracking-wider text-brutal-gray-600 mb-2",
              size === "xs" ? "text-xs" : "text-sm",
            )}
          >
            {title}
          </p>
          <p
            className={cn(
              "font-black text-brutal-black leading-none",
              getValueSize(),
              animated && "transition-all duration-500",
            )}
          >
            {formatValue(value)}
          </p>
        </div>

        {IconComponent && (
          <div
            className={cn(
              "flex-shrink-0 p-2 ml-4",
              "bg-brutal-gray-100 text-brutal-gray-700",
              brutal && [
                "border-2 border-brutal-black shadow-brutal-sm",
                animated &&
                  "hover:shadow-brutal hover:-rotate-3 transition-all duration-200",
              ],
              !brutal && "rounded-lg",
            )}
          >
            <Icon
              icon={() => <IconComponent />}
              size={size === "xs" ? "sm" : size === "sm" ? "md" : "lg"}
              brutal={brutal && animated}
            />
          </div>
        )}
      </div>

      {/* Footer with subtitle and trend */}
      {(subtitle || change !== undefined) && (
        <div className="flex items-center justify-between gap-4">
          {subtitle && (
            <p
              className={cn(
                "text-brutal-gray-600 font-mono flex-1 min-w-0 truncate",
                size === "xs" ? "text-xs" : "text-sm",
              )}
            >
              {subtitle}
            </p>
          )}

          {change !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1.5 flex-shrink-0",
                getTrendColor(),
                animated && "transition-colors duration-300",
              )}
            >
              <Icon
                icon={TrendIcon}
                size="xs"
                className={cn(animated && change !== 0 && "animate-bounce")}
              />
              <span
                className={cn(
                  "font-black",
                  size === "xs" ? "text-xs" : "text-sm",
                )}
              >
                {Math.abs(change).toFixed(1)}%
              </span>
              {changeLabel && (
                <span
                  className={cn(
                    "text-brutal-gray-600 font-mono",
                    size === "xs" ? "text-xs" : "text-sm",
                  )}
                >
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Decorative corner element */}
      {brutal && animated && (
        <div className="absolute top-0 right-0 w-8 h-8 bg-accent opacity-10 -mr-4 -mt-4 rotate-45" />
      )}
    </div>
  );
};

/**
 * @component MetricSkeleton
 * @description Skeleton loader for Metric component
 */
export interface MetricSkeletonProps {
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  showIcon?: boolean;
  showTrend?: boolean;
  className?: string;
}

export const MetricSkeleton: React.FC<MetricSkeletonProps> = ({
  size = "md",
  brutal = true,
  showIcon = false,
  showTrend = false,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getValueHeight = () => {
    const heights = {
      xs: "h-5",
      sm: "h-6",
      md: "h-8",
      lg: "h-10",
    };
    return heights[size];
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-brutal-white p-6",
        brutal &&
          "border-4 border-brutal-gray-300 shadow-brutal border-l-8 border-l-brutal-gray-400",
        !brutal &&
          "border border-l-4 border-l-brutal-gray-400 rounded-lg shadow-lg",
        className,
      )}
    >
      {/* Header skeleton */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div
            className={cn(
              "bg-brutal-gray-300 rounded w-24 mb-2",
              size === "xs" ? "h-3" : "h-4",
            )}
          />
          <div
            className={cn("bg-brutal-gray-300 rounded w-32", getValueHeight())}
          />
        </div>

        {showIcon && (
          <div
            className={cn(
              "bg-brutal-gray-200 ml-4",
              size === "xs"
                ? "w-8 h-8"
                : size === "sm"
                  ? "w-10 h-10"
                  : "w-12 h-12",
              brutal && "border-2 border-brutal-gray-300",
              !brutal && "rounded-lg",
            )}
          />
        )}
      </div>

      {/* Footer skeleton */}
      <div className="flex items-center justify-between gap-4">
        <div
          className={cn(
            "bg-brutal-gray-300 rounded flex-1",
            size === "xs" ? "h-3" : "h-4",
          )}
        />

        {showTrend && (
          <div
            className={cn(
              "bg-brutal-gray-300 rounded w-16",
              size === "xs" ? "h-3" : "h-4",
            )}
          />
        )}
      </div>
    </div>
  );
};
