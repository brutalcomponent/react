/**
 * @file src/components/core/Link/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Shared type definitions for Link components with Next.js support
 */
import type { AnchorHTMLAttributes, ComponentType } from "react";
import type { IconType } from "react-icons";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  variant?: "default" | "underline" | "button" | "nav" | "ghost" | "brutal";
  external?: boolean;
  showExternalIcon?: boolean;
  icon?: IconType;
  iconPosition?: "left" | "right";
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  animated?: boolean;
  accentColor?: string;
  as?: ComponentType<any>; // For Next.js Link or other router links
  download?: boolean | string;
}

// Next.js specific types
export interface NextLinkComponent {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  locale?: string;
  passHref?: boolean;
  children: React.ReactNode;
}
