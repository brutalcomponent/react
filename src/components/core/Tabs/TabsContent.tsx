/**
 * @file src/components/core/Tabs/TabsContent.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Content panel component for tabs
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useContext } from "react";
import { clsx } from "clsx";
import { TabsContext } from "./Tabs";

export interface TabsContentProps {
  value: string;
  className?: string;
  forceMount?: boolean;
  children: React.ReactNode;
}

/**
 * @component TabsContent
 * @description Content panel that shows when its tab is active
 * @client Uses useContext hook
 */
export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  className,
  forceMount = false,
  children,
}) => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within Tabs");
  }

  const { value: activeValue } = context;
  const isActive = activeValue === value;

  if (!isActive && !forceMount) return null;

  return (
    <div
      className={clsx("animate-fade-in", !isActive && "hidden", className)}
      role="tabpanel"
      tabIndex={0}
    >
      {children}
    </div>
  );
};
