/**
 * @file src/components/core/Toggle/ToggleSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loaders for Toggle components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface ToggleSkeletonProps {
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pill" | "square";
  showDescription?: boolean;
  className?: string;
}

export interface ToggleGroupSkeletonProps {
  count?: number;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pill" | "square";
  layout?: "vertical" | "horizontal" | "grid";
  showLabel?: boolean;
  showDescription?: boolean;
  className?: string;
}

/**
 * @component ToggleSkeleton
 * @description Skeleton loader for Toggle component
 */
export const ToggleSkeleton: React.FC<ToggleSkeletonProps> = ({
  brutal = true,
  size = "md",
  variant = "default",
  showDescription = false,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getToggleSizes = () => {
    const sizes = {
      xs: "w-8 h-4",
      sm: "w-10 h-5",
      md: "w-14 h-7",
      lg: "w-18 h-9",
    };
    return sizes[size];
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "pill":
        return "rounded-full";
      case "square":
        return "rounded-none";
      default:
        return "rounded-lg";
    }
  };

  return (
    <div
      className={cn("animate-pulse inline-flex items-start gap-3", className)}
    >
      {/* Toggle skeleton */}
      <div
        className={cn(
          "bg-brutal-gray-300 border-2 border-brutal-gray-400",
          getToggleSizes(),
          getVariantClasses(),
          brutal && "border-4",
        )}
      />

      {/* Label and description skeleton */}
      <div className="flex-1 space-y-2">
        <div
          className={cn(
            "bg-brutal-gray-300 rounded w-20",
            sizeClasses.text === "text-xs" ? "h-3" : "h-4",
          )}
        />

        {showDescription && (
          <div
            className={cn(
              "bg-brutal-gray-300 rounded w-32",
              sizeClasses.text === "text-xs" ? "h-3" : "h-4",
            )}
          />
        )}
      </div>
    </div>
  );
};

/**
 * @component ToggleGroupSkeleton
 * @description Skeleton loader for ToggleGroup component
 */
export const ToggleGroupSkeleton: React.FC<ToggleGroupSkeletonProps> = ({
  count = 3,
  brutal = true,
  size = "md",
  variant = "default",
  layout = "vertical",
  showLabel = true,
  showDescription = false,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={cn("animate-pulse w-full", className)}>
      {/* Label skeleton */}
      {showLabel && (
        <div
          className={cn(
            "bg-brutal-gray-300 rounded w-32 mb-3",
            sizeClasses.text === "text-xs" ? "h-3" : "h-4",
          )}
        />
      )}

      {/* Description skeleton */}
      {showDescription && (
        <div
          className={cn(
            "bg-brutal-gray-300 rounded w-48 mb-4",
            sizeClasses.text === "text-xs" ? "h-3" : "h-4",
          )}
        />
      )}

      {/* Toggle options skeleton */}
      <div
        className={cn(
          layout === "horizontal" && "flex flex-wrap gap-4",
          layout === "vertical" && "space-y-3",
          layout === "grid" && "grid grid-cols-1 sm:grid-cols-2 gap-3",
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <ToggleSkeleton
            key={i}
            brutal={brutal}
            size={size}
            variant={variant}
            showDescription={showDescription && i === 0} // Only show description on first item
          />
        ))}
      </div>
    </div>
  );
};
