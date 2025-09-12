/**
 * @file src/components/core/Card/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Card components
 */
import type { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "flat" | "raised" | "sunken" | "bordered";
  brutal?: boolean;
  hover?: boolean;
  rotate?: boolean | "left" | "right";
  accent?: "pink" | "mint" | "sky" | "lavender" | "peach" | "coral" | "yellow";
  skeleton?: boolean;
}

export interface CardSkeletonProps {
  className?: string;
}
