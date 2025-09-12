/**
 * @file src/components/core/Radio/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Radio components
 */
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  brutal?: boolean;
}

export interface RadioGroupProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value: string;
  onChange: (value: string) => void;
  name: string;
  label?: string;
  error?: string;
  brutal?: boolean;
  className?: string;
}
