/**
 * @file src/components/core/Tooltip/Tooltip.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Brutal tooltip component
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { clsx } from "clsx";
import type { TooltipProps } from "./types";

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = "top",
  delay = 200,
  brutal = true,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const spacing = 8;

    let top = 0;
    let left = 0;

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

    // Keep tooltip within viewport
    const padding = 10;
    if (left < padding) left = padding;
    if (left + tooltipRect.width > window.innerWidth - padding) {
      left = window.innerWidth - tooltipRect.width - padding;
    }
    if (top < padding) top = padding;
    if (top + tooltipRect.height > window.innerHeight - padding) {
      top = window.innerHeight - tooltipRect.height - padding;
    }

    setCoords({ top, left });
  };

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      // Use RAF to ensure tooltip is rendered before calculating position
      requestAnimationFrame(() => {
        calculatePosition();
      });
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="inline-block"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={clsx(
            "fixed z-50 pointer-events-none",
            "px-3 py-2 text-sm font-bold uppercase tracking-wider",
            "bg-brutal-black text-brutal-white",
            brutal && "border-2 border-brutal-black shadow-brutal",
            "animate-fade-in",
            className,
          )}
          style={{
            top: `${coords.top}px`,
            left: `${coords.left}px`,
          }}
        >
          {content}

          {/* Arrow */}
          <div
            className={clsx(
              "absolute w-0 h-0",
              position === "top" &&
                "bottom-[-8px] left-1/2 transform -translate-x-1/2 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-brutal-black",
              position === "bottom" &&
                "top-[-8px] left-1/2 transform -translate-x-1/2 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-brutal-black",
              position === "left" &&
                "right-[-8px] top-1/2 transform -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[8px] border-l-brutal-black",
              position === "right" &&
                "left-[-8px] top-1/2 transform -translate-y-1/2 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-brutal-black",
            )}
          />
        </div>
      )}
    </>
  );
};
