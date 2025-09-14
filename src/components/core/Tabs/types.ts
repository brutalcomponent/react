/**
 * @file src/components/core/Tabs/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Enhanced type definitions for Tabs components
 */
export interface TabsContextValue {
  value: string;
  onChange: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "pills" | "underline" | "cards";
  brutal?: boolean;
  animated?: boolean;
  accentColor?: string;
}
