/**
 * @file src/components/core/Code/CodeSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for Code components
 */
import React from "react";
import { cn } from "../../../utils/cn.utils";

export interface CodeSkeletonProps {
  lines?: number;
  showHeader?: boolean;
  showLineNumbers?: boolean;
  brutal?: boolean;
  className?: string;
}

/**
 * @component CodeSkeleton
 * @description Skeleton loader for code blocks
 */
export const CodeSkeleton: React.FC<CodeSkeletonProps> = ({
  lines = 8,
  showHeader = true,
  showLineNumbers = false,
  brutal = true,
  className,
}) => {
  return (
    <div
      className={cn(
        // Base container
        "animate-pulse overflow-hidden",

        // Brutal styling
        brutal && ["border-4 border-brutal-gray-300", "shadow-brutal"],
        !brutal && "border rounded-lg",

        className,
      )}
    >
      {/* Header skeleton */}
      {showHeader && (
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3",
            "bg-brutal-gray-200",
            brutal && "border-b-4 border-brutal-gray-300",
            !brutal && "border-b",
          )}
        >
          <div className="h-4 bg-brutal-gray-300 rounded w-20" />
          <div className="h-6 bg-brutal-gray-300 rounded w-16" />
        </div>
      )}

      {/* Code content skeleton */}
      <div className="bg-brutal-gray-100 p-4 space-y-3">
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            {showLineNumbers && (
              <div className="h-4 bg-brutal-gray-300 rounded w-6 flex-shrink-0" />
            )}
            <div
              className={cn(
                "h-4 bg-brutal-gray-300 rounded",
                // Random widths for variety
                i % 4 === 0 && "w-3/4",
                i % 4 === 1 && "w-full",
                i % 4 === 2 && "w-1/2",
                i % 4 === 3 && "w-5/6",
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
