/**
 * @file src/components/core/Link/LinkSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for Link components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface LinkSkeletonProps {
  variant?: "default" | "underline" | "button" | "nav" | "ghost" | "brutal";
  width?: "short" | "medium" | "long" | "full";
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}

/**
 * @component LinkSkeleton
 * @description Skeleton loader for link components
 */
export const LinkSkeleton: React.FC<LinkSkeletonProps> = ({
  variant = "default",
  width = "medium",
  brutal = true,
  size = "md",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getWidthClass = () => {
    const widthClasses = {
      short: "w-16",
      medium: "w-24",
      long: "w-32",
      full: "w-full",
    };
    return widthClasses[width];
  };

  const getHeightClass = () => {
    if (variant === "button") {
      return cn(sizeClasses.padding, "h-auto");
    }

    const heightClasses = {
      xs: "h-3",
      sm: "h-4",
      md: "h-5",
      lg: "h-6",
    };
    return heightClasses[size];
  };

  return (
    <div
      className={cn(
        // Base skeleton
        "animate-pulse bg-brutal-gray-300 inline-block",
        getWidthClass(),
        getHeightClass(),

        // Variant specific styling
        variant === "button" && [
          "rounded-none",
          brutal && "border-2 border-brutal-gray-400",
        ],
        variant === "underline" && "border-b-2 border-brutal-gray-400",
        variant !== "button" && "rounded",

        // Brutal styling
        brutal && variant !== "button" && "transform -skew-x-1",

        className,
      )}
    />
  );
};

/**
 * @component LinkGroupSkeleton
 * @description Skeleton for a group of links (like navigation)
 */
export interface LinkGroupSkeletonProps {
  count?: number;
  variant?: LinkSkeletonProps["variant"];
  brutal?: boolean;
  size?: LinkSkeletonProps["size"];
  className?: string;
}

export const LinkGroupSkeleton: React.FC<LinkGroupSkeletonProps> = ({
  count = 4,
  variant = "nav",
  brutal = true,
  size = "md",
  className,
}) => (
  <div className={cn("flex items-center gap-4", className)}>
    {Array.from({ length: count }).map((_, i) => (
      <LinkSkeleton
        key={i}
        variant={variant}
        width={i % 2 === 0 ? "medium" : "short"}
        brutal={brutal}
        size={size}
      />
    ))}
  </div>
);
