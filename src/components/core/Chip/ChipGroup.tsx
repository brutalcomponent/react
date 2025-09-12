/**
 * @file src/components/core/Chip/ChipGroup.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Container for grouping chips with layout options
 */
import React from "react";
import { clsx } from "clsx";

export interface ChipGroupProps {
  children: React.ReactNode;
  gap?: "tight" | "normal" | "loose";
  wrap?: boolean;
  maxItems?: number;
  showMore?: boolean;
  onShowMore?: () => void;
  className?: string;
}

export const ChipGroup: React.FC<ChipGroupProps> = ({
  children,
  gap = "normal",
  wrap = true,
  maxItems,
  showMore = false,
  onShowMore,
  className,
}) => {
  const gapClasses = {
    tight: "gap-1",
    normal: "gap-2",
    loose: "gap-3",
  };

  const childrenArray = React.Children.toArray(children);
  const visibleChildren = maxItems
    ? childrenArray.slice(0, maxItems)
    : childrenArray;
  const hiddenCount = maxItems ? childrenArray.length - maxItems : 0;

  return (
    <div
      className={clsx(
        "flex items-center",
        gapClasses[gap],
        wrap ? "flex-wrap" : "overflow-x-auto",
        className,
      )}
    >
      {visibleChildren}

      {showMore && hiddenCount > 0 && (
        <button
          onClick={onShowMore}
          className={clsx(
            "px-2 py-1 text-xs font-bold uppercase tracking-wider",
            "text-brutal-gray-600 hover:text-brutal-black",
            "transition-colors duration-200",
          )}
        >
          +{hiddenCount} more
        </button>
      )}
    </div>
  );
};
