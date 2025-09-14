/**
 * @file src/components/core/Tabs/TabsTrigger.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Sat Sep 13 2025
 *
 * @description
 * Individual tab trigger button component with enhanced styling and accessibility
 * @client This component requires client-side JavaScript
 */
"use client";

import React, { useContext, useRef, useEffect } from "react";
import type { IconType } from "react-icons";
import { Icon } from "../Icon";
import { cn, getSizeClasses } from "../../../utils/cn.utils";
import { TabsContext } from "./Tabs";

export interface TabsTriggerProps {
  value: string;
  icon?: IconType;
  badge?: string | number;
  disabled?: boolean;
  brutal?: boolean;
  stretch?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * @component TabsTrigger
 * @description Individual tab button with comprehensive styling and accessibility features
 */
export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  icon: IconComponent,
  badge,
  disabled = false,
  brutal: propBrutal,
  stretch = false,
  className,
  children,
}) => {
  const context = useContext(TabsContext);
  const buttonRef = useRef<HTMLButtonElement>(null);

  if (!context) {
    throw new Error("TabsTrigger must be used within Tabs");
  }

  const {
    value: activeValue,
    onChange,
    orientation = "horizontal",
    size = "md",
    variant = "default",
    brutal: contextBrutal = true,
    animated = true,
  } = context;

  const brutal = propBrutal ?? contextBrutal;
  const isActive = activeValue === value;
  const sizeClasses = getSizeClasses(size);

  // Auto-focus active tab for keyboard navigation
  useEffect(() => {
    if (
      isActive &&
      buttonRef.current &&
      document.activeElement === document.body
    ) {
      buttonRef.current.focus();
    }
  }, [isActive]);

  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    // Handle arrow key navigation
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown"
    ) {
      e.preventDefault();
      const tablist = buttonRef.current?.closest('[role="tablist"]');
      const triggers = tablist?.querySelectorAll(
        '[role="tab"]:not([disabled])',
      ) as NodeListOf<HTMLButtonElement>;

      if (triggers && triggers.length > 1) {
        const currentIndex = Array.from(triggers).indexOf(buttonRef.current!);
        let nextIndex;

        if (
          (orientation === "horizontal" && e.key === "ArrowRight") ||
          (orientation === "vertical" && e.key === "ArrowDown")
        ) {
          nextIndex = (currentIndex + 1) % triggers.length;
        } else if (
          (orientation === "horizontal" && e.key === "ArrowLeft") ||
          (orientation === "vertical" && e.key === "ArrowUp")
        ) {
          nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
        }

        if (nextIndex !== undefined) {
          triggers[nextIndex].focus();
          triggers[nextIndex].click();
        }
      }
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "pills":
        return {
          base: cn(
            "rounded-md transition-all duration-200",
            brutal && "shadow-brutal-sm hover:shadow-brutal",
          ),
          active: cn(
            "bg-accent text-brutal-black",
            brutal && "shadow-brutal transform -rotate-1",
          ),
          inactive: cn(
            "text-brutal-gray-600 hover:text-brutal-black hover:bg-brutal-white",
            brutal && "hover:transform hover:-rotate-0.5",
          ),
        };

      case "underline":
        return {
          base: cn(
            "relative border-b-2 border-transparent transition-all duration-200",
            "hover:border-accent/50",
          ),
          active: "border-accent text-accent font-black",
          inactive: "text-brutal-gray-600 hover:text-brutal-black",
        };

      case "cards":
        return {
          base: cn(
            "rounded-md transition-all duration-200",
            brutal && "hover:shadow-brutal-sm",
          ),
          active: cn(
            "bg-brutal-white text-brutal-black shadow-md",
            brutal && "border-2 border-brutal-black",
          ),
          inactive:
            "text-brutal-gray-600 hover:text-brutal-black hover:bg-brutal-white/50",
        };

      default:
        return {
          base: cn(
            "transition-all duration-200",
            brutal && "border-r-2 last:border-r-0 border-brutal-black",
            orientation === "vertical" &&
              brutal &&
              "border-r-0 border-b-2 last:border-b-0",
          ),
          active: cn(
            "bg-brutal-black text-brutal-white",
            brutal && animated && "transform -skew-x-2",
          ),
          inactive: cn(
            "bg-brutal-white text-brutal-black hover:bg-brutal-gray-100",
            brutal && animated && "hover:transform hover:-skew-x-1",
          ),
        };
    }
  };

  const variantStyles = getVariantClasses();

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      role="tab"
      aria-selected={isActive}
      aria-controls={`tabpanel-${value}`}
      tabIndex={isActive ? 0 : -1}
      className={cn(
        // Base styling
        "relative flex items-center justify-center gap-2 font-black uppercase tracking-wider",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",

        // Size classes
        sizeClasses.padding,
        sizeClasses.text,

        // Layout
        stretch && "flex-1",
        orientation === "vertical" && "w-full justify-start",

        // Variant base classes
        variantStyles.base,

        // Active/inactive state
        isActive ? variantStyles.active : variantStyles.inactive,

        // Disabled state
        disabled && [
          "opacity-50 cursor-not-allowed",
          "hover:transform-none hover:shadow-none hover:bg-transparent",
        ],

        className,
      )}
    >
      {/* Icon */}
      {IconComponent && (
        <Icon
          icon={IconComponent}
          size={size === "xs" ? "xs" : size === "sm" ? "sm" : "md"}
          brutal={brutal && animated}
        />
      )}

      {/* Text content */}
      <span
        className={cn(
          "truncate",
          IconComponent && size === "xs" && "hidden sm:inline",
          !IconComponent && "inline",
        )}
      >
        {children}
      </span>

      {/* Badge */}
      {badge !== undefined && (
        <span
          className={cn(
            "ml-2 px-1.5 py-0.5 text-xs font-black rounded",
            "transition-colors duration-200",
            brutal && "border-2 border-brutal-black shadow-brutal-sm",
            isActive
              ? "bg-brutal-white text-brutal-black"
              : "bg-accent text-brutal-black",
          )}
        >
          {badge}
        </span>
      )}

      {/* Active indicator for underline variant */}
      {variant === "underline" && isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
      )}
    </button>
  );
};
