/**
 * @file src/components/core/Text/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Enhanced type definitions for Text components
 */
import type { HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?:
    | "body"
    | "lead"
    | "small"
    | "caption"
    | "mono"
    | "muted"
    | "accent"
    | "error"
    | "success"
    | "warning";
  as?: "p" | "span" | "div" | "button" | "label";
  size?: "xs" | "sm" | "md" | "lg";
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "black";
  brutal?: boolean;
  animated?: boolean;
  accentColor?: string;
}

export interface WavyTitleProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  animate?: boolean;
  stagger?: boolean;
  brutal?: boolean;
  accentColor?: string;
  className?: string;
}
