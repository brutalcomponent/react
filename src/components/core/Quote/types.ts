/**
 * @file src/components/core/Quote/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Quote components
 */
import type { ReactNode } from "react";

export interface QuoteProps {
  children: ReactNode;
  author?: string;
  source?: string;
  variant?: "default" | "large" | "testimonial";
  brutal?: boolean;
  className?: string;
}

export interface PullQuoteProps {
  children: ReactNode;
  className?: string;
}
