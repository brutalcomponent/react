/**
 * @file src/components/core/Chip/ChipGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Container for grouping chips with optional show more functionality
 */
import React from "react";
import { cn } from "../../../utils/cn.utils";

export interface ChipGroupProps {
  children: React.ReactNode;
  maxItems?: number;
  showMore?: boolean;
  onShowMore?: () => void;
  wrap?: boolean;
  spacing?: "tight" | "normal" | "loose";
  brutal?: boolean;
  className?: string;
}

/**
 * @component ChipGroup
 * @description Container for organizing chips with consistent spacing and optional overflow handling
 */
export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  maxItems,
  showMore = false,
  onShowMore,
  wrap = true,
  spacing = "normal",
  brutal = true,
  className,
}) => {
  const spacingClasses = {
    tight: "gap-1",
    normal: "gap-2",
    loose: "gap-3",
  };

  return (
    <div
      className={cn(
        // Base layout
        "flex items-center",
        wrap ? "flex-wrap" : "flex-nowrap overflow-x-auto",
        spacingClasses[spacing],

        // Brutal styling
        brutal && "relative",

        className,
      )}
    >
      {children}
    </div>
  );
};

/**
 * @component ChipGroupSkeleton
 * @description Skeleton loader for ChipGroup
 */
export interface ChipGroupSkeletonProps {
  count?: number;
  brutal?: boolean;
  className?: string;
}

export const ChipGroupSkeleton: React.FC<ChipGroupSkeletonProps> = ({
  count = 3,
  brutal = true,
  className,
}) => (
  <div className={cn("flex flex-wrap gap-2 animate-pulse", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "h-6 bg-brutal-gray-300 rounded",
          brutal && "border-2 border-brutal-gray-400",
          // Random widths for variety
          i % 3 === 0 && "w-16",
          i % 3 === 1 && "w-20",
          i % 3 === 2 && "w-12",
        )}
      />
    ))}
  </div>
);
