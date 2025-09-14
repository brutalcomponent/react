/**
 * @file src/components/core/Tooltip/TooltipSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for Tooltip components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TooltipSkeletonProps {
  position?: "top" | "bottom" | "left" | "right";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  width?: "short" | "medium" | "long";
  className?: string;
}

/**
 * @component TooltipSkeleton
 * @description Skeleton loader for tooltip content
 */
export const TooltipSkeleton: React.FC<TooltipSkeletonProps> = ({
  position = "top",
  size = "sm",
  brutal = true,
  width = "medium",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getWidthClass = () => {
    const widths = {
      short: "w-16",
      medium: "w-24",
      long: "w-32",
    };
    return widths[width];
  };

  const getArrowClasses = () => {
    const arrowSize = brutal ? "10px" : "6px";

    switch (position) {
      case "top":
        return cn(
          "bottom-[-10px] left-1/2 transform -translate-x-1/2",
          `border-l-[${arrowSize}] border-l-transparent`,
          `border-r-[${arrowSize}] border-r-transparent`,
          `border-t-[${arrowSize}] border-t-brutal-gray-400`,
        );
      case "bottom":
        return cn(
          "top-[-10px] left-1/2 transform -translate-x-1/2",
          `border-l-[${arrowSize}] border-l-transparent`,
          `border-r-[${arrowSize}] border-r-transparent`,
          `border-b-[${arrowSize}] border-b-brutal-gray-400`,
        );
      case "left":
        return cn(
          "right-[-10px] top-1/2 transform -translate-y-1/2",
          `border-t-[${arrowSize}] border-t-transparent`,
          `border-b-[${arrowSize}] border-b-transparent`,
          `border-l-[${arrowSize}] border-l-brutal-gray-400`,
        );
      case "right":
        return cn(
          "left-[-10px] top-1/2 transform -translate-y-1/2",
          `border-t-[${arrowSize}] border-t-transparent`,
          `border-b-[${arrowSize}] border-b-transparent`,
          `border-r-[${arrowSize}] border-r-brutal-gray-400`,
        );
    }
  };

  return (
    <div
      className={cn(
        // Base styling
        "relative animate-pulse bg-brutal-gray-300",
        "font-bold uppercase tracking-wider",

        // Size classes
        sizeClasses.padding,
        getWidthClass(),
        sizeClasses.text === "text-xs" ? "h-6" : "h-8",

        // Brutal styling
        brutal && [
          "border-4 border-brutal-gray-400 shadow-brutal",
          "transform -rotate-1",
        ],
        !brutal && "rounded-md shadow-lg border border-brutal-gray-400",

        className,
      )}
    >
      {/* Arrow skeleton */}
      <div className={cn("absolute w-0 h-0", getArrowClasses())} />
    </div>
  );
};
