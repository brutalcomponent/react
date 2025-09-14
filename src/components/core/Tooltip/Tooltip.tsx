/**
 * @file src/components/core/Tooltip/Tooltip.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Brutal tooltip component with enhanced positioning and accessibility
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { cn, getSizeClasses, getAccentClasses } from "../../../utils/cn.utils";
import type { TooltipProps } from "./types";

/**
 * @component Tooltip
 * @description Brutal tooltip with comprehensive positioning and accessibility features
 */
export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 200,
  hideDelay = 0,
  brutal = true,
  size = "sm",
  variant = "default",
  animated = true,
  disabled = false,
  trigger = "hover",
  accentColor = "brutal-pink",
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const showTimeoutRef = useRef<NodeJS.Timeout>();
  const hideTimeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const sizeClasses = getSizeClasses(size);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = brutal ? 12 : 8;
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    let top = 0;
    let left = 0;

    // Calculate initial position
    switch (position) {
      case "top":
        top = triggerRect.top - tooltipRect.height - spacing;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "bottom":
        top = triggerRect.bottom + spacing;
        left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        break;
      case "left":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.left - tooltipRect.width - spacing;
        break;
      case "right":
        top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        left = triggerRect.right + spacing;
        break;
    }

    // Keep tooltip within viewport with padding
    const padding = 16;
    left = Math.max(
      padding,
      Math.min(left, viewport.width - tooltipRect.width - padding),
    );
    top = Math.max(
      padding,
      Math.min(top, viewport.height - tooltipRect.height - padding),
    );

    setCoords({ top, left });
  }, [position, brutal]);

  const showTooltip = useCallback(() => {
    if (disabled) return;

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    showTimeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Calculate position after tooltip is rendered
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }, delay);
  }, [delay, disabled, calculatePosition]);

  const hideTooltip = useCallback(() => {
    if (showTimeoutRef.current) {
      clearTimeout(showTimeoutRef.current);
    }

    if (hideDelay > 0) {
      hideTimeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, hideDelay);
    } else {
      setIsVisible(false);
    }
  }, [hideDelay]);

  const handleMouseEnter = () => {
    if (trigger === "hover" || trigger === "both") {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === "hover" || trigger === "both") {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === "click" || trigger === "both") {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === "focus" || trigger === "both") {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === "focus" || trigger === "both") {
      hideTooltip();
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) {
        hideTooltip();
      }
    };

    if (isVisible) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isVisible, hideTooltip]);

  const getVariantClasses = () => {
    switch (variant) {
      case "error":
        return "bg-brutal-coral text-brutal-black";
      case "success":
        return "bg-brutal-mint text-brutal-black";
      case "warning":
        return "bg-brutal-yellow text-brutal-black";
      case "info":
        return "bg-brutal-sky text-brutal-black";
      case "accent":
        return "bg-accent text-brutal-black";
      default:
        return "bg-brutal-black text-brutal-white";
    }
  };

  const getArrowClasses = () => {
    const arrowColor =
      variant === "default"
        ? "brutal-black"
        : variant === "accent"
          ? "accent"
          : `brutal-${variant}`;

    const arrowSize = brutal ? "10px" : "6px";

    switch (position) {
      case "top":
        return cn(
          "bottom-[-10px] left-1/2 transform -translate-x-1/2",
          `border-l-[${arrowSize}] border-l-transparent`,
          `border-r-[${arrowSize}] border-r-transparent`,
          `border-t-[${arrowSize}] border-t-${arrowColor}`,
        );
      case "bottom":
        return cn(
          "top-[-10px] left-1/2 transform -translate-x-1/2",
          `border-l-[${arrowSize}] border-l-transparent`,
          `border-r-[${arrowSize}] border-r-transparent`,
          `border-b-[${arrowSize}] border-b-${arrowColor}`,
        );
      case "left":
        return cn(
          "right-[-10px] top-1/2 transform -translate-y-1/2",
          `border-t-[${arrowSize}] border-t-transparent`,
          `border-b-[${arrowSize}] border-b-transparent`,
          `border-l-[${arrowSize}] border-l-${arrowColor}`,
        );
      case "right":
        return cn(
          "left-[-10px] top-1/2 transform -translate-y-1/2",
          `border-t-[${arrowSize}] border-t-transparent`,
          `border-b-[${arrowSize}] border-b-transparent`,
          `border-r-[${arrowSize}] border-r-${arrowColor}`,
        );
    }
  };

  const tooltipElement =
    isVisible && mounted ? (
      <div
        ref={tooltipRef}
        className={cn(
          // Base styling
          "fixed z-50 pointer-events-none max-w-xs",
          "font-bold uppercase tracking-wider break-words",

          // Size classes
          sizeClasses.padding,
          sizeClasses.text,

          // Variant styling
          getVariantClasses(),

          // Brutal styling
          brutal && [
            "border-4 border-brutal-black shadow-brutal",
            "transform -rotate-1",
          ],
          !brutal && "rounded-md shadow-lg border",

          // Animation
          animated && ["transition-all duration-200", "animate-fade-in"],

          className,
        )}
        style={
          {
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            "--accent-color": accentColor.startsWith("#")
              ? accentColor
              : `var(--brutal-${accentColor.replace("brutal-", "")})`,
          } as React.CSSProperties
        }
        role="tooltip"
        aria-hidden="false"
      >
        {content}

        {/* Arrow */}
        <div className={cn("absolute w-0 h-0", getArrowClasses())} />
      </div>
    ) : null;

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={cn(
          "inline-block",
          (trigger === "click" || trigger === "both") && "cursor-pointer",
        )}
        aria-describedby={isVisible ? "tooltip" : undefined}
      >
        {children}
      </div>

      {tooltipElement && createPortal(tooltipElement, document.body)}
    </>
  );
};

/**
 * @component TooltipProvider
 * @description Context provider for tooltip configuration
 */
export const TooltipProvider: React.FC<{
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}> = ({ children, delayDuration = 200, skipDelayDuration = 300 }) => {
  // This could be expanded to provide global tooltip configuration
  return <>{children}</>;
};
