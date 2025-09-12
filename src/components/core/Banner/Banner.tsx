/**
 * @file src/components/core/Banner/Banner.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Generic, dismissible banner component. Requires motion for animations.
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";
import { FaTimes } from "react-icons/fa";
import { Icon } from "../Icon";

// Attempt to use motion, but gracefully degrade
let motion: any;
let AnimatePresence: any;
try {
  const motionPackage = require("motion/react");
  motion = motionPackage.motion;
  AnimatePresence = motionPackage.AnimatePresence;
} catch (e) {
  // motion/react not installed
  motion = { div: (props: any) => <div {...props} /> };
  AnimatePresence = ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  );
}

export interface BannerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "danger" | "default";
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  brutal?: boolean;
  className?: string;
  closeButton?: boolean;
}

export const Banner: React.FC<BannerProps> = ({
  isOpen,
  onClose,
  children,
  variant = "default",
  position = "bottom-right",
  brutal = true,
  className,
  closeButton = true,
}) => {
  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const variantColors = {
    default: "border-brutal-black",
    info: "border-brutal-sky",
    success: "border-brutal-mint",
    warning: "border-brutal-yellow",
    danger: "border-brutal-coral",
  };

  const animationVariants = {
    "bottom-right": {
      initial: { x: 400, rotate: 5 },
      animate: { x: 0, rotate: 0 },
      exit: { x: 400, rotate: -5 },
    },
    "bottom-left": {
      initial: { x: -400, rotate: -5 },
      animate: { x: 0, rotate: 0 },
      exit: { x: -400, rotate: 5 },
    },
    "top-right": {
      initial: { x: 400, rotate: -5 },
      animate: { x: 0, rotate: 0 },
      exit: { x: 400, rotate: 5 },
    },
    "top-left": {
      initial: { x: -400, rotate: 5 },
      animate: { x: 0, rotate: 0 },
      exit: { x: -400, rotate: -5 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={clsx("fixed z-50 max-w-sm", positionClasses[position])}
          initial={animationVariants[position].initial}
          animate={animationVariants[position].animate}
          exit={animationVariants[position].exit}
          transition={{ type: "spring", damping: 20 }}
        >
          <motion.div
            className={clsx(
              "relative p-4",
              brutal
                ? "bg-brutal-white border-4 shadow-brutal"
                : "bg-brutal-white border rounded-lg shadow-lg",
              variantColors[variant],
              className,
            )}
            whileHover={brutal ? { rotate: -1, scale: 1.02 } : {}}
          >
            {closeButton && (
              <button
                onClick={onClose}
                className={clsx(
                  "absolute -top-2 -right-2 p-1",
                  "bg-brutal-black text-brutal-white",
                  brutal &&
                    "shadow-brutal hover:scale-110 transition-transform",
                )}
                aria-label="Dismiss"
              >
                <Icon icon={FaTimes} size="xs" />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
