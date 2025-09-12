/**
 * @file src/components/core/Input/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Input components
 */
import type { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import type { IconType } from "react-icons";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: IconType;
  rightIcon?: IconType;
  brutal?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  brutal?: boolean;
}
