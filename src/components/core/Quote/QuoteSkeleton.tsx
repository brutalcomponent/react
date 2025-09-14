/**
 * @file src/components/core/Quote/QuoteSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loaders for Quote components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface QuoteSkeletonProps {
  variant?: "default" | "large" | "testimonial" | "minimal" | "card";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  showAuthor?: boolean;
  className?: string;
}

export interface PullQuoteSkeletonProps {
  variant?: "default" | "centered" | "offset" | "full-width";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  showAuthor?: boolean;
  className?: string;
}

/**
 * @component QuoteSkeleton
 * @description Skeleton loader for Quote component
 */
export const QuoteSkeleton: React.FC<QuoteSkeletonProps> = ({
  variant = "default",
  size = "md",
  brutal = true,
  showAuthor = true,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getContainerClasses = () => {
    switch (variant) {
      case "large":
        return "p-8";
      case "testimonial":
        return "p-8 text-center";
      case "minimal":
        return "p-4";
      case "card":
        return "p-6";
      default:
        return "p-6";
    }
  };

  const getTextHeight = () => {
    const heights = {
      xs: "h-4",
      sm: "h-5",
      md: "h-6",
      lg: "h-8",
    };
    return heights[size];
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-brutal-gray-100 relative",
        getContainerClasses(),

        // Brutal styling
        brutal && [
          variant !== "minimal" &&
            "border-l-4 border-brutal-gray-300 shadow-brutal",
          variant === "card" && "border-4 border-brutal-gray-300",
        ],
        !brutal && [
          variant !== "minimal" &&
            "border-l-4 border-brutal-gray-300 rounded-lg",
        ],

        // Variant specific styling
        variant === "minimal" && "border-l-2 border-brutal-gray-300 pl-4",

        className,
      )}
    >
      {/* Quote mark skeleton */}
      <div className="absolute top-4 left-4 w-6 h-6 bg-brutal-gray-300 rounded opacity-20" />

      {/* Text lines skeleton */}
      <div className="space-y-3 mt-8">
        <div
          className={cn("bg-brutal-gray-300 rounded w-full", getTextHeight())}
        />
        <div
          className={cn("bg-brutal-gray-300 rounded w-5/6", getTextHeight())}
        />
        <div
          className={cn("bg-brutal-gray-300 rounded w-4/6", getTextHeight())}
        />
      </div>

      {/* Author skeleton */}
      {showAuthor && (
        <div
          className={cn(
            "mt-6 bg-brutal-gray-300 rounded w-32 h-4",
            variant === "testimonial" && "mx-auto",
          )}
        />
      )}
    </div>
  );
};

/**
 * @component PullQuoteSkeleleton
 * @description Skeleton loader for PullQuote component
 */
export const PullQuoteSkeleton: React.FC<PullQuoteSkeletonProps> = ({
  variant = "default",
  size = "lg",
  brutal = true,
  showAuthor = false,
  className,
}) => {
  const getContainerClasses = () => {
    switch (variant) {
      case "centered":
        return "text-center py-12 px-8";
      case "offset":
        return "py-8 px-6 ml-8 md:ml-16";
      case "full-width":
        return "py-16 px-4 text-center";
      default:
        return "py-8 px-6";
    }
  };

  const getTextHeight = () => {
    const heights = {
      xs: "h-6",
      sm: "h-8",
      md: "h-10",
      lg: "h-12",
    };
    return heights[size];
  };

  return (
    <div
      className={cn(
        "animate-pulse my-8 relative",
        getContainerClasses(),

        // Brutal styling
        brutal && [
          variant !== "full-width" &&
            "border-t-4 border-b-4 border-brutal-gray-300",
          variant === "full-width" && "border-y-8 border-brutal-gray-300",
        ],
        !brutal &&
          "border-l-4 border-brutal-gray-300 rounded-lg bg-brutal-gray-50",

        // Variant specific styling
        variant === "offset" && "border-l-8 border-brutal-gray-300",

        className,
      )}
    >
      {/* Quote marks skeleton */}
      <div className="absolute top-4 left-4 w-8 h-8 bg-brutal-gray-300 rounded opacity-10" />
      <div className="absolute bottom-4 right-4 w-8 h-8 bg-brutal-gray-300 rounded opacity-10" />

      {/* Text skeleton */}
      <div
        className={cn(
          "space-y-4 mt-8 mb-8",
          variant === "centered" || variant === "full-width"
            ? "max-w-4xl mx-auto"
            : "",
        )}
      >
        <div
          className={cn("bg-brutal-gray-300 rounded w-full", getTextHeight())}
        />
        <div
          className={cn("bg-brutal-gray-300 rounded w-4/5", getTextHeight())}
        />
      </div>

      {/* Author skeleton */}
      {showAuthor && (
        <div
          className={cn(
            "bg-brutal-gray-300 rounded w-24 h-4",
            variant === "centered" || variant === "full-width"
              ? "mx-auto"
              : "ml-auto",
          )}
        />
      )}
    </div>
  );
};
