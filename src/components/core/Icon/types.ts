/**
 * @file src/components/core/Icon/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Icon components
 */
import type { IconType } from "react-icons";

export interface IconProps {
  icon: IconType;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  spin?: boolean;
}
