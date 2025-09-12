/**
 * @file src/components/core/Tabs/TabsList.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Container component for tab triggers
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";

export interface TabsListProps {
  className?: string;
  brutal?: boolean;
  stretch?: boolean;
  variant?: "default" | "pills" | "underline";
  children: React.ReactNode;
}

/**
 * @component TabsList
 * @description Container for tab triggers with different style variants
 */
export const TabsList: React.FC<TabsListProps> = ({
  className,
  brutal = true,
  stretch = false,
  variant = "default",
  children,
}) => {
  const variantClasses = {
    default: clsx(
      brutal && "border-b-4 border-brutal-black bg-brutal-white",
      !brutal && "border-b-2 border-brutal-gray-300",
    ),
    pills: clsx(
      "gap-2 p-1",
      brutal && "bg-brutal-gray-100 border-2 border-brutal-black",
      !brutal && "bg-brutal-gray-100 rounded-lg",
    ),
    underline: "border-b-2 border-brutal-gray-200",
  };

  return (
    <div
      className={clsx(
        "flex",
        variantClasses[variant],
        stretch && "w-full",
        className,
      )}
    >
      {children}
    </div>
  );
};
