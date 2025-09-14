/**
 * @file src/components/core/Tabs/TabsList.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Container component for tab triggers with multiple variants
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useContext } from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";
import { TabsContext } from "./Tabs";

export interface TabsListProps {
  className?: string;
  brutal?: boolean;
  stretch?: boolean;
  variant?: "default" | "pills" | "underline" | "cards";
  children: React.ReactNode;
}

/**
 * @component TabsList
 * @description Container for tab triggers with different style variants
 */
export const TabsList: React.FC<TabsListProps> = ({
  className,
  brutal: propBrutal,
  stretch = false,
  variant: propVariant,
  children,
}) => {
  const context = useContext(TabsContext);
  const brutal = propBrutal ?? context?.brutal ?? true;
  const variant = propVariant ?? context?.variant ?? "default";
  const orientation = context?.orientation ?? "horizontal";
  const size = context?.size ?? "md";

  const sizeClasses = getSizeClasses(size);

  const getVariantClasses = () => {
    switch (variant) {
      case "pills":
        return cn(
          "gap-2 p-1 rounded-lg",
          brutal && [
            "bg-brutal-gray-100 border-4 border-brutal-black shadow-brutal-sm",
          ],
          !brutal && "bg-brutal-gray-100 rounded-lg border",
        );

      case "underline":
        return cn(
          "border-b-2 border-brutal-gray-200",
          "relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300",
        );

      case "cards":
        return cn(
          "gap-1 bg-brutal-gray-50 p-1 rounded-lg",
          brutal && "border-2 border-brutal-black shadow-brutal-sm",
        );

      default:
        return cn(
          brutal && [
            "border-b-4 border-brutal-black bg-brutal-white shadow-brutal-sm",
          ],
          !brutal && "border-b-2 border-brutal-gray-300 bg-brutal-white",
        );
    }
  };

  return (
    <div
      className={cn(
        // Base layout
        "flex",
        orientation === "vertical" ? "flex-col" : "flex-row",
        stretch && "w-full",

        // Variant styling
        getVariantClasses(),

        // Responsive behavior
        orientation === "horizontal" && "overflow-x-auto scrollbar-none",

        className,
      )}
      role="tablist"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
};
