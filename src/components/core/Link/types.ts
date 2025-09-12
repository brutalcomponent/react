/**
 * @file src/components/core/Link/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Link components
 */
import type { AnchorHTMLAttributes, ComponentType } from "react";
import type { IconType } from "react-icons";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: "default" | "underline" | "button" | "nav";
  external?: boolean;
  showExternalIcon?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
  brutal?: boolean;
  as?: ComponentType<any>; // For Next.js Link or other router links
}
