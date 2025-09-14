/**
 * @file src/components/core/Tooltip/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Enhanced type definitions for Tooltip components
 */
import type { ReactNode } from "react";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  hideDelay?: number;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "error" | "success" | "warning" | "info" | "accent";
  animated?: boolean;
  disabled?: boolean;
  trigger?: "hover" | "click" | "focus" | "both";
  accentColor?: string;
  className?: string;
}
