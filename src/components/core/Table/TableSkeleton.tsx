/**
 * @file src/components/core/Table/TableSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for Table components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "striped" | "bordered" | "minimal";
  brutal?: boolean;
  showSearch?: boolean;
  showPagination?: boolean;
  className?: string;
}

/**
 * @component TableSkeleton
 * @description Skeleton loader for table component
 */
export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  size = "md",
  variant = "default",
  brutal = true,
  showSearch = false,
  showPagination = false,
  className,
}) => {
  const sizeClasses = getSizeClasses(size);

  const getCellPadding = () => {
    const paddings = {
      xs: "px-2 py-1",
      sm: "px-3 py-2",
      md: "px-4 py-3",
      lg: "px-6 py-4",
    };
    return paddings[size];
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "striped":
        return {
          header: "bg-brutal-black",
          row: "even:bg-brutal-gray-50",
        };

      case "bordered":
        return {
          header: "bg-brutal-gray-200 border-b-2 border-brutal-black",
          row: "border-b border-brutal-gray-300",
        };

      case "minimal":
        return {
          header: "bg-transparent border-b-2 border-brutal-gray-300",
          row: "border-b border-brutal-gray-200",
        };

      default:
        return {
          header: "bg-brutal-black",
          row: "border-b-2 border-brutal-gray-200",
        };
    }
  };

  const variantStyles = getVariantClasses();

  return (
    <div className={cn("animate-pulse w-full", className)}>
      {/* Search skeleton */}
      {showSearch && (
        <div className="mb-4">
          <div
            className={cn(
              "bg-brutal-gray-200 rounded w-64 h-10",
              brutal && "border-2 border-brutal-gray-300",
            )}
          />
        </div>
      )}

      {/* Table skeleton */}
      <div
        className={cn(
          "overflow-hidden",
          brutal && "border-4 border-brutal-gray-300 shadow-brutal",
          !brutal && "border rounded-lg",
        )}
      >
        <div className="w-full">
          {/* Header skeleton */}
          <div className={cn(variantStyles.header, getCellPadding())}>
            <div className="flex gap-4">
              {Array.from({ length: columns }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "bg-brutal-gray-600 rounded flex-1",
                    sizeClasses.text === "text-xs" ? "h-3" : "h-4",
                    variant === "minimal" && "bg-brutal-gray-400",
                    variant === "bordered" && "bg-brutal-gray-400",
                  )}
                />
              ))}
            </div>
          </div>

          {/* Rows skeleton */}
          <div className="bg-brutal-white">
            {Array.from({ length: rows }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  getCellPadding(),
                  variantStyles.row,
                  i === rows - 1 && "border-b-0", // Remove border from last row
                )}
              >
                <div className="flex gap-4">
                  {Array.from({ length: columns }).map((_, j) => (
                    <div
                      key={j}
                      className={cn(
                        "bg-brutal-gray-300 rounded flex-1",
                        sizeClasses.text === "text-xs" ? "h-3" : "h-4",
                        // Random widths for variety
                        j % 3 === 0 && "w-3/4",
                        j % 3 === 1 && "w-full",
                        j % 3 === 2 && "w-1/2",
                      )}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination skeleton */}
      {showPagination && (
        <div className="mt-4 flex items-center justify-between">
          <div className="bg-brutal-gray-300 rounded w-48 h-4" />
          <div className="flex items-center gap-2">
            <div className="bg-brutal-gray-300 rounded w-20 h-8" />
            <div className="bg-brutal-gray-300 rounded w-16 h-4" />
            <div className="bg-brutal-gray-300 rounded w-16 h-8" />
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * @component SimpleTableSkeleton
 * @description Simple table skeleton for quick loading states
 */
export const SimpleTableSkeleton: React.FC<{
  rows?: number;
  columns?: number;
  brutal?: boolean;
  className?: string;
}> = ({ rows = 3, columns = 3, brutal = true, className }) => (
  <div
    className={cn(
      "animate-pulse overflow-hidden",
      brutal && "border-4 border-brutal-gray-300 shadow-brutal",
      !brutal && "border rounded-lg",
      className,
    )}
  >
    {/* Header */}
    <div className="bg-brutal-gray-400 p-4">
      <div className="flex gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <div key={i} className="h-4 bg-brutal-gray-600 rounded flex-1" />
        ))}
      </div>
    </div>

    {/* Rows */}
    <div className="bg-brutal-white p-4 space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <div key={j} className="h-4 bg-brutal-gray-300 rounded flex-1" />
          ))}
        </div>
      ))}
    </div>
  </div>
);
