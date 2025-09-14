/**
 * @file src/components/core/Input/InputSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loaders for Input components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface InputSkeletonProps {
  label?: boolean;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

export interface SelectSkeletonProps extends InputSkeletonProps {}

export interface TextareaSkeletonProps extends InputSkeletonProps {
  rows?: number;
}

/**
 * @component InputSkeleton
 * @description Skeleton loader for input fields
 */
export const InputSkeleton: React.FC<InputSkeletonProps> = ({
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
          "w-full bg-brutal-gray-200",
          sizeClasses.padding,
          brutal && sizeClasses.border && "border-brutal-gray-300",
          !brutal && "border-2 border-brutal-gray-300 rounded-md",
        )}
      >
        <div
          className={cn(
            "h-4 bg-brutal-gray-300 rounded w-1/2",
            sizeClasses.text === "text-xs" && "h-3",
          )}
        />
      </div>
    </div>
  );
};

/**
 * @component SelectSkeleton
 * @description Skeleton loader for select dropdowns
 */
export const SelectSkeleton: React.FC<SelectSkeletonProps> = (props) => (
  <InputSkeleton {...props} />
);

/**
 * @component TextareaSkeleton
 * @description Skeleton loader for textarea fields
 */
export const TextareaSkeleton: React.FC<TextareaSkeletonProps> = ({
  label = false,
  brutal = true,
  size = "md",
  rows = 4,
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

      {/* Textarea skeleton */}
      <div
        className={cn(
          "w-full bg-brutal-gray-200 space-y-2",
          sizeClasses.padding,
          brutal && sizeClasses.border && "border-brutal-gray-300",
          !brutal && "border-2 border-brutal-gray-300 rounded-md",
        )}
        style={{ minHeight: `${rows * 1.5}rem` }}
      >
        {Array.from({ length: Math.min(rows, 3) }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-4 bg-brutal-gray-300 rounded",
              i === Math.min(rows, 3) - 1 && "w-2/3", // Last line shorter
            )}
          />
        ))}
      </div>
    </div>
  );
};
