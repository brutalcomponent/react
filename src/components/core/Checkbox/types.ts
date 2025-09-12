/**
 * @file src/components/core/Checkbox/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Checkbox components
 */
import type { InputHTMLAttributes } from "react";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  label?: string;
  onChange?: (checked: boolean) => void;
  error?: string;
  brutal?: boolean;
}

export interface CheckboxGroupProps {
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  error?: string;
  brutal?: boolean;
  className?: string;
}
