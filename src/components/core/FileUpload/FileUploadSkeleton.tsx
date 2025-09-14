/**
 * @file src/components/core/FileUpload/FileUploadSkeleton.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Skeleton loader for FileUpload components
 */
import React from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";

export interface FileUploadSkeletonProps {
  label?: boolean;
  files?: number;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "compact" | "minimal";
  className?: string;
}

/**
 * @component FileUploadSkeleton
 * @description Skeleton loader for file upload component
 */
export const FileUploadSkeleton: React.FC<FileUploadSkeletonProps> = ({
  label = false,
  files = 2,
  brutal = true,
  size = "md",
  variant = "default",
  className,
}) => {
  const sizeClasses = getSizeClasses(size);
  const isCompact = variant === "compact";
  const isMinimal = variant === "minimal";

  return (
    <div className={cn("animate-pulse space-y-4", className)}>
      {/* Label skeleton */}
      {label && !isMinimal && (
        <div
          className={cn(
            "h-4 bg-brutal-gray-300 rounded w-24",
            sizeClasses.text === "text-xs" && "h-3",
          )}
        />
      )}

      {/* Upload area skeleton */}
      <div
        className={cn(
          "bg-brutal-gray-200 text-center",
          isCompact ? "p-4" : "p-8",
          brutal && [
            sizeClasses.border,
            "border-dashed border-brutal-gray-300",
          ],
          !brutal && "border-2 border-dashed border-brutal-gray-300 rounded-lg",
        )}
      >
        <div className="mx-auto mb-3 w-12 h-12 bg-brutal-gray-300 rounded" />
        <div className="h-4 bg-brutal-gray-300 rounded w-48 mx-auto mb-2" />
        {!isMinimal && (
          <>
            <div className="h-3 bg-brutal-gray-300 rounded w-32 mx-auto mb-2" />
            <div className="h-3 bg-brutal-gray-300 rounded w-40 mx-auto" />
          </>
        )}
      </div>

      {/* File list skeleton */}
      {files > 0 && (
        <div className="space-y-3">
          <div className="h-4 bg-brutal-gray-300 rounded w-32" />
          <div className="space-y-2">
            {Array.from({ length: files }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "flex items-center gap-3 p-3 bg-brutal-gray-100",
                  brutal && "border-2 border-brutal-gray-300",
                  !brutal && "border rounded-lg",
                )}
              >
                <div className="w-6 h-6 bg-brutal-gray-300 rounded flex-shrink-0" />
                <div className="flex-1 space-y-1">
                  <div className="h-4 bg-brutal-gray-300 rounded w-3/4" />
                  <div className="h-3 bg-brutal-gray-300 rounded w-1/2" />
                </div>
                <div className="w-20 h-2 bg-brutal-gray-300 rounded" />
                <div className="w-8 h-8 bg-brutal-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
