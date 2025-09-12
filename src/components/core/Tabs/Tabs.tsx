/**
 * @file src/components/core/Tabs/Tabs.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Main Tabs container component that provides context to TabsList/Trigger/Content.
 * @client This component requires client-side JavaScript (uses state and context)
 */
"use client";

import React, { useState, createContext, useMemo } from "react";
import { clsx } from "clsx";
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
  brutal?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * @component Tabs
 * @description Root tabs container. Provides active value and onChange to children via context.
 */
export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = "horizontal",
  brutal = true,
  className,
  children,
}) => {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = controlledValue ?? uncontrolledValue;

  const handleChange = (newValue: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(newValue);
    }
    onChange?.(newValue);
  };

  const contextValue = useMemo<TabsContextValue>(
    () => ({
      value,
      onChange: handleChange,
    }),
    [value],
  );

  return {
    ...(
      <TabsContext.Provider value={contextValue}>
        <div
          className={clsx(
            "flex",
            orientation === "vertical" ? "flex-row" : "flex-col",
            brutal && "gap-2",
            className,
          )}
          role="tablist"
          aria-orientation={orientation}
        >
          {children}
        </div>
      </TabsContext.Provider>
    ),
  } as unknown as JSX.Element;
};
