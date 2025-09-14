/**
 * @file src/components/core/Tabs/TabsSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loaders for Tabs components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TabsSkeletonProps {
  tabCount?: number;
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pills" | "underline" | "cards";
  brutal?: boolean;
  showContent?: boolean;
  contentHeight?: string;
  className?: string;
}

/**
 * @component TabsSkeleton
 * @description Skeleton loader for tabs component
 */
export const TabsSkeleton: React.FC<TabsSkeletonProps> = ({
  tabCount = 3,
  orientation = "horizontal",
  size = "md",
  variant = "default",
  brutal = true,
  showContent = true,
  contentHeight = "200px",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getVariantClasses = () => {
    switch (variant) {
      case "pills":
        return cn(
          "gap-2 p-1 rounded-lg",
          brutal && "bg-brutal-gray-200 border-4 border-brutal-gray-300",
          !brutal && "bg-brutal-gray-200 rounded-lg border",
        );

      case "underline":
        return "border-b-2 border-brutal-gray-300";

      case "cards":
        return cn(
          "gap-1 bg-brutal-gray-200 p-1 rounded-lg",
          brutal && "border-2 border-brutal-gray-300",
        );

      default:
        return cn(
          brutal && "border-b-4 border-brutal-gray-300 bg-brutal-gray-100",
          !brutal && "border-b-2 border-brutal-gray-300 bg-brutal-gray-100",
        );
    }
  };

  const getTabClasses = () => {
    switch (variant) {
      case "pills":
      case "cards":
        return "rounded-md";

      case "underline":
        return "border-b-2 border-transparent";

      default:
        return cn(
          brutal && "border-r-2 last:border-r-0 border-brutal-gray-300",
          orientation === "vertical" &&
            brutal &&
            "border-r-0 border-b-2 last:border-b-0",
        );
    }
  };

  const getContentClasses = () => {
    switch (variant) {
      case "pills":
      case "cards":
        return cn(
          "rounded-lg",
          brutal && "border-2 border-brutal-gray-300 bg-brutal-gray-100",
          !brutal && "border bg-brutal-gray-100 rounded-lg",
        );

      case "underline":
        return "border-t border-brutal-gray-300 bg-brutal-gray-100";

      default:
        return cn(
          brutal && "bg-brutal-gray-100",
          !brutal && "bg-brutal-gray-100",
        );
    }
  };

  return (
    <div
      className={cn(
        "animate-pulse flex w-full",
        orientation === "vertical" ? "flex-row gap-4" : "flex-col",
        brutal && "gap-2",
        className,
      )}
    >
      {/* Tabs list skeleton */}
      <div
        className={cn(
          "flex",
          orientation === "vertical" ? "flex-col" : "flex-row",
          getVariantClasses(),
        )}
      >
        {Array.from({ length: tabCount }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex items-center justify-center bg-brutal-gray-300",
              sizeClasses.padding,
              getTabClasses(),
              orientation === "vertical" && "w-full justify-start",
              i === 0 && "bg-brutal-gray-400", // First tab appears "active"
            )}
          >
            <div
              className={cn(
                "bg-brutal-gray-500 rounded",
                sizeClasses.text === "text-xs" ? "h-3" : "h-4",
                // Random widths for variety
                i % 3 === 0 && "w-16",
                i % 3 === 1 && "w-20",
                i % 3 === 2 && "w-12",
              )}
            />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      {showContent && (
        <div
          className={cn("space-y-3", sizeClasses.padding, getContentClasses())}
          style={{ minHeight: contentHeight }}
        >
          <div className="h-6 bg-brutal-gray-300 rounded w-1/3" />
          <div className="h-4 bg-brutal-gray-300 rounded w-full" />
          <div className="h-4 bg-brutal-gray-300 rounded w-5/6" />
          <div className="h-4 bg-brutal-gray-300 rounded w-4/6" />
          <div className="h-4 bg-brutal-gray-300 rounded w-3/4" />
        </div>
      )}
    </div>
  );
};
