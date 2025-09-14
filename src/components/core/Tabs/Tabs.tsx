/**
 * @file src/components/core/Tabs/Tabs.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Main Tabs container component with enhanced styling and accessibility
 * @client This component requires client-side JavaScript (uses state and context)
 */
"use client";

import React, { useState, createContext, useMemo, useCallback } from "react";
import { cn, getAccentClasses } from "../../../utils/cn.utils";
import type { TabsContextValue } from "./types";

/**
 * @constant TabsContext
 * @description Context to share active tab value and onChange handler
 */
export const TabsContext = createContext<TabsContextValue | undefined>(
  undefined,
);

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onChange?: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pills" | "underline" | "cards";
  brutal?: boolean;
  animated?: boolean;
  accentColor?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * @component Tabs
 * @description Root tabs container with comprehensive styling and accessibility features
 */
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = "horizontal",
  size = "md",
  variant = "default",
  brutal = true,
  animated = true,
  accentColor = "brutal-pink",
  className,
  children,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const handleChange = useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [controlledValue, onChange],
  );

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value,
      onChange: handleChange,
      orientation,
      size,
      variant,
      brutal,
      animated,
      accentColor,
    }),
    [
      value,
      handleChange,
      orientation,
      size,
      variant,
      brutal,
      animated,
      accentColor,
    ],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div
        className={cn(
          "flex w-full",
          orientation === "vertical" ? "flex-row gap-4" : "flex-col",
          brutal && "gap-2",
          className,
        )}
        style={
          {
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
        role="tablist"
        aria-orientation={orientation}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};
