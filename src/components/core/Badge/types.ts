/**
 * @file src/components/core/Badge/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Badge components
 */
import type { HTMLAttributes, ReactNode } from "react";
import type { IconType } from "react-icons";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "info";
  size?: "xs" | "sm" | "md" | "lg";
  brutal?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
  dot?: boolean;
  removable?: boolean;
  onRemove?: () => void;
}

export interface BadgeGroupProps {
  children: ReactNode;
  className?: string;
}
