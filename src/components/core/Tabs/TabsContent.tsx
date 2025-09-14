/**
 * @file src/components/core/Tabs/TabsContent.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Content panel component for tabs with enhanced animations and accessibility
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useContext, useRef, useEffect } from "react";
import { cn, getSizeClasses } from "../../../utils/cn.utils";
import { TabsContext } from "./Tabs";

export interface TabsContentProps {
  value: string;
  className?: string;
  forceMount?: boolean;
  keepMounted?: boolean;
  children: React.ReactNode;
}

/**
 * @component TabsContent
 * @description Content panel with enhanced animations and accessibility features
 */
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  forceMount = false,
  keepMounted = false,
  children,
}) => {
  const context = useContext(TabsContext);
  const contentRef = useRef<HTMLDivElement>(null);

  if (!context) {
    throw new Error("TabsContent must be used within Tabs");
  }

  const {
    value: activeValue,
    size = "md",
    variant = "default",
    brutal = true,
    animated = true,
  } = context;

  const isActive = activeValue === value;
  const sizeClasses = getSizeClasses(size);

  // Focus management for accessibility
  useEffect(() => {
    if (isActive && contentRef.current) {
      // Focus the content panel when it becomes active
      contentRef.current.focus();
    }
  }, [isActive]);

  // Don't render if not active and not forced/kept mounted
  if (!isActive && !forceMount && !keepMounted) {
    return null;
  }

  const getVariantClasses = () => {
    switch (variant) {
      case "pills":
      case "cards":
        return cn(
          "rounded-lg",
          brutal &&
            "border-2 border-brutal-black shadow-brutal-sm bg-brutal-white",
          !brutal && "border bg-brutal-white rounded-lg shadow-sm",
        );

      case "underline":
        return cn(
          "border-t border-brutal-gray-200 bg-brutal-white",
          brutal && "shadow-brutal-sm",
        );

      default:
        return cn(
          brutal && "bg-brutal-white shadow-brutal-sm",
          !brutal && "bg-brutal-white",
        );
    }
  };

  return (
    <div
      ref={contentRef}
      className={cn(
        // Base styling
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",

        // Size classes
        sizeClasses.padding,

        // Variant styling
        getVariantClasses(),

        // Animation classes
        animated && [
          "transition-all duration-300",
          isActive ? "animate-fade-in" : "animate-fade-out",
        ],

        // Visibility
        !isActive && keepMounted && "hidden",
        !isActive && forceMount && "opacity-50",

        className,
      )}
      role="tabpanel"
      id={`tabpanel-${value}`}
      aria-labelledby={`tab-${value}`}
      tabIndex={0}
      hidden={!isActive && !forceMount}
    >
      {children}
    </div>
  );
};
