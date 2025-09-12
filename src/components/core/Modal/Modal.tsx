/**
 * @file src/components/core/Modal/Modal.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal modal component with proper accessibility
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useEffect } from "react";
import { clsx } from "clsx";
import { FaTimes } from "react-icons/fa";
import { Icon } from "../Icon/Icon";
import type { ModalProps } from "./types";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  brutal = true,
  closeOnBackdrop = true,
  className,
}) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-6xl",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brutal-black/50 z-40"
        onClick={closeOnBackdrop ? onClose : undefined}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className={clsx(
            "w-full bg-brutal-white",
            sizeClasses[size],
            brutal && "border-4 border-brutal-black shadow-brutal-lg",
            !brutal && "shadow-2xl",
            "max-h-[90vh] flex flex-col",
            className,
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-4 border-brutal-black bg-brutal-black text-brutal-white">
            <h2
              id="modal-title"
              className="text-xl font-black uppercase tracking-wider"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-brutal-white hover:text-brutal-black transition-colors"
              aria-label="Close modal"
            >
              <Icon icon={FaTimes} size="md" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="p-4 border-t-4 border-brutal-black bg-brutal-gray-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
