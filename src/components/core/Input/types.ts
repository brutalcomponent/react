/**
 * @file src/components/core/Input/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Shared type definitions for Input components
 */
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import type { IconType } from "react-icons";

export interface BaseInputProps {
  label?: string;
  error?: string;
  hint?: string;
  brutal?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "ghost" | "filled";
  required?: boolean;
  accentColor?: string;
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    BaseInputProps {
  leftIcon?: IconType;
  rightIcon?: IconType;
  showPasswordToggle?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">,
    BaseInputProps {
  options: SelectOption[];
  placeholder?: string;
}

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    BaseInputProps {
  autoResize?: boolean;
  showCharacterCount?: boolean;
}
