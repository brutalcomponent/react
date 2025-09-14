/**
 * @file src/components/core/Radio/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Shared type definitions for Radio components
 */
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  description?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "card" | "button";
  animated?: boolean;
  accentColor?: string;
}

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  description?: string;
  error?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "card" | "button";
  layout?: "vertical" | "horizontal" | "grid";
  animated?: boolean;
  required?: boolean;
  accentColor?: string;
  className?: string;
}
