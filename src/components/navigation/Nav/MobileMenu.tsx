/**
 * @file src/components/navigation/Nav/MobileMenu.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Sat Sep 13 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Mobile slide-in menu with backdrop
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { cn } from "../../../utils/cn.utils";

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  brutal?: boolean;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  children,
  className,
  brutal = true,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brutal-black/50 z-40 md:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-64 z-50",
          "bg-brutal-white",
          brutal
            ? "border-l-4 border-brutal-black shadow-brutal-xl"
            : "shadow-xl",
          "transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className="p-4 overflow-y-auto h-full">{children}</div>
      </div>
    </>
  );
};
