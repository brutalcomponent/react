/**
 * @file src/components/core/Modal/types.ts
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Thu Sep 11 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Shared type definitions for Modal components
 */
import type { ReactNode, HTMLAttributes } from "react";

export interface ModalProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  variant?: "default" | "success" | "warning" | "danger" | "info";
  brutal?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
  animated?: boolean;
  accentColor?: string;
}
