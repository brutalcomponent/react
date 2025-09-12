/**
 * @file src/components/core/Chip/Chip.tsx
 * @author David (https://dvh.sh)
 * @license MIT
 *
 * @created Fri Sep 12 2025
 * @updated Fri Sep 12 2025
 *
 * @description
 * Base chip component for tags and labels
 */
import React from "react";
import { clsx } from "clsx";
import type { IconType } from "react-icons";
import { FaTimes } from "react-icons/fa";
import { Icon } from "../Icon";

export interface ChipProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: IconType;
  iconPosition?: "left" | "right";
  onRemove?: () => void;
  onClick?: () => void;
  brutal?: boolean;
  selected?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = "default",
  size = "sm",
  icon: IconComponent,
  iconPosition = "left",
  onRemove,
  onClick,
  brutal = true,
  selected = false,
  disabled = false,
  className,
}) => {
  const Component = onClick ? "button" : "span";

  const variantClasses = {
    default: "bg-brutal-gray-100 text-brutal-black border-brutal-black",
    primary: "bg-brutal-black text-brutal-white border-brutal-black",
    secondary: "bg-brutal-white text-brutal-black border-brutal-black",
    success: "bg-brutal-mint text-brutal-black border-brutal-black",
    warning: "bg-brutal-yellow text-brutal-black border-brutal-black",
    danger: "bg-brutal-coral text-brutal-black border-brutal-black",
  };

  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs gap-1",
    sm: "px-2.5 py-1 text-sm gap-1.5",
    md: "px-3 py-1.5 text-sm gap-2",
    lg: "px-4 py-2 text-base gap-2",
  };

  const iconSizes = {
    xs: "xs" as const,
    sm: "xs" as const,
    md: "sm" as const,
    lg: "sm" as const,
  };

  return (
    <Component
      className={clsx(
        "inline-flex items-center font-bold uppercase tracking-wider",
        "transition-all duration-200",
        brutal ? "border-2" : "border",
        sizeClasses[size],
        variantClasses[variant],
        selected && [
          "bg-brutal-black text-brutal-white",
          brutal && "shadow-brutal transform -rotate-2",
        ],
        onClick &&
          !disabled && [
            "cursor-pointer",
            "hover:shadow-brutal hover:transform hover:-rotate-1",
          ],
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={!disabled ? onClick : undefined}
      disabled={Component === "button" ? disabled : undefined}
    >
      {IconComponent && iconPosition === "left" && (
        <Icon icon={IconComponent} size={iconSizes[size]} />
      )}

      {children}

      {IconComponent && iconPosition === "right" && !onRemove && (
        <Icon icon={IconComponent} size={iconSizes[size]} />
      )}

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={clsx(
            "ml-1 -mr-1 hover:bg-brutal-black/10 rounded p-0.5",
            "transition-colors duration-200",
          )}
          aria-label="Remove"
        >
          <Icon icon={FaTimes} size="xs" />
        </button>
      )}
    </Component>
  );
};
