/**
 * @file src/components/core/Radio/RadioSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loaders for Radio components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface RadioSkeletonProps {
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "card" | "button";
  showDescription?: boolean;
  className?: string;
}

export interface RadioGroupSkeletonProps {
  count?: number;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "card" | "button";
  layout?: "vertical" | "horizontal" | "grid";
  showLabel?: boolean;
  showDescription?: boolean;
  className?: string;
}

/**
 * @component RadioSkeleton
 * @description Skeleton loader for Radio component
 */
export const RadioSkeleton: React.FC<RadioSkeletonProps> = ({
  brutal = true,
  size = "md",
  variant = "default",
  showDescription = false,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getRadioSize = () => {
    const sizes = {
      xs: "w-4 h-4",
      sm: "w-5 h-5",
      md: "w-6 h-6",
      lg: "w-7 h-7",
    };
    return sizes[size];
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "card":
        return cn(
          "p-4 border-2 border-brutal-gray-300",
          brutal && "shadow-brutal-sm",
        );

      case "button":
        return cn(
          "px-4 py-2 border-2 border-brutal-gray-300",
          brutal && "shadow-brutal",
        );

      default:
        return "inline-flex items-center gap-3";
    }
  };

  return (
    <div className={cn("animate-pulse", getVariantClasses(), className)}>
      {/* Radio button skeleton */}
      {variant !== "button" && (
        <div
          className={cn(
            "rounded-full bg-brutal-gray-300 border-2 border-brutal-gray-400",
            getRadioSize(),
            brutal && "border-4",
          )}
        />
      )}

      {/* Label and description skeleton */}
      <div className="flex-1 space-y-2">
        <div
          className={cn(
            "bg-brutal-gray-300 rounded w-24",
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
 * @component RadioGroupSkeleton
 * @description Skeleton loader for RadioGroup component
 */
export const RadioGroupSkeleton: React.FC<RadioGroupSkeletonProps> = ({
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

      {/* Radio options skeleton */}
      <div
        className={cn(
          layout === "horizontal" && "flex flex-wrap gap-4",
          layout === "vertical" && "space-y-3",
          layout === "grid" && "grid grid-cols-1 sm:grid-cols-2 gap-3",
        )}
      >
        {Array.from({ length: count }).map((_, i) => (
          <RadioSkeleton
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
