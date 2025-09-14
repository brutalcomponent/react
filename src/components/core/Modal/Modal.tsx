/**
 * @file src/components/core/Modal/Modal.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal modal component with comprehensive accessibility and animation support
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { FaTimes } from "react-icons/fa";
import { Icon } from "../Icon";
import {
  cn,
  getSizeClasses,
  getAccentClasses,
  brutalBase,
} from "../../../utils/cn.utils";
import type { ModalProps } from "./types";

/**
 * @component Modal
 * @description Brutal modal with proper accessibility, focus management, and animations
 */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  variant = "default",
  brutal = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  animated = true,
  accentColor = "brutal-pink",
  className,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle escape key
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEscape && isOpen) {
        onClose();
      }
    },
    [closeOnEscape, isOpen, onClose],
  );

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (closeOnBackdrop && e.target === e.currentTarget) {
        onClose();
      }
    },
    [closeOnBackdrop, onClose],
  );

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 100);

      // Prevent body scroll
      document.body.style.overflow = "hidden";

      // Add event listeners
      document.addEventListener("keydown", handleEscape);
    } else {
      // Restore focus to previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }

      // Restore body scroll
      document.body.style.overflow = "unset";

      // Remove event listeners
      document.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-6xl",
    full: "max-w-[95vw]",
  };

  const getVariantClasses = () => {
    const variants = {
      default: "bg-brutal-white",
      success: "bg-brutal-mint/10 border-brutal-mint",
      warning: "bg-brutal-yellow/10 border-brutal-yellow",
      danger: "bg-brutal-coral/10 border-brutal-coral",
      info: "bg-brutal-sky/10 border-brutal-sky",
    };
    return variants[variant];
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-brutal-black/50",
          animated && [
            "transition-opacity duration-300",
            isOpen ? "opacity-100" : "opacity-0",
          ],
        )}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          ref={modalRef}
          className={cn(
            // Base styling
            "w-full max-h-[90vh] flex flex-col relative",
            sizeClasses[size],
            getVariantClasses(),

            // Brutal styling
            brutal && [
              "border-4 border-brutal-black shadow-brutal-lg",
              animated && [
                "transition-all duration-300 transform",
                "animate-scale-in",
                "hover:shadow-brutal-xl",
              ],
            ],
            !brutal && [
              "rounded-lg shadow-2xl border",
              animated &&
                "transition-all duration-300 transform animate-scale-in",
            ],

            // Focus styles
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",

            className,
          )}
          style={
            {
              "--accent-color": accentColor.startsWith("#")
                ? accentColor
                : `var(--brutal-${accentColor.replace("brutal-", "")})`,
            } as React.CSSProperties
          }
          tabIndex={-1}
          {...props}
        >
          {/* Header */}
          <div
            className={cn(
              "flex items-center justify-between p-6 flex-shrink-0",
              brutal && [
                "border-b-4 border-brutal-black bg-brutal-black text-brutal-white",
              ],
              !brutal && ["border-b bg-brutal-gray-50 rounded-t-lg"],
            )}
          >
            <h2
              id="modal-title"
              className={cn(
                "font-black uppercase tracking-wider flex-1 min-w-0 truncate",
                brutal ? "text-brutal-white" : "text-brutal-black",
                size === "xs"
                  ? "text-lg"
                  : size === "sm"
                    ? "text-xl"
                    : "text-2xl",
              )}
            >
              {title}
            </h2>

            <button
              onClick={onClose}
              className={cn(
                "p-2 ml-4 flex-shrink-0 transition-all duration-200",
                brutal
                  ? [
                      "hover:bg-brutal-white hover:text-brutal-black",
                      "border-2 border-transparent hover:border-brutal-white",
                    ]
                  : [
                      "hover:bg-brutal-gray-200 rounded-md",
                      "text-brutal-gray-500 hover:text-brutal-black",
                    ],
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              )}
              aria-label="Close modal"
              type="button"
            >
              <Icon icon={FaTimes} size="md" brutal={brutal && animated} />
            </button>
          </div>

          {/* Body */}
          <div
            id="modal-description"
            className={cn(
              "flex-1 overflow-y-auto p-6",
              "scrollbar-thin scrollbar-track-transparent scrollbar-thumb-brutal-gray-300",
            )}
          >
            {children}
          </div>

          {/* Footer */}
          {footer && (
            <div
              className={cn(
                "p-4 flex-shrink-0",
                brutal && "border-t-4 border-brutal-black bg-brutal-gray-50",
                !brutal && "border-t bg-brutal-gray-50 rounded-b-lg",
              )}
            >
              {footer}
            </div>
          )}

          {/* Decorative corner */}
          {brutal && animated && (
            <div className="absolute top-0 right-0 w-8 h-8 bg-accent opacity-20 -mr-4 -mt-4 rotate-45" />
          )}
        </div>
      </div>
    </>
  );
};

/**
 * @component ConfirmModal
 * @description Pre-configured modal for confirmations
 */
export interface ConfirmModalProps
  extends Omit<ModalProps, "footer" | "children"> {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  loading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  loading = false,
  variant = "danger",
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      {...props}
      variant={variant}
      onClose={onClose}
      footer={
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className={cn(
              "px-4 py-2 font-black uppercase tracking-wider",
              "bg-brutal-gray-200 text-brutal-black border-2 border-brutal-black",
              "hover:bg-brutal-gray-300 transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className={cn(
              "px-4 py-2 font-black uppercase tracking-wider",
              "bg-brutal-coral text-brutal-black border-2 border-brutal-black",
              "hover:bg-brutal-coral/80 transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              loading && "animate-pulse",
            )}
          >
            {loading ? "Loading..." : confirmText}
          </button>
        </div>
      }
    >
      <p className="text-brutal-black font-mono leading-relaxed">{message}</p>
    </Modal>
  );
};
