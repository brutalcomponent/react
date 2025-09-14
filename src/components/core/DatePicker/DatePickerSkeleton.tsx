/**
 * @file src/components/core/DatePicker/DatePickerSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for DatePicker components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface DatePickerSkeletonProps {
  label?: boolean;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

/**
 * @component DatePickerSkeleton
 * @description Skeleton loader for date picker
 */
export const DatePickerSkeleton: React.FC<DatePickerSkeletonProps> = ({
  label = false,
  brutal = true,
  size = "md",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  return (
    <div className={cn("animate-pulse", className)}>
      {/* Label skeleton */}
      {label && (
        <div
          className={cn(
            "h-4 bg-brutal-gray-300 rounded w-20 mb-2",
            sizeClasses.text === "text-xs" && "h-3",
          )}
        />
      )}

      {/* Input skeleton */}
      <div
        className={cn(
          "w-full bg-brutal-gray-200 flex items-center justify-between",
          sizeClasses.padding,
          brutal && [sizeClasses.border, "border-brutal-gray-300"],
          !brutal && "border-2 border-brutal-gray-300 rounded-md",
        )}
      >
        <div className="h-4 bg-brutal-gray-300 rounded w-32" />
        <div className="h-4 w-4 bg-brutal-gray-300 rounded" />
      </div>
    </div>
  );
};
