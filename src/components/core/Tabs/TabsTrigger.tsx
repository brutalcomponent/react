/**
 * @file src/components/core/Tabs/TabsTrigger.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Individual tab trigger button component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useContext } from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";
import { TabsContext } from "./Tabs";

export interface TabsTriggerProps {
  value: string;
  icon?: IconType;
  badge?: string | number;
  disabled?: boolean;
  brutal?: boolean;
  stretch?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * @component TabsTrigger
 * @description Individual tab button with support for icons and badges
 * @client Uses useContext hook
 */
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  icon: Icon,
  badge,
  disabled = false,
  brutal = true,
  stretch = false,
  className,
  children,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs");
  }

  const { value: activeValue, onChange } = context;
  const isActive = activeValue === value;

  return (
    <button
      onClick={() => !disabled && onChange(value)}
      disabled={disabled}
      className={clsx(
        "relative flex items-center justify-center gap-2 px-4 py-3",
        "font-bold uppercase tracking-wider text-sm",
        "transition-all duration-200",
        stretch && "flex-1",
        brutal && "border-r-2 last:border-r-0 border-brutal-black",
        isActive
          ? [
              "bg-brutal-black text-brutal-white",
              brutal && "transform -skew-x-3",
            ]
          : [
              "bg-brutal-white text-brutal-black",
              "hover:bg-brutal-gray-100",
              brutal && "hover:transform hover:-skew-x-3",
            ],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span className={clsx("hidden sm:inline", !Icon && "inline")}>
        {children}
      </span>
      {badge !== undefined && (
        <span
          className={clsx(
            "ml-2 px-1.5 py-0.5 text-xs font-bold",
            "border-2 border-brutal-black",
            isActive
              ? "bg-brutal-white text-brutal-black"
              : "bg-brutal-pink text-brutal-black",
          )}
        >
          {badge}
        </span>
      )}
    </button>
  );
};
