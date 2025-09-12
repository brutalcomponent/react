/**
 * @file src/components/core/Code/InlineCode.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shorthand for inline code
 */
import React from "react";
import { Code } from "./Code";
import type { InlineCodeProps } from "./types";

export const InlineCode: React.FC<InlineCodeProps> = ({
  children,
  className,
}) => (
  <Code inline className={className}>
    {children}
  </Code>
);
