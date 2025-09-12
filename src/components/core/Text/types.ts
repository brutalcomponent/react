/**
 * @file src/components/core/Text/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Text components
 */
import type { HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  variant?: "body" | "lead" | "small" | "mono";
  as?: "p" | "span" | "div";
  brutal?: boolean;
}

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  variant?: "display" | "title" | "section" | "subsection";
  skew?: boolean | "left" | "right";
  uppercase?: boolean;
  brutal?: boolean;
  underline?: boolean;
  gradient?: boolean;
}

export interface WavyTitleProps {
  children: string;
  className?: string;
  animate?: boolean;
}
