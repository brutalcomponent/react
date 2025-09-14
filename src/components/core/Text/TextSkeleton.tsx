/**
 * @file src/components/core/Text/TextSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loaders for Text components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TextSkeletonProps {
  variant?: "body" | "lead" | "small" | "caption" | "heading";
  lines?: number;
  width?: "full" | "3/4" | "1/2" | "1/3" | "1/4";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  className?: string;
}

/**
 * @component TextSkeleton
 * @description Skeleton loader for text content
 */
export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  variant = "body",
  lines = 1,
  width = "full",
  size = "md",
  brutal = true,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getHeightClass = () => {
    const heights = {
      body: "h-4",
      lead: "h-5",
      small: "h-3",
      caption: "h-3",
      heading: "h-8",
    };
    return heights[variant];
  };

  const getWidthClass = () => {
    const widths = {
      full: "w-full",
      "3/4": "w-3/4",
      "1/2": "w-1/2",
      "1/3": "w-1/3",
      "1/4": "w-1/4",
    };
    return widths[width];
  };

  if (lines === 1) {
    return (
      <div
        className={cn(
          "animate-pulse bg-brutal-gray-300 rounded",
          getHeightClass(),
          getWidthClass(),
          brutal && "transform -skew-x-1",
          className,
        )}
      />
    );
  }

  return (
    <div className={cn("space-y-2", className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse bg-brutal-gray-300 rounded",
            getHeightClass(),
            // Vary width for last line
            i === lines - 1 ? "w-2/3" : "w-full",
            brutal && "transform -skew-x-1",
          )}
          style={{
            animationDelay: `${i * 100}ms`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * @component WavyTitleSkeleton
 * @description Skeleton loader for wavy title
 */
export const WavyTitleSkeleton: React.FC<{
  length?: number;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  brutal?: boolean;
  className?: string;
}> = ({ length = 8, size = "xl", brutal = true, className }) => {
  const getSizeClasses = () => {
    const sizes = {
      sm: "h-6",
      md: "h-8",
      lg: "h-10",
      xl: "h-12",
      "2xl": "h-16",
    };
    return sizes[size];
  };

  return (
    <div
      className={cn(
        "flex flex-wrap justify-center items-center gap-2 mb-8",
        className,
      )}
    >
      {Array.from({ length }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "animate-pulse bg-brutal-gray-300 rounded",
            getSizeClasses(),
            // Random widths for letters
            i % 4 === 0 && "w-8",
            i % 4 === 1 && "w-6",
            i % 4 === 2 && "w-10",
            i % 4 === 3 && "w-4",
            brutal && "transform -skew-x-2",
          )}
          style={{
            animationDelay: `${i * 50}ms`,
          }}
        />
      ))}
    </div>
  );
};
