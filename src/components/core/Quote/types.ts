/**
 * @file src/components/core/Quote/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Shared type definitions for Quote components
 */
import type { ReactNode } from "react";

export interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  variant?: "default" | "large" | "testimonial" | "minimal" | "card";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  animated?: boolean;
  showQuoteMarks?: boolean;
  accentColor?: string;
  className?: string;
}

export interface PullQuoteProps {
  children: ReactNode;
  author?: string;
  variant?: "default" | "centered" | "offset" | "full-width";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  animated?: boolean;
  showQuoteMarks?: boolean;
  accentColor?: string;
  className?: string;
}
