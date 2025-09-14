/**
 * @file src/components/core/Button/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Shared type definitions for Button components
 */
import type { ButtonHTMLAttributes } from "react";
import type { IconType } from "../../../types/react-icons";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  brutal?: boolean;
  fullWidth?: boolean;
  uppercase?: boolean;
  skew?: boolean | "left" | "right";
  leftIcon?: IconType;
  rightIcon?: IconType;
  loading?: boolean;
  loadingText?: string;
}

export interface ButtonGroupProps {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
  direction?: "horizontal" | "vertical";
  attached?: boolean;
}

export interface LoadingSpinnerProps {
  size?: ButtonProps["size"];
  className?: string;
}
