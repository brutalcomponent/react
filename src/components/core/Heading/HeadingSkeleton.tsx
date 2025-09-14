/**
 * @file src/components/core/Heading/HeadingSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for Heading components
 */
import React from "react";
import { cn } from "../../../utils/cn.utils";

export interface HeadingSkeletonProps {
  variant?: "display" | "title" | "section" | "subsection" | "hero";
  width?: "full" | "3/4" | "1/2" | "1/3" | "1/4";
  brutal?: boolean;
  className?: string;
}

/**
 * @component HeadingSkeleton
 * @description Skeleton loader for heading components
 */
export const HeadingSkeleton: React.FC<HeadingSkeletonProps> = ({
  variant = "title",
  width = "3/4",
  brutal = true,
  className,
}) => {
  const getHeightClass = () => {
    const heightClasses = {
      hero: "h-16 md:h-20 lg:h-24",
      display: "h-12 md:h-16 lg:h-20",
      title: "h-10 md:h-12 lg:h-16",
      section: "h-8 md:h-10 lg:h-12",
      subsection: "h-6 md:h-8 lg:h-10",
    };
    return heightClasses[variant];
  };

  const getWidthClass = () => {
    const widthClasses = {
      full: "w-full",
      "3/4": "w-3/4",
      "1/2": "w-1/2",
      "1/3": "w-1/3",
      "1/4": "w-1/4",
    };
    return widthClasses[width];
  };

  return (
    <div
      className={cn(
        // Base skeleton
        "animate-pulse bg-brutal-gray-300 rounded",
        getHeightClass(),
        getWidthClass(),

        // Brutal styling
        brutal && ["border-2 border-brutal-gray-400", "transform -skew-x-1"],

        // Spacing
        "mb-4",

        className,
      )}
    />
  );
};
