/**
 * @file src/components/core/Code/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Code components
 */
export interface CodeProps {
  children: string;
  language?: string;
  inline?: boolean;
  showLineNumbers?: boolean;
  copyable?: boolean;
  brutal?: boolean;
  className?: string;
}

export interface InlineCodeProps {
  children: string;
  className?: string;
}
