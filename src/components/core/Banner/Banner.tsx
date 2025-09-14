/**
 * @file src/components/core/Banner/Banner.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Generic, dismissible banner component with brutal styling
 * @client This component requires client-side JavaScript
 */
"use client";

import React from "react";
import { clsx } from "clsx";
import { FaTimes } from "react-icons/fa";
import { Icon } from "../Icon";
import { cn } from "../../../utils/cn.utils";

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
    default: "border-brutal-black bg-brutal-surface0",
    info: "border-brutal-sky bg-brutal-sky",
    success: "border-brutal-mint bg-brutal-mint",
    warning: "border-brutal-yellow bg-brutal-yellow",
    danger: "border-brutal-coral bg-brutal-coral",
  };

  const animationVariants = {
    "bottom-right": {
      initial: { x: 400, rotate: 5 },
      animate: { x: 0, rotate: 1 },
      exit: { x: 400, rotate: -5 },
    },
    "bottom-left": {
      initial: { x: -400, rotate: -5 },
      animate: { x: 0, rotate: -1 },
      exit: { x: -400, rotate: 5 },
    },
    "top-right": {
      initial: { x: 400, rotate: -5 },
      animate: { x: 0, rotate: 1 },
      exit: { x: 400, rotate: 5 },
    },
    "top-left": {
      initial: { x: -400, rotate: 5 },
      animate: { x: 0, rotate: -1 },
      exit: { x: -400, rotate: -5 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn("fixed z-50 max-w-sm", positionClasses[position])}
          initial={animationVariants[position].initial}
          animate={animationVariants[position].animate}
          exit={animationVariants[position].exit}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
        >
          <motion.div
            className={cn(
              "relative p-4 text-brutal-black",
              brutal
                ? "border-4 shadow-brutal-lg"
                : "border rounded-lg shadow-lg",
              variantColors[variant],
              className,
            )}
            whileHover={brutal ? { rotate: 0, scale: 1.02 } : {}}
          >
            {closeButton && (
              <button
                onClick={onClose}
                className={cn(
                  "absolute -top-2 -right-2 p-1.5",
                  "bg-brutal-black text-brutal-white",
                  brutal &&
                    "shadow-brutal-sm hover:shadow-brutal hover:scale-110 transition-all",
                  brutal && "border-2 border-brutal-white",
                )}
                aria-label="Dismiss"
              >
                <Icon icon={FaTimes} size="xs" />
              </button>
            )}
            <div className="font-mono">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
